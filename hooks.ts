import type { Hook } from "./types.ts";

export const not: Hook = {
  name: "not",

  await: false,

  onResult: (result) => {
    return {
      pass: !result.pass,
    };
  },
};

export const resolves: Hook = {
  name: "resolves",

  await: true,

  onActual: async (actual) => {
    return await actual;
  },
};

export const rejects: Hook = {
  name: "rejects",

  await: true,

  onActual: async (actual) => {
    try {
      const result = await actual;

      throw Error(
        `Promise did not reject. resolved to ${Deno.inspect(result)}`,
      );
    } catch (e) {
      return e;
    }
  },
};
