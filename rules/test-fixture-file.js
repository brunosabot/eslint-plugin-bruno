import path from "path";

export default {
  create: function (context) {
    const filename = context.getFilename();
    const pathParts = filename.split(path.sep);

    const isInFixturesDir = pathParts.includes("__fixtures__");
    const hasCorrectSuffix = filename.endsWith(".fixture.ts");
    const hasFixtureInName = filename.includes(".fixture");

    return {
      Program(node) {
        if (hasCorrectSuffix === true) {
          if (isInFixturesDir === false) {
            context.report({
              messageId: "mustBeInFixturesDir",
              node,
            });
          }
        } else if (isInFixturesDir === true) {
          if (hasFixtureInName === true) {
            const actualSuffix = filename.substring(
              filename.indexOf(".fixture")
            );
            context.report({
              data: { actualSuffix },
              messageId: "invalidFixtureSuffix",
              node,
            });
          } else {
            context.report({
              messageId: "mustHaveFixtureSuffix",
              node,
            });
          }
        } else if (hasFixtureInName === true) {
          context.report({
            messageId: "noFixtureLikeSuffix",
            node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      category: "Best Practices",
      description: "Enforce fixture file location and naming conventions.",
      recommended: true,
    },
    messages: {
      invalidFixtureSuffix:
        "Files in a `__fixtures__` directory must have the exact `.fixture.ts` suffix, but found `{{actualSuffix}}`.",
      mustBeInFixturesDir:
        "Fixture files (.fixture.ts) must be located in a `__fixtures__` directory.",
      mustHaveFixtureSuffix:
        "Files in a `__fixtures__` directory must have the `.fixture.ts` suffix.",
      noFixtureLikeSuffix:
        "Invalid fixture-like file name. Fixture files must be in a '__fixtures__' directory and end with '.fixture.ts'.",
    },
    schema: [],
    type: "problem",
  },
};
