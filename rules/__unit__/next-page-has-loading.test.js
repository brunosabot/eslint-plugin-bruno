import { RuleTester } from "eslint";
import fs from "fs";
import { afterEach, describe, it, vi } from "vitest";

import rule from "../next-page-has-loading.js";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

describe("Given a next-page-has-loading rule", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("When a page.tsx file is present", () => {
    it("Then it should fail if loading.tsx is missing", () => {
      // Arrange
      vi.spyOn(fs, "existsSync").mockReturnValue(false);
      const testCase = {
        code: `export default function Page() {}`,
        errors: [
          {
            message: "Missing loading.tsx for page in: app/some-route",
          },
        ],
        filename: "/some/path/app/some-route/page.tsx",
      };

      // Assert
      ruleTester.run("next-page-has-loading", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should pass if loading.tsx is present", () => {
      // Arrange
      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      const testCase = {
        code: `export default function Page() {}`,
        filename: "/some/path/app/another-route/page.tsx",
      };

      // Assert
      ruleTester.run("next-page-has-loading", rule, {
        invalid: [],
        valid: [testCase],
      });
    });
  });

  describe("When the file is not a page.tsx file", () => {
    it("Then it should not report any errors", () => {
      // Arrange
      const testCase = {
        code: `export default function Component() {}`,
        filename: "/some/path/app/components/component.tsx",
      };

      // Assert
      ruleTester.run("next-page-has-loading", rule, {
        invalid: [],
        valid: [testCase],
      });
    });
  });
});
