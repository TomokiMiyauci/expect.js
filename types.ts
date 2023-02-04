export interface OnActual {
  (actual: unknown): unknown;
}

export interface OnExpected {
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
  /** Expect message. */
  readonly message: string;

  /** Whether the match result is pass or not. */
  readonly pass: boolean;
}

/** Expect runtime context. */
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
  /** The hook name. */
  name: string;

  /** Whether the hook should be await or not. */
  await: boolean;

  /** Call on before matcher matching. */
  onActual?: OnActual;

  /** Call on after matcher matching. */
  onExpected?: OnExpected;
}

/** Expect API. */
export interface Expect<T> {
  (actual: unknown): T;
}
