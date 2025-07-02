import { RuleTester } from "eslint";
import { describe, it } from "vitest";

import rule from "../test-fixture-variable-name.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2021, sourceType: "module" },
});

describe("Given the test-fixture-variable-name rule", () => {
  describe("When the file is a valid fixture", () => {
    it("Then it should pass for a simple fixture variable", () => {
      // Arrange
      const code = "export const userFixture = {};";
      const filename = "user.fixture.ts";

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [],
        valid: [{ code, filename }],
      });
    });

    it("Then it should pass for a prefixed fixture variable", () => {
      // Arrange
      const code = "export const defaultUserFixture = {};";
      const filename = "user.fixture.ts";

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [],
        valid: [{ code, filename }],
      });
    });

    it("Then it should pass for a fixture with a dash in the filename", () => {
      // Arrange
      const code = "export const userProfileFixture = {};";
      const filename = "user-profile.fixture.ts";

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [],
        valid: [{ code, filename }],
      });
    });

    it("Then it should pass for a prefixed fixture with a dash in the filename", () => {
      // Arrange
      const code = "export const defaultUserProfileFixture = {};";
      const filename = "user-profile.fixture.ts";

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [],
        valid: [{ code, filename }],
      });
    });
  });

  describe("When the file is not a fixture file", () => {
    it("Then it should not report any errors", () => {
      // Arrange
      const code = "export const myVar = {};";

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [],
        valid: [{ code, filename: "src/component.ts" }],
      });
    });
  });

  describe("When the file violates the fixture variable name rules", () => {
    it("Then it should fail for default exports", () => {
      // Arrange
      const code = "export default {};";

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [
          {
            code,
            errors: [{ message: "Fixtures must be named exports, not default exports." }],
            filename: "user.fixture.ts",
          },
        ],
        valid: [],
      });
    });

    it("Then it should fail when the variable does not end with Fixture", () => {
      // Arrange
      const code = "export const user = {};";
      const filename = "user.fixture.ts";
      const errors = [{ message: "Fixture variable 'user' must end with the 'Fixture' suffix." }];

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [{ code, errors, filename }],
        valid: [],
      });
    });

    it("Then it should fail when the variable is not in camelCase", () => {
      // Arrange
      const code = "export const user_Fixture = {};";
      const filename = "user.fixture.ts";
      const errors = [{ message: "Fixture variable 'user_Fixture' must be in camelCase." }];

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [{ code, errors, filename }],
        valid: [],
      });
    });

    it("Then it should fail when the variable does not contain the filename", () => {
      // Arrange
      const code = "export const myFixture = {};";
      const filename = "user.fixture.ts";
      const errors = [{ message: "Fixture variable 'myFixture' must contain the file's base name 'user'." }];

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [{ code, errors, filename }],
        valid: [],
      });
    });

    it("Then it should fail for a variable with a dash in the filename that does not end with Fixture", () => {
      // Arrange
      const code = "export const userProfile = {};";
      const filename = "user-profile.fixture.ts";
      const errors = [{ message: "Fixture variable 'userProfile' must end with the 'Fixture' suffix." }];

      // Assert
      ruleTester.run("test-fixture-variable-name", rule, {
        invalid: [{ code, errors, filename }],
        valid: [],
      });
    });
  });
});
