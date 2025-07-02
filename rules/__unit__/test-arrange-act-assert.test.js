import { RuleTester } from "eslint";
import { describe, it } from "vitest";

import rule from "../test-arrange-act-assert.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

describe("Given the test-arrange-act-assert rule", () => {
  describe("When the code uses 'it' and follows the Arrange/Act/Assert structure", () => {
    it("Then it should pass for a test with Arrange and Assert", () => {
      // Arrange
      const validCode = `
        it(\"Then it should do something\", () => {
          // Arrange
          // Assert
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [],
        valid: [validCode],
      });
    });

    it("Then it should pass for a test with Arrange, Act, and Assert", () => {
      // Arrange
      const validCode = `
        it(\"Then it should do something\", () => {
          // Arrange
          // Act
          // Assert
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [],
        valid: [validCode],
      });
    });
  });

  describe("When the code uses 'test' and follows the Arrange/Act/Assert structure", () => {
    it("Then it should pass for a test with Arrange and Assert", () => {
      // Arrange
      const validCode = `
        test(\"Then it should do something\", () => {
          // Arrange
          // Assert
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [],
        valid: [validCode],
      });
    });

    it("Then it should pass for a test with Arrange, Act, and Assert", () => {
      // Arrange
      const validCode = `
        test(\"Then it should do something\", () => {
          // Arrange
          // Act
          // Assert
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [],
        valid: [validCode],
      });
    });
  });

  describe("When the code violates the Arrange/Act/Assert structure", () => {
    it("Then it should fail for a test with 'it' missing Arrange", () => {
      // Arrange
      const invalidCode = `
        it(\"Then it should do something\", () => {
          // Assert
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message: 'The "it" block must contain an "// Arrange" comment.',
              },
            ],
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail for a test with 'it' missing Assert", () => {
      // Arrange
      const invalidCode = `
        it(\"Then it should do something\", () => {
          // Arrange
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message: 'The "it" block must contain an "// Assert" comment.',
              },
            ],
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail for a test with 'it' missing both Arrange and Assert", () => {
      // Arrange
      const invalidCode = `
        it(\"Then it should do something\", () => {
          // Act
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message: 'The "it" block must contain an "// Arrange" comment.',
              },
              {
                message: 'The "it" block must contain an "// Assert" comment.',
              },
            ],
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail for an empty 'it' test", () => {
      // Arrange
      const invalidCode = `
        it(\"Then it should do something\", () => {});
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message: 'The "it" block must contain an "// Arrange" comment.',
              },
              {
                message: 'The "it" block must contain an "// Assert" comment.',
              },
            ],
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail for a test with 'test' missing Arrange", () => {
      // Arrange
      const invalidCode = `
        test(\"Then it should do something\", () => {
          // Assert
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message: 'The "test" block must contain an "// Arrange" comment.',
              },
            ],
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail for a test with 'test' missing Assert", () => {
      // Arrange
      const invalidCode = `
        test(\"Then it should do something\", () => {
          // Arrange
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message: 'The "test" block must contain an "// Assert" comment.',
              },
            ],
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail for a test with 'test' missing both Arrange and Assert", () => {
      // Arrange
      const invalidCode = `
        test(\"Then it should do something\", () => {
          // Act
        });
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message: 'The "test" block must contain an "// Arrange" comment.',
              },
              {
                message: 'The "test" block must contain an "// Assert" comment.',
              },
            ],
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail for an empty 'test' test", () => {
      // Arrange
      const invalidCode = `
        test(\"Then it should do something\", () => {});
      `;

      // Assert
      ruleTester.run("test-arrange-act-assert", rule, {
        invalid: [
          {
            code: invalidCode,
            errors: [
              {
                message: 'The "test" block must contain an "// Arrange" comment.',
              },
              {
                message: 'The "test" block must contain an "// Assert" comment.',
              },
            ],
          },
        ],
        valid: [],
      });
    });
  });
});
