import { RuleTester } from "eslint";
import { describe, it } from "vitest";

import rule from "../test-fixture-literal.js";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

describe("Given a test-fixture-literal rule", () => {
  describe("When the file is a fixture and the content is valid", () => {
    it("Then it should pass for a valid object literal", () => {
      // Arrange
      const testCase = {
        code: `export default { a: 1, b: "hello", c: true, d: null, e: [1, "two"], f: { g: -1 } };`,
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [],
        valid: [testCase],
      });
    });

    it("Then it should pass for a valid array literal", () => {
      // Arrange
      const testCase = {
        code: `export default [1, "two", { a: 3 }];`,
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [],
        valid: [testCase],
      });
    });

    it("Then it should pass for a valid string literal", () => {
      // Arrange
      const testCase = {
        code: `export default "a string";`,
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [],
        valid: [testCase],
      });
    });

    it("Then it should pass for a valid template string", () => {
      // Arrange
      const testCase = {
        code: "export default `a template string`;",
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [],
        valid: [testCase],
      });
    });

    it("Then it should pass for an empty file", () => {
      // Arrange
      const testCase = {
        code: "",
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [],
        valid: [testCase],
      });
    });

    it("Then it should pass for valid unary expressions", () => {
      // Arrange
      const testCasePositive = {
        code: `export default +1;`,
        filename: "test.fixture.ts",
      };
      const testCaseNegative = {
        code: `export default -1;`,
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [],
        valid: [testCasePositive, testCaseNegative],
      });
    });
  });

  describe("When the file is a fixture and the content is invalid", () => {
    it("Then it should fail for a variable declaration", () => {
      // Arrange
      const testCase = {
        code: `const a = 1; export default a;`,
        errors: [
          {
            message:
              "Fixture files should only contain a single export default statement.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for a variable identifier", () => {
      // Arrange
      const testCase = {
        code: `export default myVar;`,
        errors: [
          {
            message:
              "Fixture files can only contain literals. No variables, functions, or other expressions are allowed.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for a function expression", () => {
      // Arrange
      const testCase = {
        code: `export default () => {};`,
        errors: [
          {
            message:
              "Fixture files can only contain literals. No variables, functions, or other expressions are allowed.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for an object with a variable", () => {
      // Arrange
      const testCase = {
        code: `export default { a: myVar };`,
        errors: [
          {
            message:
              "Fixture files can only contain literals. No variables, functions, or other expressions are allowed.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for an array with a variable", () => {
      // Arrange
      const testCase = {
        code: `export default [myVar];`,
        errors: [
          {
            message:
              "Fixture files can only contain literals. No variables, functions, or other expressions are allowed.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for a computed property", () => {
      // Arrange
      const testCase = {
        code: `export default { [myVar]: 1 };`,
        errors: [
          {
            message: "Computed properties are not allowed in fixture files.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for an object with spread syntax", () => {
      // Arrange
      const testCase = {
        code: `export default { ...obj };`,
        errors: [
          { message: "Spread syntax is not allowed in fixture files." },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for an array with spread syntax", () => {
      // Arrange
      const testCase = {
        code: `export default [...arr];`,
        errors: [
          { message: "Spread syntax is not allowed in fixture files." },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for a template string with an expression", () => {
      // Arrange
      const testCase = {
        code: "export default `hello ${world}`;",
        errors: [
          {
            message:
              "Fixture files can only contain literals. No variables, functions, or other expressions are allowed.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for a file with only a variable declaration", () => {
      // Arrange
      const testCase = {
        code: `const a = 1;`,
        errors: [
          {
            message:
              "Fixture files should only contain a single export default statement.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });

    it("Then it should fail for a file with only a function declaration", () => {
      // Arrange
      const testCase = {
        code: `function foo() {}`,
        errors: [
          {
            message:
              "Fixture files should only contain a single export default statement.",
          },
        ],
        filename: "test.fixture.ts",
      };

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [testCase],
        valid: [],
      });
    });
  });

  describe("When the file is not a fixture", () => {
    it("Then it should not report any errors", () => {
      // Arrange
      const validCode = `const a = 1; export default a;`;

      // Assert
      ruleTester.run("test-fixture-literal", rule, {
        invalid: [],
        valid: [{ code: validCode, filename: "test.ts" }],
      });
    });
  });
});
