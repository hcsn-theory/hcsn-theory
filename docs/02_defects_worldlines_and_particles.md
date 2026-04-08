# Defects, Worldlines, and Particles in HCSN

**Status:** Empirically grounded  
**Scope:** Emergent objects and operational identity  
**Basis:** Simulation evidence from Steps 1–14 (simulation milestones documented separately)

---

## Terminology Hierarchy

Before proceeding, we establish operational definitions:

- **ξ-cluster:** Any connected region where ξ > 0
- **Proto-object:** A persistent ξ-cluster with operational identity (via continuity tracking)
- **Proto-particle:** A proto-object satisfying particle criteria (Section 4)

These terms are used consistently throughout this document.

---

## 1. Defects

### Definition — Defect Event

A **defect** occurs at rewrite step t if hierarchical closure Ω changes discontinuously:

$$|\Delta \Omega(t)| > \varepsilon$$

where ε is a detection threshold.

**Empirical basis:** All observed defects satisfy this criterion. No defect occurs without a corresponding ΔΩ signal.

---

### Defect Charge

Defect charge is defined operationally as:

$$Q_{\text{defect}} := \Delta \Omega$$

**Status:** Charge is **not conserved exactly** under current rewrite rules. Statistical drift is observed.

---

### Defect Regulation

**Observational law:** Defects occur preferentially during periods of structural instability (high Ω variance) and subsequently suppress further instability.

Defects are **regulated instabilities**, not random noise. They exhibit:

- Temporal clustering
- Correlation with Ω fluctuations
- Stabilizing feedback on local Ω

---

## 2. Persistence and Worldlines

### Definition — Persistent Defect

A defect is **persistent** if successive defect events:

- Occur within bounded temporal separation (Δt < τ_correlation, where τ_correlation is the typical rewrite autocorrelation time)
- Share correlated rewrite support (overlapping causal neighborhoods)
- Exhibit bounded charge variation (|ΔQ| remains finite)

**Measurement:** Persistence is detected via continuity tracking in rewrite logs.

---

### Definition — Worldline

A **worldline** is an equivalence class of persistent defect events satisfying temporal and structural continuity.

**Key properties:**
- Identity defined by overlap continuity, not vertex identity
- Constituent vertices may completely turn over
- Worldline can survive total replacement of supporting graph structure
- Existence depends on Ω-regime (subcritical vs supercritical)

Worldlines are:
- Not paths in space (no space is defined yet)
- Not embedded trajectories
- Purely relational and historical constructs

---

## 3. Proto-Objects

Persistent defect worldlines constitute **proto-objects**: structures with operational identity prior to large-scale reconstruction.

**Empirical criteria:**
- Lifetime ≫ local rewrite correlation time
- Bounded graph-theoretic support (measured in interaction-graph distance)
- Stability under perturbations

Proto-objects are **emergent processes**, not fundamental entities.

---

## 4. Particle Definition (Operational)

### Particle Criterion

A defect worldline constitutes a **particle** if all of the following hold:

1. **Persistence:** Lifetime τ ≫ τ_correlation
2. **Momentum Coherence:** Rewrite imbalance exhibits bounded variance
3. **Inertial Stability:** Lifetime scales inversely with momentum variance (mass-lifetime relation)
4. **Structural Coupling:** Stability correlates with hierarchical closure Ω

**Status:** These criteria are directly testable and have been validated in simulation.

---

### Identity Through Continuity

Particle identity is defined by **overlap continuity**:

Two clusters C(t) and C(t+1) are the same particle if:

$$\frac{|C(t) \cap C(t+1)|}{|C(t) \cup C(t+1)|} \ge \alpha$$

where α ∈ (0,1) is a continuity threshold (typically α ≈ 0.3–0.5).

Particles are *what the network remembers*, not what it contains.

---

## 5. Defect Lifetimes

**Measured distribution:** Defect lifetimes follow approximately exponential decay with phase-dependent timescales:

| Ω Regime | Mean Lifetime | Interpretation |
|----------|---------------|----------------|
| Subcritical (Ω < 1.0) | τ < 100 steps | Unstable, transient |
| Critical (Ω ≈ 1.1) | τ ∼ 10³–10⁴ steps | Power-law stability ($\alpha \approx 1.7 - 2.0$) |
| Supercritical (Ω > 1.2) | τ > 10⁵ steps | Persistent topological knots |

**Empirical result:** Long-lived worldlines correspond to particle-like behavior.

---

## 6. Interaction (Threshold-Gated)

Two proto-objects **interact** if they achieve structural overlap above a critical threshold.

**Observed interaction mechanisms:**

- **Threshold Law:** $\Delta p \neq 0$ iff structural overlap $\chi > 0.14$
- **Rewrite competition:** Primary driver of stability flux
- **Deflection:** Change in directional bias
- **Cluster merging/annihilation**

Interaction is:
- Asymmetric (no action-reaction symmetry)
- Environment-mediated (via Ω-modulated rewrite pool)
- Not dependent on any large-scale reconstruction
- Non-conservative (total ξ not preserved)

**Empirical basis:** Step 12 dual-injection experiments.

---

## 7. Rewrite Competition

Proto-particles compete for rewrite opportunities. Coexisting ξ-clusters suppress one another's rewrite participation.

**Observable:** Rewrite flux Φ_C(t) = number of rewrites touching cluster C up to time t.

Interaction strength scales with rewrite flux imbalance, not spatial proximity.

---

## 8. Mass (Emergent)

Mass is defined empirically as:

$$m \sim \frac{1}{\text{Var}(p)}$$

where p is momentum (defined as rewrite imbalance persistence).

**Interpretation:**
- Long-lived worldlines → low momentum variance → high mass
- Short-lived defects → high momentum variance → low mass

Mass corresponds to **defect inertia**: resistance to rewrite-induced change.

---

## 9. Consequences

The operational definitions above establish:

- Particles are emergent **processes**, not fundamental objects
- Identity is **continuity-based**, not substance-based
- No Hilbert-space state formalism is assumed
- Particle behavior arises from rewrite statistics alone

**Philosophical shift:** Particles are what the causal network *does*, not what it *contains*.

---

## 10. Current Status

All definitions and criteria in this document have been:
- Operationally defined
- Measured in simulation
- Validated across parameter variations (Steps 11–16)
- **Phase 12 Update:** Formalized the **Topological Force Law** and threshold-gated interaction.
- Found robust and reproducible

**Open questions:**
- Classification of stable defect species
- Mechanism for distinct statistics classes
- Emergent label sets
- Connection to known particle classifications (speculative, not claimed)

---

## 11. What This Document Does NOT Claim

- Particles are fundamental excitation modes → **NO** (no such axioms)
- Particles live in spacetime → **NO** (no space defined yet)
- Particles obey external invariance principles → **NOT ASSUMED** (scale-dependent)
- Conservation laws are exact → **NO** (statistical only)
- Any correspondence to known physics → **NOT ASSUMED**

All such claims require further derivation and validation.
