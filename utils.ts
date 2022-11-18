export type IsPromise<T> = T extends Promise<unknown> ? true : false;

/** Modify return type to void or Promise void. */
export type Voidify<T> = T extends (...args: infer Args) => infer R
  ? (...args: Args) => IsPromise<R> extends true ? Promise<void> : void
  : T;
