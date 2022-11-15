import type {
  Context,
  Hook,
  MatchResult,
  OnActual,
  OnResult,
} from "./types.ts";
import { toBe, toBeNull, toBeUndefined } from "./matchers.ts";
import { not, rejects, resolves } from "./hooks.ts";

interface Matcher {
  (this: Expect, ...args: any[]): unknown;
}

interface ExpectConstructor {
  (actual: unknown): {
    toBe: Matcher;
  };
}

interface Matchers {
  toBe: (expected: unknown) => MatchResult;
  toBeUndefined: () => MatchResult;
  toBeNull: () => MatchResult;
}

interface Hooks {
  not: Matchers;

  resolves: Matchers;

  rejects: Matchers;
}

interface Expect {
  (actual: unknown): Matchers & Hooks;
}

const matchers: Matchers = { toBe, toBeUndefined, toBeNull };
const hooks = { not, resolves, rejects };

export const expect: Expect = function (actual) {
  const applyHooks: Hook[] = [];

  function apply(
    fn: (this: Context, ...args: unknown[]) => MatchResult,
    _: unknown,
    args: unknown[],
  ) {
    const matcher = { fn, args };

    return run(actual, { hooks: applyHooks, matcher });
  }

  for (const property in matchers) {
    type Prop = keyof Matchers;
    const proxy = new Proxy(matchers[property as Prop], { apply });

    matchers[property as Prop] = proxy;
  }

  for (const property in hooks) {
    type Prop = keyof typeof hooks;

    const proxy = new Proxy(hooks[property as Prop], {
      get: (hook, prop) => {
        applyHooks.push(hook);

        return matchers[prop];
      },
    });

    hooks[property as Prop] = proxy;
  }

  return { ...matchers, ...hooks };
};

function run(
  actual: unknown,
  context: {
    hooks: Hook[];
    matcher: {
      fn: (this: Context, ...args: unknown[]) => MatchResult;
      args: Iterable<unknown>;
    };
  },
) {
  const onActualHooks = context.hooks.map(({ onActual }) => onActual).filter(
    Boolean,
  ) as OnActual[];

  const onResults = context.hooks.map(({ onResult }) => onResult).filter(
    Boolean,
  ) as OnResult[];

  const awaitable = context.hooks.some((hook) => hook.await);

  function applyResultHook(result: MatchResult) {
    const matchResult = onResults.reduce<MatchResult>((acc, cur) => {
      const result = cur(acc);

      return { ...acc, ...result };
    }, result);

    return matchResult;
  }

  function match(actual: unknown) {
    return context.matcher.fn.bind({ actual })(
      ...context.matcher.args,
    );
  }

  function throwOrThrough(result: MatchResult): void | never {
    if (!result.pass) {
      throw Error(result.message);
    }
  }

  if (awaitable) {
    return new Promise<unknown>((resolve) => {
      const act = onActualHooks.reduce(
        (acc, cur) => cur(acc),
        actual,
      );

      return resolve(act);
    }).then(match).then(applyResultHook).then(throwOrThrough);
  }

  const matchResult = match(actual);
  const result = applyResultHook(matchResult);

  throwOrThrough(result);
}
