import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import plugin from "../index.js";

const ruleFiles = fs
  .readdirSync(path.resolve(__dirname, ".."))
  .filter((file) => file.endsWith(".js") && file !== "index.js");

describe("Given the plugin index", () => {
  describe("When consuming the plugin", () => {
    it("Then it should have a rule for each rule file", () => {
      // Arrange
      const ruleNames = ruleFiles.map((file) => path.basename(file, ".js"));

      // Assert
      ruleNames.forEach((ruleName) => {
        expect(plugin.rules[ruleName]).toBeDefined();
      });
    });

    it("Then it should have a config for each rule file", () => {
      // Arrange
      const ruleNames = ruleFiles.map((file) => path.basename(file, ".js"));
      const allConfigRules = Object.values(plugin.configs).reduce(
        (acc, config) => ({ ...acc, ...config.rules }),
        {}
      );

      // Assert
      ruleNames.forEach((ruleName) => {
        expect(allConfigRules[`bruno/${ruleName}`]).toBe("error");
      });
    });

    it("Then it should not have next-prefixed rules in the recommended config", () => {
      // Arrange
      const recommendedRules = Object.keys(plugin.configs.recommended.rules);
      const nextPrefixedRules = recommendedRules.filter((rule) =>
        rule.startsWith("bruno/next-")
      );

      // Assert
      expect(nextPrefixedRules).toEqual([]);
    });

    it("Then it should have a documentation for each rule file", () => {
      // Arrange
      const ruleNames = ruleFiles.map((file) => path.basename(file, ".js"));

      // Assert
      ruleNames.forEach((ruleName) => {
        const docPath = path.resolve(
          __dirname,
          `../../docs/rules/${ruleName}.md`
        );
        const docUrl = plugin.rules[ruleName].meta.docs.url;

        expect(docUrl).toBe(
          `https://github.com/brunosabot/eslint-plugin-bruno/blob/main/docs/rules/${ruleName}.md`
        );
        expect(fs.existsSync(docPath), `Doc file not found: ${docPath}`).toBe(
          true
        );
      });
    });
  });
});
