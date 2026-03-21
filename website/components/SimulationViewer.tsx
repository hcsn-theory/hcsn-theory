'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────
interface Stats {
  total_vertices: number;
  total_edges: number;
  xi_count: number;
  xi_clusters: number;
  largest_cluster: number;
}

interface VertexData {
  id: number;
  depth: number;
  label: string | number;
  xi: number;
  cluster: number;
}

interface SimState {
  t: number;
  phase: number;
  phase_label: string;
  omega: number;
  xi_max: number;
  vertices: VertexData[];
  edges: number[][]; // array of array of vertex IDs
  stats: Stats;
  logs?: string[];
}

// ── Params ────────────────────────────────────────────────────────────
const RECONNECT_MS = 2500;
const MAX_OMEGA_HIS = 250;
const MAX_XI_HIS = 250;

// Physics limits
const REPEL = 90;
const ATTRACT = 0.032;
const DAMP = 0.60;
const Z_FORCE = 0.06;
const GRAVITY = 0.022;

const CLUSTER_HUES = [36, 315, 60, 180, 90, 270, 0, 130];

// Color mapping Helpers
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

export function SimulationViewer() {
  const mountRef = useRef<HTMLDivElement>(null);

  // ── State for UI ─────────────────────────────────────────────────────
  const [status, setStatus] = useState<'OFFLINE' | 'LIVE' | 'CONNECTING'>('CONNECTING');
  const [wsUrl, setWsUrl] = useState<string>(''); // loaded from env later
  const [currentUrlInput, setCurrentUrlInput] = useState<string>('');
  const [timeoutReached, setTimeoutReached] = useState<boolean>(false);
  const TIMEOUT_DURATION_MS = 10 * 60 * 1000; // 10 minutes
  const [timeLeft, setTimeLeft] = useState<number>(TIMEOUT_DURATION_MS);
  
  const [simState, setSimState] = useState<Partial<SimState>>({});
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const [showEdges, setShowEdges] = useState(true);
  const [forceEnabled, setForceEnabled] = useState(true);
  const [speed, setSpeed] = useState(5);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  const [serverLogs, setServerLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const omegaHisRef = useRef<number[]>([]);
  const xiHisRef = useRef<number[]>([]);

  // ── Three.js / Simulation Refs ───────────────────────────────────────
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const ptLightRef = useRef<THREE.PointLight | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const pendingStateRef = useRef<SimState | null>(null);
  const lastStateTimeRef = useRef<number>(0);

  // Animation frame + Orbit controls
  const rafRef = useRef<number>(0);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Physics mapping
  const posMapRef = useRef(new Map<number, Float32Array>());
  const velMapRef = useRef(new Map<number, Float32Array>());
  const ndataMapRef = useRef(new Map<number, VertexData>());
  const orderedIdsRef = useRef<number[]>([]);
  const maxDepthGlobRef = useRef<number>(1);

  // Geometry
  const nodeObjRef = useRef<THREE.Points | null>(null);
  const nodeCapacityRef = useRef<number>(0);
  const edgeObjRef = useRef<THREE.LineSegments | null>(null);
  const edgeCapacityRef = useRef<number>(0);
  
  const latestEdgesRef = useRef<number[][]>([]);
  const latestXiMaxRef = useRef<number>(1.0);
  const topNClustersRef = useRef(new Set<number>());

  // Raycasting
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());

  // ── Initialization (Client Side Only) ────────────────────────────────
  useEffect(() => {
    // Read from window object explicitly in browser environment
    const defaultUrl = process.env.NEXT_PUBLIC_SIM_WS_URL || 'ws://localhost:8765';
    setWsUrl(defaultUrl);
    setCurrentUrlInput(defaultUrl);
  }, []);

  // Scroll logs to bottom whenever they change - LOCALIZED to avoid bumping whole page
  useEffect(() => {
    if (terminalScrollRef.current) {
      // Localized scroll is much better for mobile page stability
      terminalScrollRef.current.scrollTop = 0; 
      // Since we use flex-col-reverse, scrollTop=0 IS the bottom (the newest log)
    }
  }, [serverLogs, status]);

  // ── ThreeJS Setup ───────────────────────────────────────────────────
  useEffect(() => {
    if (!mountRef.current) return;

    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
      alpha: true // Optional: allows background styling
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.0018);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 2000);
    camera.position.set(0, 20, 180);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Lights
    scene.add(new THREE.AmbientLight(0x223344, 6));

    const ptLight = new THREE.PointLight(0xff9500, 2.2, 700);
    ptLight.position.set(0, 60, 80);
    scene.add(ptLight);
    ptLightRef.current = ptLight;

    const rimLight = new THREE.PointLight(0xff00aa, 1.4, 400);
    rimLight.position.set(-80, -40, -60);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x0055cc, 0.7, 500);
    fillLight.position.set(100, 80, 0);
    scene.add(fillLight);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Setup OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxDistance = 600;
    controls.minDistance = 20;

    controls.addEventListener('start', () => {
       controls.autoRotate = false;
    });

    controlsRef.current = controls;

    // Interaction (Click to Select Node)
    const handleClick = (e: MouseEvent) => {
      if (!cameraRef.current || !nodeObjRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
      raycasterRef.current.params.Points.threshold = 4.0; // wider click area
      
      const intersects = raycasterRef.current.intersectObject(nodeObjRef.current);
      if (intersects.length > 0) {
        // Find closest
        intersects.sort((a, b) => a.distance - b.distance);
        const hitIdx = intersects[0].index;
        if (hitIdx !== undefined) {
          const id = orderedIdsRef.current[hitIdx];
          setSelectedNodeId((prev) => (prev === id ? null : id));
        }
      } else {
        setSelectedNodeId(null);
      }
    };
    renderer.domElement.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      controls.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // ── WebSocket Connection ──────────────────────────────────────────────
  const connectWs = useCallback(() => {
    if (!wsUrl || timeoutReached) return;

    // Prevent cascading timeout loops from old sockets
    if (wsRef.current) {
      wsRef.current.onclose = null;
      wsRef.current.close();
    }

    setStatus('CONNECTING');
    setServerLogs([]); // Prevent old logs from persisting across reconnects
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setStatus('LIVE');
      setServerLogs([]); // Ensure clean slate
    };

    ws.onmessage = (e) => {
      if (isPausedRef.current) return;
      try {
        pendingStateRef.current = JSON.parse(e.data);
      } catch (err) {
        // parsing error
      }
    };

    ws.onclose = () => {
      setStatus('OFFLINE');
      if (!timeoutReached) {
        setTimeout(connectWs, RECONNECT_MS);
      }
    };

    ws.onerror = () => {
      // ws.close() triggers onclose which handles the retry
      ws.close();
    };

    wsRef.current = ws;
  }, [wsUrl, timeoutReached]);

  // Connect whenever wsUrl changes
  useEffect(() => {
    connectWs();
    return () => {
      if (wsRef.current) {
        wsRef.current.onclose = null; // Prevent reconnect loop on unmount
        wsRef.current.close();
      }
    };
  }, [connectWs]);

  // ── Manual Control ──────────────────────────────────────────────────
  const resetSimulation = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.onclose = null;
      wsRef.current.close();
      wsRef.current = null;
    }
    setTimeoutReached(false);
    setTimeLeft(TIMEOUT_DURATION_MS);
    setStatus('OFFLINE');
    setSimState({});
    setIsPaused(false);
    setSelectedNodeId(null);
    setServerLogs([]);
    omegaHisRef.current = [];
    xiHisRef.current = [];
    latestEdgesRef.current = [];
    posMapRef.current.clear();
    ndataMapRef.current.clear();
    if (nodeObjRef.current) {
      nodeObjRef.current.geometry.setDrawRange(0, 0);
    }
    if (edgeObjRef.current) {
      edgeObjRef.current.geometry.setDrawRange(0, 0);
    }
  }, [TIMEOUT_DURATION_MS]);

  // 5 Minute Timeout Effect & Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (status === 'LIVE' && !timeoutReached) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1000));
      }, 1000);

      timer = setTimeout(() => {
        setTimeoutReached(true);
        setStatus('OFFLINE');
        if (wsRef.current) {
          wsRef.current.onclose = null;
          wsRef.current.close();
        }
      }, TIMEOUT_DURATION_MS);
    } else if (status !== 'LIVE' && !timeoutReached) {
      setTimeLeft(TIMEOUT_DURATION_MS);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [status, timeoutReached]);

  // Helper to format ms to mm:ss
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // ── Rendering & Animation Loop ───────────────────────────────────────
  
  // Helpers
  const computeTopNClusters = useCallback(() => {
    const ndataMap = ndataMapRef.current;
    const sizes: Record<number, number> = {};
    ndataMap.forEach((d) => {
      if (d.cluster >= 0 && d.xi > 0) {
        sizes[d.cluster] = (sizes[d.cluster] || 0) + 1;
      }
    });
    const sorted = Object.entries(sizes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6) // Support up to 6 colored clusters
      .map((e) => parseInt(e[0]));
    topNClustersRef.current = new Set(sorted);
  }, []);

  const xiToRGB = useCallback((xi: number, xiMax: number, cluster: number) => {
    const t = Math.min(xi / Math.max(xiMax, 1e-9), 1.0);
    if (t < 0.005) return [0.10, 0.22, 0.42]; // visible steel blue on black
    
    if (cluster >= 0 && topNClustersRef.current.has(cluster)) {
      const topArr = Array.from(topNClustersRef.current);
      const rank = topArr.indexOf(cluster);
      const hue = CLUSTER_HUES[rank % CLUSTER_HUES.length];
      return hslToRgb(hue, 90, 40 + t * 30);
    }
    return [0.0, 0.12 + t * 0.15, 0.2 + t * 0.2];
  }, []);

  const ptSize = (xi: number, xiMax: number) => {
    return 1.5 + Math.min(xi / Math.max(xiMax, 1e-9), 1.0) * 6.0;
  };

  const ensureNodeGeometry = useCallback((count: number) => {
    // Force recreation if customColor is missing (from hot reload transition)
    const needsColorFix = nodeObjRef.current && !nodeObjRef.current.geometry.attributes.customColor;
    
    if (nodeObjRef.current && nodeCapacityRef.current >= count && !needsColorFix) return;
    const cap = Math.max(count + 50, 100);
    
    if (nodeObjRef.current) {
        sceneRef.current?.remove(nodeObjRef.current);
        nodeObjRef.current.geometry.dispose();
        (nodeObjRef.current.material as THREE.Material).dispose();
    }
    
    const geo = new THREE.BufferGeometry();
    const pArr = new Float32Array(cap * 3);
    const cArr = new Float32Array(cap * 3);
    const sArr = new Float32Array(cap);
    
    geo.setAttribute('position', new THREE.BufferAttribute(pArr, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('customColor', new THREE.BufferAttribute(cArr, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('size', new THREE.BufferAttribute(sArr, 1).setUsage(THREE.DynamicDrawUsage));
    
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { opacity: { value: 1.0 } },
      vertexShader: `
        attribute float size; 
        attribute vec3 customColor; 
        varying vec3 vColor;
        void main() {
          vColor = customColor;
          vec4 mvp = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (320.0 / -mvp.z);
          gl_Position  = projectionMatrix * mvp;
        }`,
      fragmentShader: `
        varying vec3 vColor; uniform float opacity;
        void main() {
          vec2 uv = gl_PointCoord * 2.0 - 1.0;
          float d = dot(uv, uv);
          if (d > 1.0) discard;
          float core = exp(-d * 4.0);
          float halo = exp(-d * 1.2) * 0.4;
          vec3 col   = vColor + vColor * core * 0.8;
          gl_FragColor = vec4(col, (core + halo) * opacity);
        }`
    });
    
    const nodeObj = new THREE.Points(geo, mat);
    nodeObjRef.current = nodeObj;
    nodeCapacityRef.current = cap;
    sceneRef.current?.add(nodeObj);
  }, []);

  const ensureEdgeGeometry = useCallback((count: number) => {
    const slots = count * 2;
    if (edgeObjRef.current && edgeCapacityRef.current >= slots) return;
    
    const cap = Math.max(slots + 100, 200);
    
    if (edgeObjRef.current) {
        sceneRef.current?.remove(edgeObjRef.current);
        edgeObjRef.current.geometry.dispose();
        (edgeObjRef.current.material as THREE.Material).dispose();
    }
    
    const geo = new THREE.BufferGeometry();
    const epos = new Float32Array(cap * 3);
    const ecol = new Float32Array(cap * 3);
    
    geo.setAttribute('position', new THREE.BufferAttribute(epos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('color', new THREE.BufferAttribute(ecol, 3).setUsage(THREE.DynamicDrawUsage));
    
    // In Three.js >=r125, vertexColors is a boolean flag indicating if buffer colors are used.
    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.90,
      depthWrite: false,
    });
    
    const edgeObj = new THREE.LineSegments(geo, mat);
    edgeObjRef.current = edgeObj;
    edgeCapacityRef.current = cap;
    sceneRef.current?.add(edgeObj);
  }, []);

  const applyForces = useCallback((edgeList: number[][], maxDepth: number, forcesOn: boolean) => {
    if (!forcesOn) return;
    
    const posMap = posMapRef.current;
    const velMap = velMapRef.current;
    const ndataMap = ndataMapRef.current;
    const ids = orderedIdsRef.current;
    
    const n = ids.length;
    if (n === 0) return;

    // Repulsion (approximate using sample if too large)
    const sample = n > 100 ? ids.slice(-100) : ids;
    const ns = sample.length;
    
    for (let i = 0; i < ns; i++) {
      const pa = posMap.get(sample[i]);
      if (!pa) continue;
      for (let j = i + 1; j < ns; j++) {
        const pb = posMap.get(sample[j]);
        if (!pb) continue;
        const dx = pa[0] - pb[0];
        const dy = pa[1] - pb[1];
        const dz = pa[2] - pb[2];
        const d2 = Math.max(dx * dx + dy * dy + dz * dz, 0.25);
        const f = REPEL / d2;
        const il = f / Math.sqrt(d2);
        const fx = dx * il;
        const fy = dy * il;
        const fz = dz * il;
        const va = velMap.get(sample[i]);
        const vb = velMap.get(sample[j]);
        if (va) { va[0] += fx; va[1] += fy; va[2] += fz; }
        if (vb) { vb[0] -= fx; vb[1] -= fy; vb[2] -= fz; }
      }
    }

    // Attraction
    for (const edge of edgeList) {
      for (let i = 0; i < edge.length - 1; i++) {
        const pa = posMap.get(edge[i]);
        const va = velMap.get(edge[i]);
        const pb = posMap.get(edge[i + 1]);
        const vb = velMap.get(edge[i + 1]);
        if (!pa || !pb || !va || !vb) continue;
        const dx = (pb[0] - pa[0]) * ATTRACT;
        const dy = (pb[1] - pa[1]) * ATTRACT;
        const dz = (pb[2] - pa[2]) * ATTRACT;
        va[0] += dx; va[1] += dy; va[2] += dz;
        vb[0] -= dx; vb[1] -= dy; vb[2] -= dz;
      }
    }

    // Gravity / Damping / Z-target
    const md = Math.max(maxDepth, 1);
    for (const id of ids) {
      const p = posMap.get(id);
      const v = velMap.get(id);
      const d = ndataMap.get(id);
      if (!p || !v || !d) continue;
      
      const zTarget = ((d.depth / md) - 0.5) * 140;
      v[2] += (zTarget - p[2]) * Z_FORCE;
      v[0] -= p[0] * GRAVITY;
      v[1] -= p[1] * GRAVITY;
      
      v[0] *= DAMP; v[1] *= DAMP; v[2] *= DAMP;
      
      const spd = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      if (spd > 6) {
        const k = 6 / spd;
        v[0] *= k; v[1] *= k; v[2] *= k;
      }
      
      p[0] += v[0]; p[1] += v[1]; p[2] += v[2];
    }
  }, []);

  const flushBuffers = useCallback((edgesOn: boolean, selectedId: number | null) => {
    const ids = orderedIdsRef.current;
    const n = ids.length;
    
    computeTopNClusters();
    ensureNodeGeometry(n);
    
    const nodeObj = nodeObjRef.current;
    if (!nodeObj) return;

    const pArr = nodeObj.geometry.attributes.position.array as Float32Array;
    const cAttr = nodeObj.geometry.attributes.customColor || nodeObj.geometry.attributes.color;
    const cArr = cAttr.array as Float32Array;
    const sArr = nodeObj.geometry.attributes.size.array as Float32Array;
    
    const posMap = posMapRef.current;
    const ndataMap = ndataMapRef.current;
    const latestXiMax = latestXiMaxRef.current;

    for (let i = 0; i < n; i++) {
        const id = ids[i];
        const p = posMap.get(id);
        const d = ndataMap.get(id);
        if (!p || !d) continue;
        
        pArr[i * 3] = p[0];
        pArr[i * 3 + 1] = p[1];
        pArr[i * 3 + 2] = p[2];
        
        let [r, g, b] = xiToRGB(d.xi, latestXiMax, d.cluster);
        
        // Dim unselected nodes if a node is selected
        if (selectedId !== null && id !== selectedId) {
          r *= 0.3;
          g *= 0.3;
          b *= 0.3;
        }

        cArr[i * 3] = r;
        cArr[i * 3 + 1] = g;
        cArr[i * 3 + 2] = b;
        
        let sz = ptSize(d.xi, latestXiMax);
        if (selectedId === id) sz *= 2.5; // Emphasize selected

        sArr[i] = sz;
    }
    
    nodeObj.geometry.attributes.position.needsUpdate = true;
    cAttr.needsUpdate = true;
    nodeObj.geometry.attributes.size.needsUpdate = true;
    nodeObj.geometry.setDrawRange(0, n);

    // Edges
    const latestEdges = latestEdgesRef.current;
    const edgeObj = edgeObjRef.current;
    
    if (edgesOn && latestEdges.length > 0) {
      let segCount = 0;
      for (const edge of latestEdges) {
        if (edge.length >= 2) segCount += edge.length - 1;
      }
      
      ensureEdgeGeometry(segCount);
      const eObj = edgeObjRef.current;
      if (!eObj) return;

      const ep = eObj.geometry.attributes.position.array as Float32Array;
      const ec = eObj.geometry.attributes.color.array as Float32Array;
      let idx = 0;
      
      const topArr = Array.from(topNClustersRef.current);

      for (const edge of latestEdges) {
        for (let i = 0; i < edge.length - 1; i++) {
            const pa = posMap.get(edge[i]);
            const pb = posMap.get(edge[i + 1]);
            if (!pa || !pb) continue;

            const dA = ndataMap.get(edge[i]);
            const dB = ndataMap.get(edge[i + 1]);
            
            const xiA = dA?.xi || 0;
            const xiB = dB?.xi || 0;
            const clA = dA?.cluster ?? -1;
            const clB = dB?.cluster ?? -1;
            
            const act = (xiA + xiB) > 0.01;
            const sameCl = act && clA === clB && clA >= 0;

            let er, eg, eb;
            if (sameCl) {
                const rank = topArr.indexOf(clA);
                if (rank < CLUSTER_HUES.length && rank !== -1) {
                   const c = hslToRgb(CLUSTER_HUES[rank], 95, 60); er=c[0]; eg=c[1]; eb=c[2];
                } else {
                   er = 0.0; eg = 0.22; eb = 0.35;
                }
            } else if (act) {
                er = 1.0; eg = 0.90; eb = 0.0;
            } else {
                er = 0.10; eg = 0.20; eb = 0.42;
            }

            // Dim edges if a node is selected but doesn't participate in this edge
            if (selectedId !== null && (edge[i] !== selectedId && edge[i+1] !== selectedId)) {
                er *= 0.15; eg *= 0.15; eb *= 0.15;
            }

            ep[idx * 6] = pa[0]; ep[idx * 6 + 1] = pa[1]; ep[idx * 6 + 2] = pa[2];
            ep[idx * 6 + 3] = pb[0]; ep[idx * 6 + 4] = pb[1]; ep[idx * 6 + 5] = pb[2];
            
            ec[idx * 6] = er; ec[idx * 6 + 1] = eg; ec[idx * 6 + 2] = eb;
            ec[idx * 6 + 3] = er; ec[idx * 6 + 4] = eg; ec[idx * 6 + 5] = eb;
            
            idx++;
            if (idx * 6 >= edgeCapacityRef.current * 3 - 6) break;
        }
      }

      eObj.geometry.attributes.position.needsUpdate = true;
      eObj.geometry.attributes.color.needsUpdate = true;
      eObj.geometry.setDrawRange(0, idx * 2);
      eObj.visible = true;
    } else if (edgeObj) {
      edgeObj.visible = false;
    }

  }, [computeTopNClusters, ensureEdgeGeometry, ensureNodeGeometry, xiToRGB]);

  // Handle Animation Loop
  useEffect(() => {
    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);

      if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // We capture current state via refs because dependencies of `useEffect(loop, [...])` 
      // recreating it every frame would be inefficient.
      const currentSpeed = speed;
      const currentlyEdgesOn = showEdges;
      const currentlyForceOn = forceEnabled;

      const minDelay = Math.max(16, 220 - currentSpeed * 20);
      const pendingState = pendingStateRef.current;

      if (pendingState && now - lastStateTimeRef.current > minDelay) {
        // Ingest state
        const s = pendingState;
        pendingStateRef.current = null;
        lastStateTimeRef.current = now;

        const verts = s.vertices || [];
        latestEdgesRef.current = s.edges || [];
        latestXiMaxRef.current = s.xi_max || 1.0;

        const posMap = posMapRef.current;
        const velMap = velMapRef.current;
        const ndataMap = ndataMapRef.current;

        const presentIds = new Set(verts.map((v) => v.id));
        for (const id of Array.from(posMap.keys())) {
          if (!presentIds.has(id)) {
            posMap.delete(id);
            velMap.delete(id);
            ndataMap.delete(id);
          }
        }

        let md = 1;
        for (const v of verts) {
          if (!posMap.has(v.id)) {
            posMap.set(
              v.id,
              new Float32Array([
                (Math.random() - 0.5) * 70,
                (Math.random() - 0.5) * 70,
                (Math.random() - 0.5) * 70,
              ])
            );
            velMap.set(v.id, new Float32Array(3));
          }
          ndataMap.set(v.id, v);
          if (v.depth > md) md = v.depth;
        }
        maxDepthGlobRef.current = md;
        orderedIdsRef.current = Array.from(posMap.keys());

        // Update UI State
        setSimState(s);
        
        // Update Server Logs
        if (s.logs && s.logs.length > 0) {
          setServerLogs(prev => {
            const next = [...prev, ...(s.logs as string[])];
            return next.length > 100 ? next.slice(next.length - 100) : next;
          });
        }

        // Update Charts Data
        omegaHisRef.current.push(s.omega ?? 0);
        xiHisRef.current.push(s.stats?.xi_count ?? 0);
        if (omegaHisRef.current.length > MAX_OMEGA_HIS) omegaHisRef.current.shift();
        if (xiHisRef.current.length > MAX_XI_HIS) xiHisRef.current.shift();

        // Move Key Light
        let cx = 0, cy = 0, cz = 0, cnt = 0;
        for (const v of verts) {
          if (v.xi > 0.01) {
            const p = posMap.get(v.id);
            if (p) {
              cx += p[0]; cy += p[1]; cz += p[2]; cnt++;
            }
          }
        }
        if (cnt > 0 && ptLightRef.current) {
          const target = new THREE.Vector3(cx / cnt, cy / cnt + 40, cz / cnt + 50);
          ptLightRef.current.position.lerp(target, 0.05);
        }
      }

      applyForces(latestEdgesRef.current, maxDepthGlobRef.current, currentlyForceOn);
      flushBuffers(currentlyEdgesOn, selectedNodeId);
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyForces, flushBuffers, forceEnabled, showEdges, speed, selectedNodeId]);


  // ── Charts Rendering ──────────────────────────────────────────────────
  const drawChart = (canvasId: string, data: number[], strokeColor: string, fillColor: string) => {
    const el = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!el) return;
    const W = el.clientWidth || 228;
    const H = el.height || 70;
    el.width = W;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(0,0,0,.65)';
    ctx.fillRect(0, 0, W, H);
    
    if (data.length < 2) return;
    
    ctx.strokeStyle = 'rgba(255,149,0,.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
        const y = (i / 3) * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
    }
    
    const mx = Math.max(...data, 1e-9) * 1.1;
    
    ctx.beginPath();
    data.forEach((v, i) => {
        const x = (i / (MAX_OMEGA_HIS - 1)) * W;
        const y = H - (v / mx) * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    ctx.beginPath();
    data.forEach((v, i) => {
        const x = (i / (MAX_OMEGA_HIS - 1)) * W;
        const y = H - (v / mx) * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.fillStyle = strokeColor;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(data[data.length - 1].toFixed(5), W - 68, 12);
  };

  useEffect(() => {
    drawChart('ch-omega', omegaHisRef.current, '#FF9500', 'rgba(255,149,0,.08)');
    drawChart('ch-xi', xiHisRef.current, '#FF00AA', 'rgba(255,0,170,.07)');
  }, [simState]);


  // ── Render Helpers ──────────────────────────────────────────────────
  const handleResetOrbit = () => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(0, 20, 180);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.autoRotate = true;
      controlsRef.current.update();
    }
  };

  const submitWsUrlChange = (e: React.FormEvent) => {
    e.preventDefault();
    setWsUrl(currentUrlInput);
  };

  return (
    <div className="relative w-full h-screen sm:overflow-hidden bg-[#000208] text-[#d0eeff] font-sans selection:bg-[#00ffb2]/30 overflow-hidden">
      {/* Simulation Container - Always full screen background */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 sm:absolute sm:inset-0 w-full h-full z-0 bg-[#000208]"
      />

      {/* Back Button */}
      <Link href="/" className="absolute top-4 right-4 z-20 text-[#8ab8cc]/80 hover:text-[#00ffb2] hover:bg-[#00ffb2]/10 transition-all uppercase tracking-widest text-[9px] sm:text-[10px] pointer-events-auto bg-[#000208]/90 px-3 py-2 border border-[#00b4ff]/20 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,180,255,0.1)] hover:border-[#00ffb2]/50">
        <span className="text-[12px] leading-none">←</span> BACK TO SITE
      </Link>

      {/* Connection Overlay */}
      {status !== 'LIVE' && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 transition-opacity duration-500 backdrop-blur-sm">
          <div className="text-[#FF9500] text-3xl sm:text-5xl font-black tracking-widest mb-1 shadow-[#FF9500]/50" style={{ textShadow: '0 0 40px rgba(255,149,0,0.6)' }}>HCSN</div>
          <div className="text-[#FF9500]/30 text-[9px] sm:text-xs tracking-[0.2em] mb-10">HIERARCHICAL CAUSAL STRUCTURE NETWORK</div>
          
          {timeoutReached ? (
            <div className="flex flex-col items-center max-w-lg px-4">
              <div className="text-[#00ffb2] text-[10px] sm:text-xs tracking-widest mb-4 uppercase font-bold text-center leading-relaxed">
                Future work is currently in progress...<br/><br/>
                <span className="text-[#8ab8cc] font-normal lowercase tracking-normal">
                  (the live cloud simulation naturally limits sessions to conserve global compute resources as models continue to learn)
                </span><br/><br/>
                Please stay tuned.
              </div>
              
              <div className="flex gap-4 mt-4">
                <button onClick={resetSimulation} className="bg-[#00ffb2]/10 border border-[#00ffb2]/30 text-[#00ffb2] hover:bg-[#00ffb2]/20 px-6 py-2 text-xs uppercase tracking-widest transition-colors font-bold shadow-[0_0_15px_rgba(0,255,178,0.2)]">
                  RECONNECT
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 border-2 border-[#FF9500]/10 border-t-[#FF9500] rounded-full animate-spin mb-4" />
              
              <div className="text-[#8ab8cc]/40 tracking-widest mb-6">
                {status === 'CONNECTING' ? 'CONNECTING TO SIMULATION ENGINE...' : 'WAITING FOR CONNECTION...'}
              </div>

              <div className="flex flex-col items-center max-w-sm w-full px-6 gap-2">
                <div className="text-[9px] text-[#00b4ff]/60 uppercase tracking-widest w-full text-left mb-1">
                  Connect to Cloud Server:
                </div>
                <form onSubmit={submitWsUrlChange} className="flex items-center gap-2 w-full">
                  <input 
                    type="text" 
                    value={currentUrlInput} 
                    onChange={(e) => setCurrentUrlInput(e.target.value)}
                    placeholder="wss://your-cloud-server.com"
                    className="flex-1 bg-black/40 border border-[#00b4ff]/20 text-[#8ab8cc] px-3 py-2 text-xs outline-none focus:border-[#FF9500]/50 transition-colors"
                  />
                  <button type="submit" className="bg-[#FF9500]/10 border border-[#FF9500]/30 text-[#FF9500] hover:bg-[#FF9500]/20 px-4 py-2 text-xs uppercase tracking-wider transition-colors">
                    Connect
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* HUD & Overlay Layer - Responsive scroll behavior */}
      <div className="fixed inset-0 z-10 overflow-y-auto sm:overflow-hidden no-scrollbar pointer-events-none">
        {/* Mobile Header Spacer - Immersive view with a 'swipe zone' at the bottom */}
        <div className="h-[88vh] sm:hidden pointer-events-none" />

        {/* Dashboard Panels Container - Mobile: translucent scroll sheet | Desktop: layout component */}
        <div className="relative z-20 flex flex-col sm:contents bg-gradient-to-b from-transparent via-[#000208]/80 to-[#000208] sm:from-transparent sm:via-transparent sm:to-transparent px-4 pb-12 pt-8 sm:p-0 min-h-screen sm:min-h-0 pointer-events-auto sm:pointer-events-none">
        {/* Top Timer Overlay - Absolute positioning within the header area on mobile */}
        {status === 'LIVE' && !timeoutReached && (
          <div className="fixed sm:absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-[#000208]/40 border border-[#00ffb2]/10 backdrop-blur-sm px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(0,255,178,0.05)] hover:bg-[#000208]/90 hover:border-[#00ffb2]/30 hover:backdrop-blur-md transition-all duration-500 group pointer-events-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffb2] animate-pulse shadow-[0_0_8px_#00ffb2]" />
            <div className="flex flex-col items-center">
              <span className="text-[7px] text-[#8ab8cc]/30 group-hover:text-[#8ab8cc]/50 uppercase tracking-[0.3em] leading-none mb-1 font-mono transition-colors">Clock Speed</span>
              <span className="text-sm font-bold text-[#00ffb2]/80 group-hover:text-[#00ffb2] font-mono leading-none tracking-widest transition-colors">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        )}

          {/* Info Panel - Absolute on desktop, relative block on mobile */}
          <div className="sm:absolute top-4 left-4 z-30 bg-[#000208]/40 hover:bg-[#000208]/90 border border-[#00b4ff]/10 hover:border-[#00b4ff]/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 p-4 sm:p-4 min-w-[210px] pointer-events-auto sm:max-w-[50vw] rounded-md shadow-[0_0_15px_rgba(0,180,255,0.03)] group mb-8 sm:mb-0">
          <div className="text-xl font-black text-[#FF9500] tracking-widest leading-none drop-shadow-[0_0_15px_rgba(255,149,0,0.35)] group-hover:drop-shadow-[0_0_20px_rgba(255,149,0,0.6)] transition-all">HCSN</div>
          <div className="text-[8px] sm:text-[8px] text-[#FF9500]/40 tracking-[0.2em] mt-1 mb-2 font-bold uppercase transition-colors group-hover:text-[#FF9500]/60">Live Environment</div>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#00b4ff]/20 to-transparent my-3" />

          <div className="grid grid-cols-2 sm:block gap-x-4">
            <div className="flex justify-between items-center my-2 gap-2 sm:gap-3">
              <span className="text-[#8ab8cc]/30 text-[9px] sm:text-[9px] font-mono tracking-tighter uppercase">status</span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${status === 'LIVE' ? 'bg-[#00ffb2] shadow-[0_0_8px_#00ffb2] animate-pulse' : 'bg-[#ff3a3a]'}`} />
                <span className="text-[10px] sm:text-[10px] font-bold text-[#d0eeff]/80 font-mono italic">{status}</span>
              </span>
            </div>
            
            <div className="flex justify-between items-center my-2 gap-2 sm:gap-3 border-t sm:border-t-0 sm:border-none border-[#00b4ff]/5 pt-2 sm:pt-0">
              <span className="text-[#8ab8cc]/30 text-[9px] sm:text-[9px] font-mono tracking-tighter uppercase">phase</span>
              <span className="text-[10px] sm:text-[9px] font-bold text-[#ffcc00]/80 text-right max-w-[120px] sm:max-w-[140px] truncate font-mono uppercase" title={simState.phase_label}>{simState.phase_label || '—'}</span>
            </div>
            <div className="flex justify-between items-center my-2 gap-2 sm:gap-3 font-mono border-t sm:border-t-0 border-[#00b4ff]/5 pt-2 sm:pt-0">
              <span className="text-[#8ab8cc]/30 text-[9px] sm:text-[9px] tracking-tighter uppercase">step.t</span>
              <span className="text-[11px] sm:text-[10px] font-bold text-[#00d4ff]/90">{simState.t ?? '—'}</span>
            </div>
            <div className="flex justify-between items-center my-2 gap-2 sm:gap-3 font-mono border-t sm:border-t-0 border-[#00b4ff]/5 pt-2 sm:pt-0">
              <span className="text-[#8ab8cc]/30 text-[9px] sm:text-[9px] tracking-tighter uppercase">verts</span>
              <span className="text-[11px] sm:text-[10px] font-bold text-[#d0eeff]/80">{simState.stats?.total_vertices ?? '—'}</span>
            </div>
            <div className="flex justify-between items-center my-2 gap-2 sm:gap-3 font-mono border-t sm:border-t-0 border-[#00b4ff]/5 pt-2 sm:pt-0">
              <span className="text-[#8ab8cc]/30 text-[9px] sm:text-[9px] tracking-tighter uppercase">edges</span>
              <span className="text-[11px] sm:text-[10px] font-bold text-[#d0eeff]/80">{simState.stats?.total_edges ?? '—'}</span>
            </div>
            <div className="flex justify-between items-center my-2 gap-2 sm:gap-3 border-t border-[#00b4ff]/5 pt-2 font-mono">
              <span className="text-[#8ab8cc]/30 text-[9px] sm:text-[9px] tracking-tighter uppercase">Ω-clos</span>
              <span className="text-[11px] sm:text-[10px] font-bold text-[#00d4ff]">{(simState.omega ?? 0).toFixed(6)}</span>
            </div>
            <div className="flex justify-between items-center my-2 gap-2 sm:gap-3 font-mono border-t border-[#00b4ff]/5 pt-2">
              <span className="text-[#8ab8cc]/30 text-[9px] sm:text-[9px] tracking-tighter uppercase">ξ-active</span>
              <span className="text-[11px] sm:text-[10px] font-bold text-[#FF9500]">{simState.stats?.xi_count ?? '—'}</span>
            </div>
            <div className="flex justify-between items-center my-2 gap-2 sm:gap-3 font-mono border-t border-[#00b4ff]/5 pt-2">
              <span className="text-[#8ab8cc]/30 text-[9px] sm:text-[9px] tracking-tighter uppercase">clusters</span>
              <span className="text-[11px] sm:text-[10px] font-bold text-[#FF00AA]">{simState.stats?.xi_clusters ?? '—'}</span>
            </div>
          </div>
        </div>

            {/* Charts Panel */}
            <div className="sm:absolute top-4 right-4 z-30 bg-[#000208]/40 hover:bg-[#000208]/90 border border-[#00b4ff]/10 hover:border-[#00b4ff]/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 p-4 sm:w-[260px] pointer-events-auto rounded-md shadow-[0_0_15px_rgba(0,180,255,0.03)] group mb-8 sm:mb-0">
              <div className="text-[8px] tracking-[0.2em] text-[#00b4ff]/30 group-hover:text-[#00b4ff]/60 uppercase mb-2 font-mono transition-colors">Ω — Hierarchical Closure</div>
              <div className="bg-black/20 p-2 rounded-sm border border-[#00b4ff]/5 group-hover:border-[#00b4ff]/20 transition-all">
                <canvas id="ch-omega" height="80" className="w-full block rendering-pixelated opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00b4ff]/10 to-transparent my-5" />
              
              <div className="text-[8px] tracking-[0.2em] text-[#00b4ff]/30 group-hover:text-[#00b4ff]/60 uppercase mb-2 font-mono transition-colors">|ξ| — Active Field Count</div>
              <div className="bg-black/20 p-2 rounded-sm border border-[#00b4ff]/5 group-hover:border-[#00b4ff]/20 transition-all">
                <canvas id="ch-xi" height="60" className="w-full block rendering-pixelated opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Legend Panel */}
            <div className="sm:absolute bottom-[80px] left-4 z-30 bg-[#000208]/40 hover:bg-[#000208]/90 border border-[#00b4ff]/10 hover:border-[#00b4ff]/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 p-4 sm:min-w-[200px] pointer-events-auto rounded-md shadow-[0_0_15px_rgba(0,180,255,0.03)] group mb-8 sm:mb-0">
              <div className="text-[8px] tracking-[0.2em] text-[#00b4ff]/30 group-hover:text-[#00b4ff]/60 uppercase mb-3 font-mono transition-colors">Simulation Key</div>
              <div className="grid grid-cols-1 gap-x-6">
                <div className="flex items-center gap-3 my-1.5 text-[11px] text-[#8ab8cc]/60 group-hover:text-[#8ab8cc] transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0d1820]" /> Inactive / basic
                </div>
                <div className="flex items-center gap-3 my-1.5 text-[11px] text-[#8ab8cc]/60 group-hover:text-[#8ab8cc] transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF9500] shadow-[0_0_6px_rgba(255,149,0,0.3)] group-hover:shadow-[0_0_10px_#FF9500]" /> Particle 1 (Major)
                </div>
                <div className="flex items-center gap-3 my-1.5 text-[11px] text-[#8ab8cc]/60 group-hover:text-[#8ab8cc] transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF00AA] shadow-[0_0_6px_rgba(255,0,170,0.3)] group-hover:shadow-[0_0_10px_#FF00AA]" /> Particle 2 (Minor)
                </div>
                <div className="hidden sm:block h-[1px] w-full bg-gradient-to-r from-transparent via-[#00b4ff]/10 to-transparent my-3" />
                <div className="flex items-center gap-3 my-1.5 text-[11px] text-[#8ab8cc]/60 group-hover:text-[#8ab8cc] transition-colors">
                  <div className="w-5 h-[3.5px] rounded-sm bg-[#0d1a28]" /> Hyperedge (static)
                </div>
                <div className="flex items-center gap-3 my-1.5 text-[11px] text-[#8ab8cc]/60 group-hover:text-[#8ab8cc] transition-colors">
                  <div className="w-5 h-[3.5px] rounded-sm bg-gradient-to-r from-[#FF9500] to-[#FF00AA]" /> Intra-cluster link
                </div>
                <div className="flex items-center gap-3 my-1.5 text-[11px] text-[#8ab8cc]/60 group-hover:text-[#8ab8cc] transition-colors">
                  <div className="w-5 h-[3.5px] rounded-sm bg-[#FFE600] shadow-[0_0_4px_rgba(255,230,0,0.3)] group-hover:shadow-[0_0_8px_#FFE600]" /> Interaction bridge
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#00b4ff]/5 mt-4 mb-2" />
              <div className="text-[8px] text-[#8ab8cc]/20 tracking-[0.2em] text-center font-mono group-hover:text-[#8ab8cc]/40 transition-colors uppercase">Z-DIMENSION : CAUSAL TIME</div>
            </div>

            {/* Floating HUD Logs */}
            <div className="sm:absolute bottom-[80px] right-4 z-30 w-full sm:w-[320px] h-[22vh] sm:h-auto max-h-[25vh] sm:max-h-[calc(100vh-320px)] pointer-events-none flex flex-col group transition-all duration-700 mb-8 sm:mb-0">
              <div className="flex justify-between items-center mb-2 px-2 pb-1 border-b border-[#00ffb2]/10 shrink-0 pointer-events-auto opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="text-[8px] sm:text-[8px] tracking-[0.25em] text-[#00ffb2]/60 uppercase font-bold">SYSTEM FEED</div>
                <div className="flex gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#00ffb2] animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-[#00ffb2] opacity-50" />
                </div>
              </div>

              <div 
                ref={terminalScrollRef}
                className="px-2 overflow-y-auto hcsn-terminal-scroll no-scrollbar sm:no-scroll font-mono text-[9.5px] sm:text-[9px] leading-relaxed text-[#8ab8cc]/70 group-hover:text-[#8ab8cc] transition-all duration-500 pointer-events-auto bg-[#000208]/20 rounded-sm"
              >
                {/* Bottom-heavy fade effect container */}
                <div className="flex flex-col-reverse justify-end min-h-full">
                  <div ref={logsEndRef} className="h-2" />
                  {serverLogs.length === 0 ? (
                    <div className="text-[#8ab8cc]/20 italic py-2">Establishing uplink...</div>
                  ) : (
                    [...serverLogs].reverse().map((log, i) => (
                      <div key={i} className={`mb-1 transition-all duration-500 hover:translate-x-1 ${
                        log.includes('[server] Phase') ? 'text-[#FF9500] font-bold' : 
                        log.includes('error') ? 'text-[#ff3a3a]' : 
                        log.includes('PROBE') ? 'text-[#FF00AA]' : ''
                      }`}>
                        <span className="text-[#00ffb2]/20 mr-2 tabular-nums">
                          {String((simState?.t || 0) - i).padStart(4, '0')}
                        </span> 
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

        {/* Controls Bar - Absolute on desktop, relative column on mobile */}
        <div className="sm:absolute sm:bottom-4 left-1/2 sm:-translate-x-1/2 z-30 bg-[#000208]/30 hover:bg-[#000208]/90 border border-[#00b4ff]/10 hover:border-[#00b4ff]/30 backdrop-blur-sm hover:backdrop-blur-md p-4 sm:px-4 sm:py-2.5 flex flex-col sm:flex-row items-center justify-center pointer-events-auto rounded-md w-full sm:w-auto transition-all duration-500 shadow-[0_0_20px_rgba(0,180,255,0.02)] group mb-12 sm:mb-0">
          <div className="grid grid-cols-2 sm:flex items-center gap-3 sm:gap-4 w-full">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`border uppercase tracking-[0.15em] transition-all text-[10px] sm:text-[9px] font-bold py-2.5 sm:py-1.5 px-4 sm:px-4 whitespace-nowrap outline-none rounded-sm ${
                !isPaused 
                  ? 'bg-[#FF9500]/5 border-[#FF9500]/40 text-[#FF9500]/80 shadow-[inset_0_0_8px_rgba(255,149,0,0.05)]' 
                  : 'bg-black/20 border-[#8ab8cc]/10 text-[#8ab8cc]/40 hover:bg-[#FF9500]/10 hover:border-[#FF9500]/60 hover:text-[#FF9500]'
              }`}
            >
              {isPaused ? '▶ Uplink' : '⏸ Stream'}
            </button>

            <button 
              onClick={resetSimulation}
              className="border uppercase tracking-[0.15em] transition-all text-[10px] sm:text-[9px] font-bold py-2.5 sm:py-1.5 px-4 sm:px-4 whitespace-nowrap outline-none bg-black/20 border-[#ff3a3a]/20 text-[#ff3a3a]/40 hover:bg-[#ff3a3a]/10 hover:border-[#ff3a3a]/60 hover:text-[#ff3a3a] rounded-sm"
            >
              ⏹ Purge
            </button>

            <button 
              onClick={() => setShowEdges(!showEdges)}
              className={`border uppercase tracking-[0.15em] transition-all text-[10px] sm:text-[9px] font-bold py-2.5 sm:py-1.5 px-4 sm:px-4 whitespace-nowrap outline-none rounded-sm ${
                showEdges 
                  ? 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]' 
                  : 'bg-black/20 border-[#8ab8cc]/10 text-[#8ab8cc]/40 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/60 hover:text-[#00d4ff]'
              }`}
            >
              Edge {showEdges ? 'Show' : 'Hide'}
            </button>

            <button 
              onClick={() => setForceEnabled(!forceEnabled)}
              className={`border uppercase tracking-[0.15em] transition-all text-[10px] sm:text-[9px] font-bold py-2.5 sm:py-1.5 px-4 sm:px-4 whitespace-nowrap outline-none rounded-sm ${
                forceEnabled 
                  ? 'bg-[#FF00AA]/10 border-[#FF00AA]/40 text-[#FF00AA]' 
                  : 'bg-black/20 border-[#8ab8cc]/10 text-[#8ab8cc]/40 hover:bg-[#FF00AA]/10 hover:border-[#FF00AA]/60 hover:text-[#FF00AA]'
              }`}
            >
              Force {forceEnabled ? 'On' : 'Off'}
            </button>

            <div className="col-span-2 sm:hidden h-[1px] w-full bg-[#00b4ff]/5 my-1" />

            <div className="col-span-2 sm:col-span-auto flex items-center justify-between sm:justify-center gap-4 px-2 sm:px-0 group/speed">
              <span className="text-[10px] sm:text-[8px] text-[#8ab8cc]/40 sm:text-[#8ab8cc]/20 group-hover/speed:text-[#8ab8cc]/40 tracking-[0.2em] font-mono uppercase transition-colors">Warp Speed</span>
              <input 
                type="range" 
                min="1" max="10" 
                value={speed} 
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="flex-grow sm:w-16 accent-[#FF9500] cursor-pointer bg-[#00b4ff]/5 h-0.5 rounded-full appearance-none outline-none group-hover/speed:bg-[#00b4ff]/20 transition-all opacity-60 group-hover/speed:opacity-100 placeholder-transparent"
              />
            </div>

            <button 
              onClick={handleResetOrbit}
              className="col-span-2 sm:col-span-auto border border-[#8ab8cc]/10 text-[#8ab8cc]/40 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/50 hover:text-[#00d4ff] uppercase tracking-[0.15em] text-[10px] sm:text-[9px] font-bold py-2.5 sm:py-1.5 px-4 sm:px-4 whitespace-nowrap outline-none rounded-sm transition-all shadow-none mt-2 sm:mt-0"
            >
              ↺ Synchronize
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
