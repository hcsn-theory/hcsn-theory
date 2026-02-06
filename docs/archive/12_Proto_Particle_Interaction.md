# Proto-Particle Interaction in HCSN
**Status:** Empirically Supported (Simulation-Based)  
**Scope:** Interaction existence and minimal operational definition  
**Note:** All terms (ξ, Ω, distance, interaction) are internal engine constructs.  
No correspondence to known physical theories is assumed.

---

## 1. Purpose

This document defines **proto-particle interaction** as it is *actually observed*
in HCSN simulations.

Interaction is **not assumed** to be:
- geometric
- force-based
- symmetric
- conservative
- field-mediated in the classical sense

Instead, interaction is defined operationally as a **measurable change in rewrite dynamics caused by coexistence**.

---

## 2. Proto-Particles (Minimal Recap)

From prior experiments:

- Proto-particles are **persistent ξ-clusters**
- Identity is defined by **continuity of overlap over time**
- Constituents (vertices) may change completely
- Existence depends on Ω-regime
- Proto-particles coexist without guaranteed merging under protection

This establishes **existence**, not interaction.

---

## 3. Established Negative Results

The following mechanisms were explicitly tested and **not observed**:

- ❌ ξ–ξ force exchange
- ❌ Ω-gradient attraction or repulsion
- ❌ Action–reaction symmetry
- ❌ Momentum-like transfer
- ❌ Local geometric force laws
- ❌ Scalar conservation of ξ

These absences are stable across parameter scans and constrain theory development.

---

## 4. Core Discovery: Rewrite Competition Interaction (RCI)

### Principle 1 — Rewrite Scarcity

> Rewrite events are a finite, locally constrained resource.

Access to rewrites depends on:
- Ω-regime
- local graph structure
- acceptance probabilities

---

### Principle 2 — Competitive Suppression

> Coexisting ξ-clusters suppress one another’s rewrite participation.

Suppression is:
- asymmetric
- history-dependent
- environment-mediated

---

### Principle 3 — Environment Mediation

> Interaction is mediated by the rewrite environment (Ω-regime),
not by direct cluster-to-cluster coupling.

Imbalance is absorbed by the system.

---

## 5. Rewrite Flux (Observable)

### Definition — Vertex Rewrite Flux

For a vertex \( v \):

\[
\Phi(v, t) = \text{number of rewrite events touching } v \text{ up to time } t
\]

Flux is accumulated over sliding windows to avoid divergence.

---

### Definition — Cluster Rewrite Flux

For a proto-particle (cluster) \( C \):

\[
\Phi_C(t) = \sum_{v \in C} \Phi(v, t)
\]

This measures how strongly the cluster participates in rewrite dynamics.

---

## 6. Operational Definition of Interaction

### Definition — Proto-Particle Interaction

Two proto-particles \( A \) and \( B \) **interact** if:

> The rewrite flux of one cluster is measurably altered by the presence of the other,
relative to isolated evolution.

This definition:
- does not assume geometry
- does not assume symmetry
- does not assume conservation

---

## 7. Rewrite-Distance (Non-Geometric)

Let:
- \( R_A(t) \): rewrites touching cluster A
- \( R_B(t) \): rewrites touching cluster B

### Rewrite Overlap Distance

\[
d_{AB} = 1 - \frac{|R_A \cap R_B|}{|R_A \cup R_B|}
\]

This replaces spatial distance as the relevant separation measure.

---

## 8. Interaction Strength (Scalar Proxy)

### Definition — Interaction Strength

\[
F_{AB} = \frac{|\Phi_A - \Phi_B|}{\tau}
\]

Where:
- \( \Phi_A, \Phi_B \) are cluster rewrite fluxes
- \( \tau \) is coexistence duration

This quantity is:
- dimensionless
- non-geometric
- non-conservative
- environment-mediated

---

## 9. Empirical Laws (Current)

Across all tested runs:

1. Interaction is **non-zero iff rewrite overlap exists**
2. Interaction strength decreases with rewrite-distance
3. Interaction is **asymmetric**
4. Total ξ is **not conserved**
5. Ω mediates dissipation and redistribution

---

## 10. Interpretation

Proto-particles are **rewrite competitors**, not force carriers.

They resemble:
- competing ecological species
- autocatalytic structures
- entropic sinks

More than:
- classical particles
- quantum fields
- geometric objects

---

## 11. Ontological Shift

| Classical Concept | HCSN Interpretation |
|------------------|--------------------|
| Force | Rewrite suppression |
| Distance | Rewrite overlap |
| Interaction | Competition |
| Field | Ω-regime |
| Conservation | Statistical only |

---

## 12. What This Is Not

- Not gravity  
- Not electromagnetism  
- Not quantum exchange  
- Not spacetime curvature  

These may emerge later, but are **not assumed**.

---

## 13. Status Summary

- Proto-particles **exist**
- Proto-particles **persist**
- Proto-particles **interact**
- Interaction is **not geometric**
- Interaction is **not symmetric**
- Conservation laws are **not primitive**

Interaction occurs via **rewrite competition**.

This is a new primitive in the HCSN framework.

---

## 14. Forward Directions

Planned investigations:

1. Scaling of \( F_{AB}(d_{AB}) \)
2. Interaction range and saturation
3. Many-body competition
4. Identification of conserved currents (if any)
5. Screening and confinement effects

No claims beyond these are made at this stage.

---

**End of document.**