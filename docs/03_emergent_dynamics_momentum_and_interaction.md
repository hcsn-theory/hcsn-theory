# Emergent Dynamics, Momentum, and Interaction in HCSN

**Status:** Empirically supported  
**Scope:** Motion, momentum, mass, and interaction without spacetime  
**Basis:** Simulation evidence from Steps 1–16 (simulation milestones documented separately)

---

## 1. Dynamics Without Space

In HCSN, dynamics is defined as **persistence and transformation under rewrite flow**.

There is no background space in which objects move. There are no trajectories in a manifold. There is only:
- Rewrite sequences
- Causal ordering
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

## 4. Rewrite Imbalance

A worldline exhibits **rewrite imbalance** if rewrites occur preferentially on one side of its causal support over time.

**Operational measurement:**
- Count rewrites in the causal future cone of each defect event
- Compare "left" vs "right" rewrite asymmetry (in interaction graph)
- Track directional bias over temporal windows

Rewrite imbalance is directly observable in rewrite logs.

---

## 5. Momentum (Unified Operational Definition)

Momentum is defined as the **statistical persistence of rewrite imbalance** across a finite temporal window.

**Equivalent operational measures:**

### 5.1 Before/After Asymmetry

$$p_1 := \langle n_{\text{after}} - n_{\text{before}} \rangle_{\Delta t}$$

where $n$ counts rewrites in forward vs backward causal cones.

### 5.2 Variance of Causal Displacement

$$p_2 := \text{Var}(\Delta x_{\text{causal}})^{-1}$$

Low variance → high persistence → high momentum.

### 5.3 Rewrite Flux Persistence

$$p_3 := \text{autocorrelation}(\Phi(t), \Phi(t+\tau))$$

where $\Phi(t)$ is rewrite flux at time $t$.

**Empirical result:** These three measures are operationally equivalent in simulation and produce consistent momentum assignments.

---

## 6. Mass

Mass is defined empirically as inverse momentum variance (see File 2, Section 8 for detailed definition):

$$m \sim \frac{1}{\text{Var}(p)}$$

**Measured relationship:**

$$m \propto \tau$$

where $\tau$ is worldline lifetime.

Mass is **not** a conserved quantity in current simulations. It is a derived statistical property of persistent worldlines.

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

In HCSN, statistical conservation laws arise from **rewrite accounting**, not from assumed symmetries. The v3.1 replication suite tested this across 9 unpatched universe seeds (up to 60k rewrites).

**Mechanism:**
- Rewrites create/destroy defect charge
- Statistical balance emerges from closure tension
- No exact conservation at microscopic level

**Observed Fragile Conservation:**
- **Mean Spearman ρ:** $-0.4674 \pm 0.1642$
- Momentum drift naturally drops as structural persistence increases, proving approximate conservation emerges from structure.
- However, the effect fluctuates based on topological seed (worst-case $\rho = -0.24$), proving it is a *fragile* and statistical conservation, not an exact deterministic one.

**Logical reversal:** Observed statistical conservation suggests an underlying emergent symmetry, rather than a symmetry axiomatically dictating exact conservation. Symmetry is **fragile and emergent**, not fundamental.

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

1. Interaction is **non-zero iff rewrite overlap $\chi > 0.14$**
2. Interaction strength $F_{AB}$ follows a piecewise decay: $F \sim k/\chi$
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

## 18. Forward Compatibility

This framework is designed to support future derivations of:
- Emergent large-scale mechanics (low Ω variance)
- Effective coarse-grained dynamics
- Redundancy-based structural classes

But none of these are present in the current formulation.
