import baseNoBangCondition from "./base-no-bang-condition.js";
import testArrangeActAssert from "./test-arrange-act-assert.js";
import testGivenWhenThen from "./test-given-when-then.js";

export default {
  configs: {
    recommended: {
      plugins: ["bruno"],
      rules: {
        "bruno/base-no-bang-condition": "error",
        "bruno/test-arrange-act-assert": "error",
        "bruno/test-given-when-then": "error",
      },
    },
  },
  meta: {
    name: "eslint-plugin-bruno",
    version: "1.0.0",
  },
  processors: {},
  rules: {
    "base-no-bang-condition": baseNoBangCondition,
    "test-arrange-act-assert": testArrangeActAssert,
    "test-given-when-then": testGivenWhenThen,
  },
};
