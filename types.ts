export interface OnActual {
  (actual: unknown): unknown;
}

export interface OnResult {
  (result: MatchResult): Partial<MatchResult>;
}

export interface Matcher {
  (
    this: MatchContext,
    ...args: readonly unknown[]
  ): MatchResult | Promise<MatchResult>;
}

export interface Matchers {
  readonly [k: string]: Matcher;
}

export interface MatchResult {
  readonly message: string;

  /** Whether the match result is pass or not. */
  readonly pass: boolean;
}

export interface Context {
  /** Actual value. */
  readonly actual: unknown;
}

export interface MatchContext extends Context {}

export interface Match {
  matcher: (this: Context, ...args: unknown[]) => MatchResult;
  args: Iterable<unknown>;
}

export interface Hook {
  name: string;

  await: boolean;

  onActual?: OnActual;

  onResult?: OnResult;
}
