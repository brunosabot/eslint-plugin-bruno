import { RuleTester } from "eslint";
import { describe, it } from "vitest";

import rule from "../test-fixture-file.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2021, sourceType: "module" },
});

describe("Given the test-fixture-file rule", () => {
  describe("When the file is a valid fixture", () => {
    it("Then it should pass", () => {
      // Arrange
      const validCode = `export default {};`;

      // Assert
      ruleTester.run("test-fixture-file", rule, {
        invalid: [],
        valid: [
          { code: validCode, filename: "/__fixtures__/my-test.fixture.ts" },
        ],
      });
    });
  });

  describe("When the file is not a fixture-related file", () => {
    it("Then it should pass", () => {
      // Arrange
      const validCode = `export default {};`;

      // Assert
      ruleTester.run("test-fixture-file", rule, {
        invalid: [],
        valid: [{ code: validCode, filename: "/src/component.ts" }],
      });
    });
  });

  describe("When the file violates the fixture file rules", () => {
    it("Then it should fail if a fixture file is not in a __fixtures__ directory", () => {
      // Arrange
      const invalidCode = `export default {};`;

      // Assert
      ruleTester.run("test-fixture-file", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  "Fixture files (.fixture.ts) must be located in a `__fixtures__` directory.",
              },
            ],
            filename: "/src/my-test.fixture.ts",
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail if a file in __fixtures__ does not have the .fixture.ts suffix", () => {
      // Arrange
      const invalidCode = `export default {};`;

      // Assert
      ruleTester.run("test-fixture-file", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  "Files in a `__fixtures__` directory must have the `.fixture.ts` suffix.",
              },
            ],
            filename: "/__fixtures__/my-test.ts",
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail if a file in __fixtures__ has an incorrect fixture suffix", () => {
      // Arrange
      const invalidCode = `export default {};`;

      // Assert
      ruleTester.run("test-fixture-file", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  "Files in a `__fixtures__` directory must have the exact `.fixture.ts` suffix, but found `.fixtures.ts`.",
              },
            ],
            filename: "/__fixtures__/my-test.fixtures.ts",
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail if a file outside __fixtures__ has an incorrect fixture suffix", () => {
      // Arrange
      const invalidCode = `export default {};`;

      // Assert
      ruleTester.run("test-fixture-file", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  "Invalid fixture-like file name. Fixture files must be in a '__fixtures__' directory and end with '.fixture.ts'.",
              },
            ],
            filename: "/src/my-test.fixtures.ts",
          },
        ],
        valid: [],
      });
    });
  });
});
