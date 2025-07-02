import { RuleTester } from "eslint";
import { describe, it } from "vitest";

import rule from "../base-no-bang-condition.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

describe("Given the base-no-bang-condition rule", () => {
  describe("When the code contains valid if statements", () => {
    it("Then it should pass for a simple truthy check", () => {
      // Arrange
      const validCode = "if (something) {}";

      // Assert
      ruleTester.run("base-no-bang-condition", rule, {
        invalid: [],
        valid: [validCode],
      });
    });

    it("Then it should pass for a strict equality check", () => {
      // Arrange
      const validCode = "if (something === true) {}";

      // Assert
      ruleTester.run("base-no-bang-condition", rule, {
        invalid: [],
        valid: [validCode],
      });
    });

    it("Then it should pass for a strict inequality check", () => {
      // Arrange
      const validCode = "if (something !== undefined) {}";

      // Assert
      ruleTester.run("base-no-bang-condition", rule, {
        invalid: [],
        valid: [validCode],
      });
    });

    it("Then it should pass when bang is in an assignment", () => {
      // Arrange
      const validCode = "const x = !something; if(x) {}";

      // Assert
      ruleTester.run("base-no-bang-condition", rule, {
        invalid: [],
        valid: [validCode],
      });
    });
  });

  describe("When the code contains invalid if statements", () => {
    it("Then it should fail for a simple bang condition", () => {
      // Arrange
      const invalidCode = "if (!something) {}";
      const expectedErrors = [
        { message: "Using ! in if statements is not allowed." },
      ];

      // Assert
      ruleTester.run("base-no-bang-condition", rule, {
        invalid: [{ code: invalidCode, errors: expectedErrors }],
        valid: [],
      });
    });

    it("Then it should fail for a bang on the left side of a logical expression", () => {
      // Arrange
      const invalidCode = "if (!something && other) {}";
      const expectedErrors = [
        { message: "Using ! in if statements is not allowed." },
      ];

      // Assert
      ruleTester.run("base-no-bang-condition", rule, {
        invalid: [{ code: invalidCode, errors: expectedErrors }],
        valid: [],
      });
    });

    it("Then it should fail for a bang on the right side of a logical expression", () => {
      // Arrange
      const invalidCode = "if (other && !something) {}";
      const expectedErrors = [
        { message: "Using ! in if statements is not allowed." },
      ];

      // Assert
      ruleTester.run("base-no-bang-condition", rule, {
        invalid: [{ code: invalidCode, errors: expectedErrors }],
        valid: [],
      });
    });

    it("Then it should fail for a bang on a method call", () => {
      // Arrange
      const invalidCode = "if (!this.isReady()) {}";
      const expectedErrors = [
        { message: "Using ! in if statements is not allowed." },
      ];

      // Assert
      ruleTester.run("base-no-bang-condition", rule, {
        invalid: [{ code: invalidCode, errors: expectedErrors }],
        valid: [],
      });
    });
  });
});
