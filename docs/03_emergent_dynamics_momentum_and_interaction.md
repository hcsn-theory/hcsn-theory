# Emergent Dynamics, Momentum, and Interaction in HCSN

**Status:** Empirically supported at current simulation scale (≤250k steps, ≤5k vertices)  
**Scope:** Motion, momentum, mass, and interaction without spacetime  
**Basis:** Simulation evidence from Steps 1–16 (simulation milestones documented separately)

---

In HCSN, dynamics is defined as **relational structural transformation**. 

Following **Mach's Principle**, we assume no background space. Therefore, absolute position and absolute velocity do not exist. All kinematic properties (velocity, momentum, force) are defined purely by the **interaction between pairs of structures**.

There is no manifold. There is only:
- Rewrite sequences
- Causal ordering
- Structural overlap (Relational Distance)
- Statistical persistence

All motion is relational and historical.

---

## 2. Rewrite Flow

Rewrite flow is the ordered sequence of hypergraph transformations:

$$H_0 \rightarrow H_1 \rightarrow H_2 \rightarrow \dots$$

Each step:
- Acts locally on bounded subgraphs
- Preserves causal consistency
- Modifies finite information
- Is probabilistically accepted or rejected

All dynamics arise from this process alone.

---

## 3. Time as Rewrite Depth

Time is not an external parameter. Time is **rewrite depth**:

$$t := \text{number of rewrites executed}$$

This defines:
- An arrow of time (irreversible rewrite application)
- A partial temporal ordering of events
- A countable, discrete time axis

No clock or continuous parameter is assumed.

---

## 4. Relational Distance ($d_{AB}$)

In a background-independent universe, distance is defined by structural overlap:

$$d_{AB} = 1 - \chi$$

where $\chi$ is the structural overlap ratio ($|A \cap B| / \min(|A|, |B|)$).

---

## 5. The Horizon Problem & Halo-Interaction

### 5.1 The Structural Horizon
In a pure core-overlap model, particles are invisible to each other ($d_{AB} = 1$) until they physically touch. This creates a "Horizon Problem" where approach velocity is unmeasurable.

### 5.2 Interaction Halos (Short-Range Potential)
To solve this, HCSN utilizes **Halo-Interaction**:
- **Halo ($H$):** The core vertices of a knot plus its 1-hop interaction neighborhood.
- **Relational $\chi$:** Computed using the intersection of these expanded halos.

**Physical Analogy:** This creates a short-range interaction potential similar to the **Strong Nuclear Force** (Yukawa potential). Particles "sense" each other when their halos overlap, allowing for approach tracking before core-collision.

---

## 6. Relational Velocity ($v_{rel}$)

Relational velocity is the **instantaneous rate of change of structural overlap**:

$$v_{rel} := \frac{d\chi}{dt}$$

### 6.1 Stochastic Noise Filtering (EMA)
Because rewrites are stochastic, the raw $\chi$ signal is noisy. HCSN implements an **Exponential Moving Average (EMA)** to filter background "quantum foam" jitter:

$$v_{smoothed}(t) = \alpha \cdot v_{raw} + (1 - \alpha) \cdot v_{smoothed}(t-1)$$

where $\alpha = 0.2$. This captures true kinematic trends (acceleration/recoil) while ignoring rewrite noise.

### 6.2 The 1D Relational Regime (Scalar Limitation)
Currently, $v_{rel}$ is a **scalar quantity**. It measures the rate of structural merging or recession but does NOT possess a direction (vector).

**Consequences:**
1. **No Scattering Angles:** In the current 1D regime, a "collision" is measured purely by intensity, not by deflection ($\theta$).
2. **Dimensional Ambiguity:** Because HCSN has not yet proven its emergent dimensionality ($D$), we avoid ad-hoc coordinate reconstructions (like MDS).
3. **Scalar Conservation:** Momentum conservation is currently tested as a scalar balance ($m_a v_a + m_b v_b = \text{const}$).

**Future Path:** True vector kinematics will only be possible once a stable, emergent dimensionality is proven and a relational coordinate system is reconstructed from the distance matrix. Until then, HCSN operates in a **1D Relational Regime**.

---

## 7. Relational Momentum ($p_{rel}$)

Relational momentum exists only **during an interaction event**:

$$p_{rel} := m_{reduced} \cdot v_{rel\_smoothed}$$

where $m_{reduced}$ is derived from the masses of the interacting knot pair. 

**Note on Absolute Momentum:** Previous concepts of "Absolute Momentum" derived from vertex-ID labels are now deprecated as **Diagnostic Proxies** only. They do not represent physical motion in the Machian sense.

Mass is defined empirically as inverse momentum variance (see File 2, Section 8 for detailed definition and the code implementation `m = |V| × C²`):

$$m \sim \frac{1}{\text{Var}(p)}$$

**Measured relationship:**

$$m \propto \tau$$

where $\tau$ is worldline lifetime.

Mass is **not** a conserved quantity in current simulations. It is a derived statistical property of persistent worldlines.

**Note:** The code implements `mass = vertex_count × coherence²`. The equivalence between this and the theoretical `m ~ 1/Var(p)` is an open question (see doc 02, Section 8).

---

## 7. Interaction (Operational Definition)

Interaction is defined operationally via rewrite competition (see [docs/02_defects_worldlines_and_particles.md](02_defects_worldlines_and_particles.md#6-interaction-minimal-definition)).

Interaction is:
- Asymmetric (no guaranteed action-reaction)
- Environment-mediated (via Ω-modulated rewrite pool)
- Rewrite-native (not dependent on any large-scale reconstruction)
- Non-conservative (total ξ not preserved)

**Empirical basis:** Step 12 dual-injection experiments with controlled proto-particle coexistence.

---

## 8. Rewrite Competition (Primary Interaction Mechanism)

### 8.1 Continuous Relational Relief (Asymptotic Freedom)

To resolve the **Crystalline Freeze** (where high-density knots become too rigid to interact), HCSN implements a **Relational Relief Function** $\Gamma(\chi)$. 

This function reduces the rewrite suppression factor $\alpha_{eff}$ linearly as the structural overlap $\chi$ increases.

$$\alpha_{eff}' = \alpha_{eff} \cdot [1.0 - 0.8 \cdot \min(1.0, \frac{\chi}{0.4})]$$

This mechanism creates an emergent state of **Asymptotic Freedom**:
1.  **Isolated Stability**: At $\chi=0$, knots are "frozen" and stable (High Confinement).
2.  **Interactive Fluidity**: At $\chi \ge 0.4$, structural tension is "liquefied," allowing vertices to flow freely and exchange momentum (Asymptotic Freedom).

This allows the HCSN engine to produce measurable relational velocities ($v_{rel} \approx 10^{-4}$) during collisions, overcoming the topological inertia of high-coherence motifs.

Proto-particles compete for rewrite opportunities. Coexisting ξ-clusters suppress one another's rewrite participation.

**Observable:** Rewrite flux

$$\Phi_C(t) = \text{number of rewrites touching cluster } C \text{ up to time } t$$

**Measured effect:**
- Cluster A: 724 rewrites, Δξ ≈ +1311
- Cluster B: 534 rewrites, Δξ ≈ −60

Interaction strength scales with rewrite flux imbalance, not spatial proximity.

**Key result:** Interaction occurs via **competitive access to the rewrite pool**, not via force fields or structural coupling.

---

## 9. Interaction Strength (Scalar Proxy)

$$F_{AB} = \frac{|\Phi_A - \Phi_B|}{\tau_{\text{coexist}}}$$

Where:
- $\Phi_A, \Phi_B$ are cluster rewrite fluxes
- $\tau_{\text{coexist}}$ is coexistence duration

This quantity is:

- Dimensionless
- Rewrite-native
- **Empirical Coupling ($k$):** $182.1$ (Phase 12 calibration)
- Environment-mediated

---

### 10.1 Scattering Geometry

Empirical collision analysis reveals a significant **Back-Scattering Bias**.

- **Mean Deflection ($\theta$):** $71.5^\circ$
- **Mechanism:** Stability flux dissipation at the threshold boundary.

---

## 11. Fragile Emergent Conservation

In HCSN, statistical conservation-like correlations arise from **rewrite accounting**, not from assumed symmetries.

### 11.1 Unpatched Results (Baseline)

The v3.1 replication suite tested 9 universe seeds with `HCSN_PATCHES=false` (no conservation corrections):

- **Mean Spearman ρ:** $-0.4674 \pm 0.1642$
- This is a **weak-to-moderate** statistical correlation (R² ≈ 0.22)
- NOT exact conservation — no Δp = 0 observed at microscopic level
- Worst-case seed: ρ = −0.24 (very weak)

**Mechanism:**
- Rewrites create/destroy defect charge
- Statistical balance emerges from closure tension
- No exact conservation at microscopic level

### 11.2 Patched Results (Hybrid Mode)

With `HCSN_PATCHES=true` (the default configuration), three engineered corrections are applied:

- **Pairwise (Hyp A):** Symmetric momentum redistribution between interacting knots, strength ramps with stability
- **FluxCompensated (Hyp C):** Momentum reservoir with diffusive re-absorption (α = 0.15, decay 0.999)
- **StabilityScaled (Hyp B):** Inertial cooling via `v = v × exp(−S/30) + 0.05`

These are **engineered corrections**, not emergent properties. They are explicitly flagged via the `HCSN_PATCHES` environment variable.

### 11.3 Scientific Question

Does the unpatched ρ ≈ −0.47 strengthen toward −1.0 at larger scales (>10⁶ vertices)? This is the key open question requiring larger-scale computation.

**Logical reversal:** If statistical conservation strengthens at scale, this suggests an underlying emergent symmetry. Symmetry would be **fragile and emergent**, not fundamental. This remains unconfirmed.

---

## 12. Interaction-Graph Distance

Let:
- $R_A(t)$: rewrites touching cluster A
- $R_B(t)$: rewrites touching cluster B

**Rewrite overlap distance:**

$$d_{AB} = 1 - \frac{|R_A \cap R_B|}{|R_A \cup R_B|}$$

This defines interaction-graph distance as the relevant separation measure for interaction.

**Key distinction:** Clusters may be "close" in interaction-graph distance but "far" in rewrite separation, yielding distinct structural response.

---

## 13. Environment-Mediated Interaction

Interaction is not direct cluster-to-coupling. Instead:

$$\text{Cluster A} \leftrightarrow \text{Ω-modulated rewrite pool} \leftrightarrow \text{Cluster B}$$

**Measured environment effect:**
- Total ξ not conserved: $\Delta\xi_A + \Delta\xi_B \neq 0$
- Environment ratio: $R_{\text{env}} \approx 0.91$
- Imbalance absorbed by global Ω modulation

This exhibits non-conservative dissipation to a shared environment, with no direct cluster-to-cluster force.

---

## 14. Empirical Laws (Interaction)

Across all tested runs:

1. Interaction is **non-zero iff rewrite overlap $\chi > 0.14$** (empirical observation)
2. Interaction strength $F_{AB}$ follows an **empirical scaling relation**: $F \sim k/\chi$ ($k = 182.1$, fit to Phase 12 data). This is a phenomenological observation, not a derived law.
3. Interaction is **asymmetric**
4. Total ξ is **not conserved** (Stability Flux is the invariant)
5. Ω-modulated environment mediates dissipation
6. Mean deflection $\theta \approx 71.5^\circ$

---

## 15. What This Is NOT

No external frameworks are assumed. All statements here are operational and grounded in rewrite statistics only.

---

## 16. Ontological Shift

| Classical Concept | HCSN Interpretation |
|-------------------|---------------------|
| Force | Rewrite suppression |
| Distance | Rewrite overlap |
| Interaction | Competition for rewrite access |
| Field | Ω-regime modulation |
| Conservation | Statistical only |
| Trajectory | Worldline through rewrite history |

Particles are **rewrite competitors**, not force carriers or structural objects.

---

## 17. Status Summary

All statements in this document are:
- Operationally defined
- Measured in simulation
- Reproducible across parameter variations
- Validated in Steps 11–16

**Open questions:**
- Scaling behavior of $F_{AB}(d_{AB})$
- Many-body competition dynamics
- Identification of exactly conserved currents (if any)
- Emergence of classical force laws at large scale

No claims beyond these are made at this stage.

---

## 18. Emergence Classification

| Property | Type | Mechanism | Verified In |
|:---------|:-----|:----------|:------------|
| Coherent subgraph formation | **Emergent** | Base rules only | Pure mode |
| Knot persistence (>50 steps) | **Emergent** | Arises without memory | Pure mode |
| F ~ k/χ force scaling | **Emergent** | Observed in all modes | Pure + Assisted |
| Power-law lifetime distribution | **Assisted** | Requires stability memory (H8) | Assisted mode |
| Momentum correlation ρ ≈ −0.47 | **Emergent (fragile)** | Unpatched runs | Baseline |
| Deep coupling scattering | **Engineered** | coupling_modifier = 0.2 | Assisted mode |
| Stronger conservation | **Engineered** | Requires Hybrid mode patches | Hybrid mode |

**Definitions:**
- **Emergent:** Arises from base rewrite rules without designed mechanisms
- **Assisted:** Requires memory/feedback systems but not direct correction
- **Engineered:** Requires explicit correction patches

---

## 19. Open Problems (Implementation)

In addition to the theoretical open problems in doc 04, the following implementation gaps exist:

1. **Positional proxy:** The code uses vertex-ID centroids as a position proxy. Proper metric embedding (graph geodesics, persistent homology, or MDS) is needed for rigorous kinematic claims.
2. **Mass equivalence:** The two candidate mass definitions (1/Var(p) vs |V|×C²) have not been shown to be equivalent.
3. **Scale dependence:** All results are at ≤250k steps / ≤5k vertices. Asymptotic behavior at 10⁶+ vertices is unknown.

---

## 20. Forward Compatibility

This framework is designed to support future derivations of:
- Emergent large-scale mechanics (low Ω variance)
- Effective coarse-grained dynamics
- Redundancy-based structural classes

But none of these are present in the current formulation.
