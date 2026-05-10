# 🧩 HCSN Theory — Hierarchical Causal Structure Networks 

[![DOI](https://img.shields.io/badge/DOI-10.55277%2Fresearchhub.fvahxvpt.1-blue)](https://doi.org/10.55277/researchhub.fvahxvpt.1)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0004--1698--5729-green.svg)](https://orcid.org/0009-0004-1698-5729)
[![Status](https://img.shields.io/badge/Status-Active%20Research-orange)](https://github.com/hcsn-theory)

---

> **"The universe may not be described by computation — it may *be* computation."**

HCSN is a framework for emergent physics built from the ground up — starting with nothing but discrete events and directed causal relations, and asking what universe falls out.

📄 **[Read the Paper →](https://doi.org/10.55277/researchhub.fvahxvpt.1)**
📺 **[Watch the Overview →](https://youtu.be/A0oh6Rlx03Y)**
🔬 **[Explore the Simulation Repo (Rust) →](https://github.com/hcsn-theory/hcsn-rust)**
🔬 **[Legacy Simulation Repo →](https://github.com/hcsn-theory/hcsn-sim)**

---

## What Is HCSN?

HCSN (**Hierarchical Causal Structure Networks**) is a theoretical framework that proposes the universe is fundamentally a causal computation — not a differential manifold, not a Hilbert space, not a lattice.

**Starting assumptions (the complete list):**

- Discrete events (vertices)
- Directed causal relations (hyperedges)
- Local probabilistic rewrite rules
- No background spacetime, metric, or symmetry

**What emerges from these assumptions:**

| Emergent Property | HCSN Interpretation |
|---|---|
| Time | Count of irreversible rewrites (causal depth) |
| Space / Geometry | Large-scale causal regularity |
| Particles | Stable, persistent topological defects (Ω discontinuities) |
| Mass | Defect inertia — inverse variance of rewrite imbalance |
| Interaction | Rewrite competition for a shared Ω-modulated pool |
| Lorentz invariance | Attractor of rewrite dynamics, not a postulate |
| Quantum behavior | Causal ambiguity + finite information resolution |

This is not a reinterpretation of existing physics.  
It is a theory of **why theories work**.

---

## Core Principles

**1. No circular reasoning**  
We do not assume the structures we are trying to explain. No manifolds, no wavefunctions, no predefined symmetries.

**2. Empirical grounding**  
Every claim beyond the axioms requires an operational definition, a measurement protocol, and reproducible simulation evidence.

**3. Falsifiability**  
The theory fails if no universal signal speed emerges, no persistent structures form, or universality is absent across rule variations.

**4. One definition per concept**  
Each term (defect, worldline, particle, momentum, mass, interaction) is defined exactly once in the canonical documents.

---

## Repository Structure

```text
hcsn-theory/
│
├── docs/                                              # 📚 Canonical theory (read sequentially)
│   ├── 01_axioms_and_methodology.md                  # Minimal axioms + methodology (4.6 KB)
│   ├── 02_defects_worldlines_and_particles.md        # Emergent objects + identity (6.9 KB)
│   ├── 03_emergent_dynamics_momentum_and_interaction.md  # Motion, mass, interaction (8.0 KB)
│   ├── 04_geometry_dimension_uncertainty_and_limits.md   # Geometry + open problems (9.1 KB)
│   ├── 05_emergence_of_particles.md                      # Mechanics of matter condensation [NEW]
│   └── archive/                                       # 17 superseded / historical drafts
│
├── website/                                           # 🌐 Next.js 14 research website
│   ├── app/                                           # 6 pages (home, about, docs, figures, roadmap, contact)
│   ├── components/                                    # 5 reusable React components
│   ├── config/site.ts                                 # All site content — update here
│   └── types/                                         # TypeScript interfaces
│
├── figures/                                           # 📊 Simulation visualizations
├── MANIFESTO.md                                       # Project motivation & philosophy
├── WORKSPACE_STATUS.md                                # Full project status
└── README.md
```

> ⚠️ This repository contains **no simulation code**.  
> All numerical experiments are conducted in the high-performance **[hcsn-rust](https://github.com/hcsn-theory/hcsn-rust)** engine, which replaced the legacy `hcsn-sim` prototype in Phase 10.

---

## The Five Canonical Documents

The entire HCSN theory is documented in exactly **five files**, designed to be read in order:

### [01 — Axioms and Methodology](docs/01_axioms_and_methodology.md)
Defines the five core axioms:
- **Axiom 0**: Discrete relational substrate (hypergraph)
- **Axiom 1**: Causal consistency (irreflexivity + transitivity → DAG)
- **Axiom 2**: Local rewrite dynamics (bounded, finite, causal)
- **Axiom 3**: Local finiteness (finite past/future → emergent signal speed)
- **Axiom 4**: Hierarchical closure tension (the regulatory principle)
- **Axiom 5**: Defect permissibility (localized closure violations allowed)

Sets methodological discipline: observation → definition → derived result → conjecture.

---

### [02 — Defects, Worldlines, and Particles](docs/02_defects_worldlines_and_particles.md)
Defines the first emergent objects:
- **Defect**: A localized event where Ω changes discontinuously (`|ΔΩ| > ε`)
- **Worldline**: An equivalence class of persistent defect events (identity via overlap continuity)
- **Proto-object**: A persistent ξ-cluster with measurable identity
- **Particle**: A proto-object satisfying all four operationally-defined criteria (persistence, momentum coherence, inertial stability, structural coupling)
- **Mass**: Emergent defect inertia — `m ~ 1/Var(p)`

---

### [03 — Emergent Dynamics, Momentum, and Interaction](docs/03_emergent_dynamics_momentum_and_interaction.md)
Defines how objects move and interact without space:
- **Momentum**: Statistical persistence of rewrite imbalance
- **Interaction**: Rewrite competition for the Ω-modulated rewrite pool
- **Interaction strength**: `F_AB = |Φ_A − Φ_B| / τ_coexist`
- **Interaction graph distance**: Rewrite overlap, not spatial proximity
- **Conservation**: Statistical only — emerges from closure tension, not symmetry axioms

---

### [04 — Geometry, Dimension, Uncertainty, and Limits](docs/04_geometry_dimension_uncertainty_and_limits.md)
Documents the large-scale structure and known boundaries:
- Phase diagram of Ω regimes (subcritical / critical / supercritical)
- Effective dimension: `D_eff(r) = d log N(r) / d log r`
- Lifetime–momentum variance relation: `Var(p) ∝ τ⁻¹`
- Geometry reconstruction attempts (causal distance, interaction-graph distance, spatial slices)
- Explicit open problems and falsification criteria

---

### [05 — Emergence of Particles](docs/05_emergence_of_particles.md)
Formalizes the transition from stochastic noise to persistent structure:
- **The Three Pillars**: Suppression, Coherence-Gated Growth, and Boundary Tension
- **Nucleation Threshold**: The maturity point $\tau_c \approx 600 - 1000$ steps
- **Scale-Free Scaling**: Power-law lifetimes (critical range $\alpha \approx 1.7 - 2.0$)
- **Kinematics**: Interaction phenomenology (Threshold-gated interaction $\chi > 0.14$, deflection $71.5^\circ$)

---

## Validated Results (from Simulation)

| Result | Status |
|--------|--------|
| Zero causality violations across all variants | ✅ Confirmed |
| Finite emergent signal speed | ✅ Confirmed (~0.086–0.123 normalized) |
| Phase transition at Ω ≈ 1.1 | ✅ Confirmed ($p=0.64, \gamma=2.2$) |
| Threshold-Gated Interaction ($\chi_c = 0.14$) | ✅ Confirmed (Phase 12) |
| Predictive Force Law ($k = 182.1$) | ✅ Confirmed (Phase 12) |
| Persistent defect worldlines above critical Ω | ✅ Confirmed |
| Uncertainty relation robust across parameter sweep | ✅ Confirmed |

---

## Open Problems

1. What mechanism selects effective dimension asymptotically?
2. Can rewrite redundancy classes produce nontrivial symmetry-group structure?
3. Are there discrete defect species with a classification?
4. Can exclusion-like statistics emerge from worldline topology?
5. Can exact invariance principles emerge in a continuum limit?
6. Can Ω dynamics reproduce effective field balance laws under coarse-graining?

---

## Website

A companion research website is included in `website/`, built with:

- **Next.js 14** (App Router, TypeScript, SSG)
- **Tailwind CSS 3.3** (responsive, mobile-first)
- **6 pages**: Home, About, Docs, Figures, Roadmap, Contact
- **Centralized content**: All text lives in `website/config/site.ts`

**Run locally:**
```bash
cd website
npm install
npm run dev
# Visit http://localhost:3000
```

---

## Citation

If you use HCSN in your research, please cite:

> Saif Mukhtar. *HCSN: A Hierarchical Causal Structure Network Framework for Emergent Physics.* ResearchHub, 2026.  
> DOI: [10.55277/researchhub.fvahxvpt.1](https://doi.org/10.55277/researchhub.fvahxvpt.1)

```bibtex
@article{mukhtar2026hcsn,
  author = {Saif Mukhtar},
  title  = {HCSN: A Hierarchical Causal Structure Network Framework for Emergent Physics},
  year   = {2026},
  doi    = {10.55277/researchhub.fvahxvpt.1},
  url    = {https://doi.org/10.55277/researchhub.fvahxvpt.1}
}
```

---

## Philosophy

This is a **theory in formation**, not a finished model.

It documents what has been observed in simulation, what has been derived from axioms, and what remains open or speculative. Claims are graded by empirical support. Speculation is explicitly labeled.

See [MANIFESTO.md](MANIFESTO.md) for the full motivation.

---

## Status

| Milestone | Status |
|-----------|--------|
| Axiomatic foundation | ✅ Stable |
| CPU-Efficient Core Migration (Rust) | ✅ Completed (Phase 10) |
| Interaction Theory (Force Law) | ✅ Completed (Phase 12) |
| Emergent objects (defects, worldlines, particles) | ✅ Empirically grounded |
| Dynamics, momentum, interaction | ✅ Empirically supported |
| Geometry and dimension | 🔄 Partial — open problems remain |
| Physical correspondence (Standard Model, GR) | 🔬 Conjectural |

---

## License & Contact

This project is licensed under the **MIT License**.

For collaboration or questions: [github.com/hcsn-theory](https://github.com/hcsn-theory)
