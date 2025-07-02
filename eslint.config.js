import perfectionist from "eslint-plugin-perfectionist";

import brunoRules from "./rules/index.js";

export default [
  perfectionist.configs["recommended-natural"],
  {
    files: ["rules/**/*"],
    plugins: {
      bruno: brunoRules,
    },
    rules: brunoRules.configs.recommended.rules,
  },
];
