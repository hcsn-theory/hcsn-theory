# Ontology — What Exists

## Fundamental Entities

HCSN postulates only the following primitives:

### 1. Events
- Indivisible, discrete occurrences
- Possess no internal structure
- Carry no intrinsic labels

### 2. Relations
- Directed connections between events
- Encode causal precedence, not spatial adjacency

### 3. Hyperrelations
- Relations may involve more than two events
- Encode multi-event causal constraints

## Causal Structure

- Events form a **partial order**
- No closed causal loops exist
- No global simultaneity is defined

## Locality

- Each event participates in finitely many relations
- No event has infinite degree

## Ontological Exclusion Principle

The following **do not exist fundamentally**:
- Space
- Time
- Distance
- Momentum
- Energy
- Fields

These must emerge or the theory fails.


# Layer I — Ontology (Derived Objects)

This document defines the **derived entities** of the HCSN framework.
All objects introduced here are *not axioms* — they are constructions arising from the core axioms.

No geometric, metric, or continuum assumptions are made.

---

## 1. Events (Primitive)

Let \( E \) be the set of events as defined in the axioms.

An **event** is indivisible and has no internal structure.
All higher-level objects are collections or patterns of events.

---

## 2. Causal Graph

The **causal graph** is the directed acyclic graph:

\[
\mathcal{G} = (E, \prec)
\]

Edges represent immediate causal precedence.
Transitive relations are not explicitly stored but are implied.

---

## 3. Causal Chains

A **causal chain** is a finite totally ordered subset:

\[
\gamma = \{ e_1 \prec e_2 \prec \dots \prec e_n \}
\]

Causal chains represent uninterrupted sequences of influence.

---

## 4. Worldlines

A **worldline** is a maximal causal chain under inclusion.

Formally, a chain \( \gamma \) is a worldline if:

\[
\not\exists \gamma' \supset \gamma \quad \text{such that } \gamma' \text{ is also a causal chain}
\]

Worldlines are **purely combinatorial** objects.
They are *not* embedded in spacetime.

---

## 5. Interaction Events

An event \( e \in E \) is an **interaction event** if:

\[
|\mathrm{Past}(e)| > 1 \quad \text{or} \quad |\mathrm{Future}(e)| > 1
\]

Interactions represent branching or merging of causal influence.

---

## 6. Hypergraph Structure

Let \( \mathcal{H} \subset \mathcal{P}_{\mathrm{fin}}(E) \) be the set of hyperrelations.

Each hyperrelation \( h \in \mathcal{H} \) enforces a **non-binary causal constraint** among its events.

Hyperrelations encode:
- multi-event interactions
- conservation-like constraints
- higher-order structure

---

## 7. Defects (Topological Irregularities)

A **defect** is a localized deviation from statistical regularity in the causal-hypergraph structure.

Formally, a defect is a finite subgraph \( D \subset \mathcal{G} \) such that:

\[
\mathcal{I}(D) \neq \langle \mathcal{I} \rangle_{\text{background}}
\]

where \( \mathcal{I} \) is a chosen invariant (e.g., coordination number, closure density).

Defects are:
- localized
- persistent under multiple rewrites
- not fundamental entities

---

## 8. Particle Candidates

A **particle** is defined as a temporally persistent defect whose support overlaps across rewrite steps.

Formally, a sequence \( \{ D_t \} \) is a particle if:

\[
\mathrm{Supp}(D_t) \cap \mathrm{Supp}(D_{t+1}) \neq \varnothing
\quad \text{for many } t
\]

Particles are **processes**, not objects.

---

## 9. Particle Lifetime

The **lifetime** of a particle is the cardinality of rewrite steps over which its defect persists:

\[
\tau = |\{ t \mid D_t \text{ exists} \}|
\]

No proper time or clock is assumed.

---

## 10. Emergent Fields

Let \( \mathcal{O} : \mathcal{G} \rightarrow \mathbb{R} \) be any scalar observable defined on the causal graph.

An **emergent field** is the time-indexed sequence:

\[
\Omega(t) = \mathcal{O}(\mathcal{G}_t)
\]

Fields are **global observables**, not background entities.

---

## 11. Influence Propagation

Given two events \( e_1 \prec e_2 \), influence exists if there is a causal chain connecting them.

Propagation is defined **only** by causal connectivity, not distance.

---

## 12. What Is *Not* Assumed

At this stage, the theory does **not** assume:

- Space
- Time as a dimension
- Mass
- Energy
- Momentum
- Quantum states
- Wavefunctions

These may only appear as emergent descriptions later.

---

## Summary

| Concept | Ontological Status |
|------|-------------------|
Events | Primitive |
Causal relations | Primitive |
Worldlines | Derived |
Defects | Emergent |
Particles | Persistent processes |
Fields | Global observables |

---
