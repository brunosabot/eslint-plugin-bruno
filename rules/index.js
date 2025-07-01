"use strict";

import baseNoBangCondition from "./base-no-bang-condition.js";
import testGivenWhenThen from "./test-given-when-then.js";
import testArrangeActAssert from "./test-arrange-act-assert.js";

export default {
  meta: {
    name: "eslint-plugin-bruno",
    version: "1.0.0",
  },
  rules: {
    "base-no-bang-condition": baseNoBangCondition,
    "test-given-when-then": testGivenWhenThen,
    "test-arrange-act-assert": testArrangeActAssert,
  },
  configs: {
    recommended: {
      plugins: ["bruno"],
      rules: {
        "bruno/base-no-bang-condition": "error",
        "bruno/test-given-when-then": "error",
        "bruno/test-arrange-act-assert": "error",
      },
    },
  },
  processors: {},
};
