# Core Axioms of HCSN

Hierarchical Causal Structure Network

This document presents the **axiomatic foundation** of HCSN.
All physical structure, geometry, and dynamics must emerge from these axioms.
No continuum, metric, or background spacetime is assumed.

---

## Axiom 0 — Existence

There exists a nonempty set \( E \) whose elements are called **events**:

\[
E \neq \varnothing
\]

Events are the only primitive entities of the theory.

---

## Axiom I — Causal Precedence

There exists a binary relation

\[
\prec \;\subseteq\; E \times E
\]

called **causal precedence**, satisfying:

1. **Irreflexivity**
\[
\forall e \in E,\quad \neg(e \prec e)
\]

2. **Transitivity**
\[
(e_1 \prec e_2 \;\wedge\; e_2 \prec e_3) \;\Rightarrow\; e_1 \prec e_3
\]

The pair \( (E, \prec) \) is therefore a **partially ordered set**.

---

## Axiom II — Local Finiteness

For every event \( e \in E \), the sets

\[
\mathrm{Past}(e) = \{ x \in E \mid x \prec e \}
\]
\[
\mathrm{Future}(e) = \{ y \in E \mid e \prec y \}
\]

are finite.

This forbids infinite causal density and ensures finite information flow.

---

## Axiom III — Hyperrelations

There exists a collection

\[
\mathcal{H} \subseteq \mathcal{P}_{\mathrm{fin}}(E)
\]

whose elements are called **hyperrelations**.

Each \( h \in \mathcal{H} \) represents a finite, higher-order causal constraint among events.
Binary causal relations are a special case.

---

## Axiom IV — Rewrite Dynamics

There exists a set of **rewrite rules** \( \mathcal{R} \), where each rule:

- Acts on a finite substructure of \( (E, \prec, \mathcal{H}) \)
- Preserves acyclicity of \( \prec \)
- Produces another finite causal structure

Rewrites are **local**, **causality-preserving**, and **structure-altering**.

---

## Axiom V — Sequential Update (Primitive Time)

Rewrite rules are applied in a strict sequence:

\[
\mathcal{C}_0 \;\rightarrow\; \mathcal{C}_1 \;\rightarrow\; \mathcal{C}_2 \;\rightarrow\; \dots
\]

This sequence defines the **only primitive notion of time**.
No external or continuous time parameter exists.

---

## Axiom VI — Non-Determinism

At any configuration \( \mathcal{C}_n \), more than one rewrite rule may be admissible.

The theory does not specify a unique rewrite choice.

Determinism is therefore **emergent**, not fundamental.

---

## Axiom VII — Background Independence

No axiom may reference or assume:

- Spatial distance
- Coordinates
- Geometry
- Metric tensors
- Momentum or energy
- Fields on a manifold

Any such structures must arise as **emergent observables**.

---

## Immediate Consequences (Not Assumptions)

From the axioms alone:

- There is no notion of simultaneity
- There is no superluminal signaling
- There is no preferred reference frame
- There is no background spacetime

If these appear, they must be derived.

---

## Scope of the Axioms

These axioms define a **discrete, causal, computational substrate**.
They are compatible with:

- Causal set theory (generalized)
- Graph rewriting systems
- Spin-network–like structures

They are **not** assumed to reproduce known physics — that is a theorem-level question.

---

*End of axioms.*


# Layer V — Theorems

(Formal Consequences of the HCSN Axioms)

This document states the core theorems of the Hypergraph Causal Structure Network (HCSN).

Proofs are given as:

- formal arguments where possible
- proof sketches where full formalization would obscure structure

No theorem assumes spacetime, fields, or continuum mathematics.

---

## Theorem 1 — Causal Well-Foundedness

**Statement**

Every non-empty causal history in HCSN contains a minimal event.

**Formal Statement**

Let \( \mathcal{C} \) be the causal partial order induced by rewrites.  
Then \( (\mathcal{C}, \prec) \) is well-founded.

**Proof Sketch**

- Rewrites strictly increase causal depth
- No rewrite can target a future event
- Infinite descending chains are forbidden

Therefore, all causal histories terminate in a minimal event.

∎

---

## Theorem 2 — Emergence of a Universal Speed Limit

**Statement**

There exists a finite maximum rate of causal influence propagation.

**Formal Statement**

For any two causally related events \( a \prec b \):

\[
\frac{d_C(a,b)}{T(b)-T(a)} \le v_{\max}
\]

where:

- \( d_C \) is graph distance
- \( T \) is rewrite time

**Proof Sketch**

- Rewrites are local
- Each rewrite advances causal influence by a bounded amount
- Composition preserves bounds

Thus, influence cones exist.

∎

---

## Theorem 3 — Existence of Causal Cones

**Statement**

Influence from any event is confined to a causal cone.

**Consequence**

- No instantaneous signaling
- No acausal correlations
- Effective light-cone structure

**Remark**

This result does **not** assume spacetime or a metric.

∎

---

## Theorem 4 — Defect Stability Criterion

**Statement**

A defect persists if and only if it forms a locally closed causal structure.

**Formal Criterion**

A defect \( D \) is stable iff:

\[
\delta \Omega(D) > 0
\]

where \( \Omega \) is hierarchical closure.

**Interpretation**

Particles are **topological invariants**, not objects.

∎

---

## Theorem 5 — Mass–Lifetime Equivalence

**Statement**

Effective mass is inversely proportional to defect lifetime.

\[
m \propto \frac{1}{\tau}
\]

**Proof Sketch**

- High rewrite susceptibility → rapid annihilation
- Long-lived defects resist rewrites
- Resistance corresponds to inertial mass

∎

---

## Theorem 6 — Relativistic Dispersion Relation (Effective)

**Statement**

Defects satisfy an approximate relativistic energy–momentum relation.

\[
E^2 \approx (p v_{\max})^2 + (m v_{\max}^2)^2
\]

**Notes**

- Emergent, not exact
- Holds statistically at large scales
- Breaks near causal granularity

∎

---

## Theorem 7 — Lorentz Invariance as a Fixed Point

**Statement**

Lorentz symmetry arises as a stable coarse-grained attractor.

**Proof Sketch**

- Anisotropies average out under renormalization
- Rewrite rules are direction-agnostic
- Only causal order remains invariant

Therefore Lorentz symmetry is not fundamental, but robust.

∎

---

## Theorem 8 — Entanglement Without Nonlocality

**Statement**

Bell-type correlations arise from overlapping causal supports.

**Formal Statement**

Let two defects \( D_1, D_2 \) share causal ancestry:

\[
\text{Corr}(D_1, D_2) \neq 0 \quad \text{even if } d_{\text{emergent}} \gg 1
\]

**Key Insight**

Graph distance, not spatial distance, governs correlation.

∎

---

## Theorem 9 — Measurement as Topological Projection

**Statement**

Measurement corresponds to irreversible loss of causal overlap.

**Consequences**

- No wavefunction collapse
- No observer dependence
- Classical outcomes emerge from topology

∎

---

## Theorem 10 — Arrow of Time

**Statement**

Time asymmetry arises from monotonic growth of causal depth.

\[
\Delta T > 0 \iff \Delta |\mathcal{C}| > 0
\]

Entropy increase corresponds to rewrite multiplicity growth.

∎

---

## Theorem 11 — Emergent Geometry

**Statement**

Spacetime geometry is a coarse-grained description of causal density.

**Interpretation**

- Curvature ↔ causal compression
- Flat space ↔ uniform rewrite flow

General relativity emerges statistically.

∎

---

## Theorem 12 — Universality

**Statement**

Macroscopic observables are invariant under large classes of micro-dynamics.

**Formally**

For rewrite parameter sets \( \Theta_1, \Theta_2 \):

\[
\mathcal{O}_{\text{macro}}(\Theta_1) \approx \mathcal{O}_{\text{macro}}(\Theta_2)
\]

This explains robustness of physical law.

∎

---

## Theorem 13 — Continuum Breakdown Scale

**Statement**

Continuum physics fails below a finite causal scale.

**Prediction**

- Lorentz violations
- Discrete dispersion
- Topology-dependent effects

∎

---

## Meta-Theorem — Why Physics Is Possible

**Statement**

Predictive physical law exists because causal rewrite systems converge.

**Interpretation**

The universe is computable *because it must be*.

∎

---

## Summary Table

| Theorem | Domain |
|------|------|

Causality | Fundamental |
Speed limit | Emergent |
Particles | Topological |
Mass | Dynamical |
Spacetime | Statistical |
Quantum behavior | Topological |
Classical behavior | Averaged |
Time | Directional |

---

