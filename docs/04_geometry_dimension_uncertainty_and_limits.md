# Geometry, Dimension, Uncertainty, and Limits in HCSN

**Status:** Empirically constrained with open problems  
**Scope:** Large-scale structure, phase transitions, and theory boundaries  
**Basis:** Steps 1–16 (simulation milestones documented separately) + corrections from Step 11

---

## 1. Geometry Is Emergent (Not Assumed)

HCSN assumes at the axiomatic level:
- No manifold
- No lattice
- No predefined dimension
- No metric tensor
- No coordinate system

Geometry must emerge from rewrite statistics, or the theory predicts no geometry at all.

**Current status:** Partial geometric structure is observed at large scales. Full reconstruction is incomplete.

---

## 2. Phase Structure of Hierarchical Closure Ω

The theory exhibits distinct **phase regimes** controlled by the hierarchical closure parameter Ω.

### 2.1 Phase Diagram (Empirical)

| Ω Regime | Defect Behavior | ξ Transport | Interpretation |
|----------|----------------|-------------|----------------|
| Subcritical (Ω < 1.0) | Transient, τ < 100 | No transport | Unstable phase |
| Critical (Ω ≈ 1.1) | Marginal, τ ∼ 10³ | Marginal transport | Phase transition |
| Supercritical (Ω > 1.2) | Persistent, τ > 10⁴ | Stable transport | Stable phase |

**Key result:** The transport field ξ propagates **only** in supercritical regimes. Ω itself does **not** propagate.

---

## 3. Corrections to Earlier Assumptions

### 3.1 Ω Is NOT a Carrier

**Falsified claim:** "Ω propagates like a wave or diffusion field."

**Correct statement:** Ω is an **order parameter**, not a dynamical carrier. It modulates transport capacity but does not itself transport information.

**Evidence:** Step 11 phase transition measurements show:
- No downstream rewrite influence from forced defects
- No Ω-gradient-driven propagation
- ξ is required for any transport

This corrects earlier interpretations in archived documents [`03_emergence.md`](archive/03_emergence.md) and [`07_effective_dynamics.md`](archive/07_effective_dynamics.md).

---

### 3.2 ξ Transport Without Geometry

**Discovery:** ξ exhibits **persistent causal transport without unbounded spreading**.

**Measured properties:**
- ξ lifetime shows no decay within simulation window (>10⁵ steps) above critical Ω
- ξ support remains bounded (does not grow indefinitely)
- ξ front speed finite and small
- No cone-like propagation observed

**Interpretation:** HCSN supports transport **before** geometry emerges, not because of geometry.

---

## 4. Dimension Is Not Coordination

Average vertex coordination $\langle k \rangle$ grows monotonically during evolution but does **not** define physical dimension.

**Reason:** Coordination counts local connections. Dimension measures global scaling behavior.

**Correct approach:** Dimension must be defined after coarse-graining using scaling relations like:

$$D_{\text{eff}}(r) := \frac{d \log N(r)}{d \log r}$$

where $N(r)$ is the number of vertices within causal distance $r$.

**Current status:** Dimensional measurements show stabilization at finite scales but are computationally expensive and incomplete.

---

## 5. Effective Dimension (Emergent)

Effective dimension depends on:
- Hierarchical closure Ω
- Redundancy density
- Coarse-graining scale

**Observations:**
- Subcritical Ω: dimension undefined (no stable structure)
- Critical Ω: dimension fluctuates
- Supercritical Ω: dimension shows signs of stabilization (preliminary measurements suggest finite effective dimension in approximate range 3–5, non-conclusive)

**Status:** Suggestive but not conclusive. Full dimensional characterization requires longer simulations and may be subject to finite-size effects.

---

## 6. Lifetime-Momentum Variance Relation

Observed empirical relation:

$$\text{Var}(p) \propto \tau^{-1}$$

**Interpretation:**
- Long-lived defects ($\tau$ large) → low momentum variance → stable momentum
- Short-lived defects ($\tau$ small) → high momentum variance → fluctuating momentum

This statistical trade-off arises from **finite rewrite statistics**: shorter observation windows yield higher variance in any directional measure.

**Status:** Robust across all measured worldlines. Mechanism understood.

---

## 7. Geometry Reconstruction Attempts

### 7.1 Causal Distance

Causal distance $d_C(u,v)$ is defined as the minimum causal chain length connecting events $u$ and $v$.

**Properties:**
- Discrete
- Directed
- Non-metric (triangle inequality may fail)

### 7.2 Interaction Graph Distance

Interaction graph distance measures overlap in rewrite support.

**Properties:**
- Symmetric
- Reflects rewrite accessibility
- Not equivalent to causal distance

### 7.3 Emergent Spatial Slices

Spatial hypersurfaces $\Sigma_t$ are defined as sets of events at approximately equal causal depth:

$$\Sigma_t := \{ v \mid T(v) \approx t \}$$

**Issues:**
- Slices fluctuate
- Dimension varies
- No unique foliation exists

**Status:** Spatial structure is partially present but not cleanly separable from temporal evolution.

---

## 8. Known Limits of Current Theory

### 8.1 No Analytic Dimensional Selection

The mechanism that selects effective dimension (if dimension stabilizes at all) is **not yet derived**. Dimensional emergence is observed empirically but not explained from axioms.

### 8.2 Interactions Are Statistical, Not Exact

Interaction laws are:
- Probabilistic
- Environment-dependent
- Non-conservative

No exact dynamical equations exist yet.

### 8.3 Long-Time Scaling Computationally Expensive

Simulations beyond $t \sim 10^5$ rewrites become prohibitively expensive. Large-scale asymptotic behavior is unknown.

### 8.4 No Connection to External Models

Current formulation provides **no** identification of:
- Distinct statistics classes
- External symmetry-group structures
- External coupling parameters
- Mass scales in external units

Any correspondence to external models is speculative.

---

## 9. Open Problems (Explicit)

1. **Dimensional selection mechanism:** Does dimension stabilize asymptotically? If so, what mechanism selects the effective dimension?
2. **Emergent symmetry structure:** Can rewrite redundancy classes yield nontrivial symmetry-group structure?
3. **Stability of defect species:** Are there discrete defect types? Do they form a classification?
4. **Distinct statistics classes:** Can exclusion-like principles emerge from worldline topology?
5. **Exact invariance at scale:** Do exact invariance principles emerge in the continuum limit?
6. **Connection to external large-scale frameworks:** Can Ω dynamics reproduce corresponding large-scale balance laws under coarse-graining?

---

## 10. What HCSN Does NOT Claim

At this stage, HCSN does **not** claim to:
- Reproduce any external model
- Derive external large-scale frameworks exactly
- Explain global initial condition specification
- Recover exact state-based probabilistic frameworks
- Predict specific particle masses or coupling constants

Any such claims in earlier drafts (e.g., archived [`04_physical_correspondence.md`](archive/04_physical_correspondence.md), [`05_theorems.md`](archive/05_theorems.md)) are **downgraded to conjectures** pending further evidence.

---

## 11. Falsifiability Criteria

The theory fails if:
- No universal signal speed emerges → **PASSED** (finite ξ front speed observed)
- Causal consistency breaks under evolution → **PASSED** (no loops observed)
- No persistent structures form → **PASSED** (worldlines stable above critical Ω)
- Universality is absent across rule variations → **UNDER TEST** (preliminary evidence positive)

---

## 12. Current Validated Results

✅ Hierarchical closure Ω is a valid order parameter  
✅ ξ transport exhibits phase transition at Ω ≈ 1.1  
✅ Defect worldlines persist and interact  
✅ Momentum and mass are operationally defined  
✅ Interaction is rewrite-competition-mediated  
✅ No exact conservation laws at microscopic level  

---

## 13. Speculative Extensions (NOT Current Theory)

The following are **future research directions**, not established results:

- Coupling multiple ξ modes → multi-species particles
- Emergent symmetry structure from rewrite equivalence classes
- Geometric interpretation of Ω gradients → emergent curvature measures
- Connection to external models via coarse-grained limits

These are intentionally deferred until current results are fully consolidated.

---

## 14. Summary

HCSN has established:
- A minimal axiomatic foundation
- Phase structure and transport properties
- Emergent objects (defects, worldlines, particles)
- Operational dynamics (momentum, mass, interaction)

HCSN has **not yet** established:
- Full geometric structure
- Dimensional selection
- External model correspondence
- Exact state-based framework recovery

The theory is **empirically grounded** and **falsifiable**, but **incomplete**.

---

## 15. Meta-Statement

> The absence of complete geometric reconstruction is not a failure.  
> It is an honest report of current results.  
>  
> HCSN is a theory **in formation**, not a finished model.

Further claims require further evidence.
