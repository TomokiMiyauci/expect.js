import type { Context, MatchResult } from "./types.ts";
import { inspect } from "./utils.ts";

export function toBeUndefined(this: Context): MatchResult {
  return {
    pass: this.actual === undefined,
    message: `expected undefined, actual ${inspect(this.actual)}`,
  };
}

export function toBe(this: Context, expected: unknown): MatchResult {
  const pass = Object.is(expected, this.actual);

  return {
    pass,
    message: `expected ${inspect(expected)}, actual ${inspect(this.actual)}`,
  };
}

export function toBeNull(this: Context): MatchResult {
  const actual = this.actual;
  const pass = actual === null;

  return {
    pass,
    message: `expected null, actual ${inspect(actual)}`,
  };
}
