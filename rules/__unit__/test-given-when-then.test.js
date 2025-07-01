import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import rule from "../test-given-when-then.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

describe("Given the test-given-when-then rule", () => {
  describe("When the code follows the Given/When/Then structure", () => {
    it("Then it should pass for a correctly structured test", () => {
      // Arrange
      const validCode = `
        describe("Given a certain condition", () => {
          describe("When an action occurs", () => {
            it("Then it should have a specific outcome", () => {});
          });
        });
      `;

      // Assert
      ruleTester.run("test-given-when-then", rule, {
        valid: [validCode],
        invalid: [],
      });
    });
  });

  describe("When the code violates the Given/When/Then structure", () => {
    it("Then it should fail for a top-level describe not starting with 'Given'", () => {
      // Arrange
      const invalidCode = `describe("A test suite", () => {});`;

      // Assert
      ruleTester.run("test-given-when-then", rule, {
        valid: [],
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  'Top-level describe block title must start with "Given".',
              },
            ],
          },
        ],
      });
    });

    it("Then it should fail for a nested describe not starting with 'When'", () => {
      // Arrange
      const invalidCode = `
        describe("Given a condition", () => {
          describe("and another thing", () => {});
        });
      `;

      // Assert
      ruleTester.run("test-given-when-then", rule, {
        valid: [],
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  'A describe block nested under "Given" must start with "When".',
              },
            ],
          },
        ],
      });
    });

    it("Then it should fail for an 'it' block not starting with 'Then'", () => {
      // Arrange
      const invalidCode = `
        describe("Given a condition", () => {
          describe("When an action occurs", () => {
            it("should do something", () => {});
          });
        });
      `;

      // Assert
      ruleTester.run("test-given-when-then", rule, {
        valid: [],
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  'An "it" block nested under "When" must start with "Then".',
              },
            ],
          },
        ],
      });
    });

    it("Then it should fail for an 'it' block inside a 'Given' but not a 'When'", () => {
      // Arrange
      const invalidCode = `
        describe("Given a condition", () => {
          it("Then something happens", () => {});
        });
      `;

      // Assert
      ruleTester.run("test-given-when-then", rule, {
        valid: [],
        invalid: [
          {
            code: invalidCode,
            errors: [
              { message: '"it" block must be inside a "When" describe block.' },
            ],
          },
        ],
      });
    });

    it("Then it should fail for a describe block under 'Given' that is not 'When'", () => {
      // Arrange
      const invalidCode = `
        describe("Given a condition", () => {
          describe("And an invalid block", () => {
            describe("When an action occurs", () => {
              it("Then something happens", () => {});
            });
          });
        });
      `;

      // Assert
      ruleTester.run("test-given-when-then", rule, {
        valid: [],
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  'A describe block nested under "Given" must start with "When".',
              },
              {
                message:
                  'A "describe" block cannot be nested inside a block that is not a "Given" block.',
              },
            ],
          },
        ],
      });
    });

    it("Then it should fail for a describe block nested inside a 'When' block", () => {
      // Arrange
      const invalidCode = `
        describe("Given a condition", () => {
          describe("When an action occurs", () => {
            describe("And an invalid nested block", () => {
              it("Then something happens", () => {});
            });
          });
        });
      `;

      // Assert
      ruleTester.run("test-given-when-then", rule, {
        valid: [],
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message:
                  'A "describe" block cannot be nested inside a block that is not a "Given" block.',
              },
              { message: '"it" block must be inside a "When" describe block.' },
            ],
          },
        ],
      });
    });
  });
});
