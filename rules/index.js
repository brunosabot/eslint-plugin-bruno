"use strict";

import baseNoBangCondition from "./base-no-bang-condition.js";

export default {
  meta: {
    name: "eslint-plugin-bruno",
    version: "1.0.0",
  },
  rules: {
    "base-no-bang-condition": baseNoBangCondition,
  },
  configs: {
    recommended: {
      plugins: ["bruno"],
      rules: {
        "bruno/base-no-bang-condition": "error",
      },
    },
  },
  processors: {},
};
