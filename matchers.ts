import type { Context, MatchResult } from "./types.ts";

export function toBeUndefined(this: Context): MatchResult {
  return {
    pass: this.actual === undefined,
    message: `expected undefined, actual ${Deno.inspect(this.actual)}`,
  };
}

export function toBe(this: Context, expected: unknown): MatchResult {
  const pass = Object.is(expected, this.actual);

  return {
    pass,
    message: `expected ${Deno.inspect(expected)}, actual ${this.actual}`,
  };
}

export function toBeNull(this: Context): MatchResult {
  const actual = this.actual;
  const pass = actual === null;

  return {
    pass,
    message: `expected null, actual ${Deno.inspect(actual)}`,
  };
}
