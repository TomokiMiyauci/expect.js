# expect

Proof of concept for a simple version of jest expect.

This is a proving ground for testing/expect, which will be added as a standard
module to Deno.

## Difference of jest expect

Matchers and modifiers in the jest context are a growing number of methods.

Objects of this nature are expensive and wasteful. Many users use only a subset
of its methods.

In addition, the editor's intellisense is lined with a list of unused methods,
which also degrades the DX.

This proof of concept validates a composable interface at the type level.
