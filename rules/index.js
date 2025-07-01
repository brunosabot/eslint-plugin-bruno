"use strict";

import baseNoBangCondition from "./base-no-bang-condition.js";
import testGivenWhenThen from "./test-given-when-then.js";

export default {
  meta: {
    name: "eslint-plugin-bruno",
    version: "1.0.0",
  },
  rules: {
    "base-no-bang-condition": baseNoBangCondition,
    "test-given-when-then": testGivenWhenThen,
  },
  configs: {
    recommended: {
      plugins: ["bruno"],
      rules: {
        "bruno/base-no-bang-condition": "error",
        "bruno/test-given-when-then": "error",
      },
    },
  },
  processors: {},
};
