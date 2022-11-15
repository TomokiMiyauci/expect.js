export interface OnActual {
  (actual: unknown): unknown;
}

export interface OnResult {
  (result: MatchResult): Partial<MatchResult>;
}

export interface MatchResult {
  message: string;
  pass: boolean;
}

export interface Context {
  actual: unknown;
}

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
