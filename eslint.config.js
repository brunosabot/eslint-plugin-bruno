"use strict";

import brunoRules from "./rules/index.js";

export default [
  {
    files: ["rules/**/*"],
    plugins: {
      bruno: brunoRules,
    },
    rules: brunoRules.configs.recommended.rules,
  },
];
