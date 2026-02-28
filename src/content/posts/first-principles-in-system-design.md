Most developers start with frameworks. They pick a tool, learn its patterns, and shape every problem to fit those patterns. It works — until it doesn't.

## The Problem with Pattern Matching

When you approach system design by pattern matching — "this looks like a microservices problem" or "we should use event sourcing here" — you're starting from the solution. You're working backwards from an answer to justify the question.

This is how you end up with over-engineered systems. A simple CRUD app wrapped in Kubernetes. A message queue between two services that could share a database. Complexity for the sake of familiarity, not necessity.

## Working from First Principles

First principles thinking means stripping away assumptions until you're left with fundamental truths. Then you build up from there.

For system design, this means asking:

- What problem are we actually solving?
- What are the real constraints — not assumed, but measured?
- What is the simplest system that satisfies those constraints?

This isn't about being anti-pattern or anti-framework. It's about making sure the patterns you choose are driven by the problem, not by habit.

## An Example

A team I worked with needed to sync data between two systems. The initial proposal was a full ETL pipeline with Kafka, a staging database, and a reconciliation service.

We stepped back and asked: how much data? How often? What's the failure tolerance?

The answers: a few hundred records, once a day, and retries were fine.

The solution: a scheduled job that called an API and wrote to a database. Thirty lines of code. It ran for two years without issues.

## The Takeaway

Complexity isn't a feature. Every layer you add is a layer you maintain, debug, and explain to the next person. Start simple. Add complexity only when the problem demands it — and make sure the problem is real, not imagined.

```
simplicity = understanding the problem
complexity = not understanding it well enough
```

Build from the ground up. Question assumptions, not conclusions.
