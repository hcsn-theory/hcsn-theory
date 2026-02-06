# Dynamics — How It Evolves

## Rewrite Principle

The universe evolves via **local rewrites** of the causal network.

A rewrite:
- Acts on a finite subgraph
- Preserves causal order
- Introduces no global coordination

## Key Properties

### Locality
Rewrites depend only on local structure.

### Causal Preservation
No rewrite may introduce a causal loop.

### Non-Determinism
Multiple rewrites may be allowed.
Selection is probabilistic.

### Sequentiality
Rewrites occur one at a time.
This ordering defines emergent time.

## Emergent Time

Time is not fundamental.
It is identified with the **depth of causal rewriting**.

There is no background clock.

# Layer II — Dynamics (How the Network Evolves)

This document defines the **dynamical law** of the Hypergraph Computational Spin Network (HCSN).

Dynamics specify *how the ontology evolves* without assuming space, time, energy, or fields.
Only causal structure and local rewrite rules are permitted.

---

## 1. Rewrite Evolution Principle

The fundamental dynamical operation is a **local rewrite** of the causal-hypergraph.

A rewrite is a map:

\[
R : (\mathcal{G}, \mathcal{H}) \;\longrightarrow\; (\mathcal{G}', \mathcal{H}')
\]

subject to locality and causality constraints.

No global updates are allowed.

---

## 2. Locality Axiom (Dynamical)

A rewrite \( R \) is **local** if it modifies only a finite subgraph:

\[
\exists\, S \subset E \text{ finite such that }
R(e) = e \;\forall e \notin S
\]

All changes occur within bounded causal neighborhoods.

---

## 3. Causal Consistency

Rewrite rules must preserve acyclicity:

\[
\text{If } e_i \prec e_j \text{ before } R,
\text{ then } \neg(e_j \prec e_i) \text{ after } R
\]

No rewrite may introduce causal loops.

---

## 4. Rewrite Time

Rewrite steps induce an **ordering of configurations**:

\[
\mathcal{G}_0 \;\to\; \mathcal{G}_1 \;\to\; \mathcal{G}_2 \;\to\; \dots
\]

This ordering defines **dynamical time**, which is:
- discrete
- external to the causal graph
- not directly observable

Physical time will emerge later.

---

## 5. Stochastic Selection

At each rewrite step, multiple valid local rewrites may exist.

The system selects among them via a probability measure:

\[
P(R \mid \mathcal{G}) > 0
\quad \text{iff } R \text{ is locally valid}
\]

Determinism is not required at the fundamental level.

---

## 6. Soft Conservation Laws

While exact conservation is not imposed, **statistical regularity** is favored.

Let \( Q(\mathcal{G}) \) be a topological quantity.
Large deviations satisfy:

\[
P(R) \propto \exp(-\lambda\,|\Delta Q|)
\]

where \( \lambda > 0 \) is finite.

This allows:
- fluctuations
- defect formation
- long-lived excitations

---

## 7. Defect Inertia

Once a defect forms, its removal probability decreases with persistence.

If a defect has existed for \( \tau \) rewrite steps, then:

\[
P(\text{erase}) \sim e^{-c/(\tau+1)}
\]

This produces **temporal stability without identity postulates**.

---

## 8. Interaction Bias

Rewrite probabilities may weakly depend on nearby persistent structures:

\[
P(R) \rightarrow P(R)\,(1 + \epsilon\,n_{\text{active}})
\]

where \( n_{\text{active}} \) counts nearby persistent defects.

This introduces emergent interaction without forces.

---

## 9. Causal Propagation Bound

Because rewrites are local and causal, influence can propagate at most one local neighborhood per rewrite step.

Thus, there exists a finite constant \( v_{\max} \) such that:

\[
\frac{\Delta \ell}{\Delta t} \le v_{\max}
\]

where \( \ell \) is causal graph distance.

This bound is **not imposed** — it is a logical consequence.

---

## 10. Arrow of Time

Rewrite dynamics define a **preferred direction**:

\[
\mathcal{G}_t \not\cong \mathcal{G}_{t-1}
\]

Information is created, rearranged, and lost asymmetrically.

Time-reversal invariance is *not fundamental*.

---

## 11. Ergodicity (Weak)

Over long evolution, the system explores a large class of configurations consistent with constraints.

No assumption of equilibrium is made.

---

## 12. What Is *Not* Defined Here

This layer does **not** define:

- Mass
- Energy
- Momentum
- Geometry
- Fields
- Quantum states

Those arise from collective behavior only.

---

## Summary

| Feature | Status |
|------|------|
Rewrite rules | Fundamental |
Locality | Enforced |
Causality | Preserved |
Time | External ordering |
Conservation | Statistical |
Stability | Emergent |
Max speed | Implied |

---

