import baseNoBangCondition from "./base-no-bang-condition.js";
import nextPageHasLoading from "./next-page-has-loading.js";
import testArrangeActAssert from "./test-arrange-act-assert.js";
import testFixtureFile from "./test-fixture-file.js";
import testFixtureLiteral from "./test-fixture-literal.js";
import testFixtureVariableName from "./test-fixture-variable-name.js";
import testGivenWhenThen from "./test-given-when-then.js";

export default {
  configs: {
    next: {
      plugins: ["bruno"],
      rules: {
        "bruno/next-page-has-loading": "error",
      },
    },
    recommended: {
      plugins: ["bruno"],
      rules: {
        "bruno/base-no-bang-condition": "error",
        "bruno/test-arrange-act-assert": "error",
        "bruno/test-fixture-file": "error",
        "bruno/test-fixture-literal": "error",
        "bruno/test-fixture-variable-name": "error",
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
    "next-page-has-loading": nextPageHasLoading,
    "test-arrange-act-assert": testArrangeActAssert,
    "test-fixture-file": testFixtureFile,
    "test-fixture-literal": testFixtureLiteral,
    "test-fixture-variable-name": testFixtureVariableName,
    "test-given-when-then": testGivenWhenThen,
  },
};
