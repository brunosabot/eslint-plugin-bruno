import path from "path";

function toCamelCase(str) {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

export default {
  create(context) {
    const filename = context.getFilename();
    if (filename.endsWith(".fixture.ts") === false) {
      return {};
    }

    const basename = path.basename(filename, ".fixture.ts");
    const camelCaseBasename = toCamelCase(basename);

    return {
      ExportDefaultDeclaration(node) {
        context.report({
          messageId: "noDefaultExport",
          node,
        });
      },
      ExportNamedDeclaration(node) {
        if (node.declaration === null || node.declaration.type !== "VariableDeclaration") {
          return;
        }

        node.declaration.declarations.forEach((declarator) => {
          const variableName = declarator.id.name;

          if (variableName.endsWith("Fixture") === false) {
            context.report({
              data: { variableName },
              messageId: "mustEndWithFixture",
              node: declarator.id,
            });
            return;
          }

          const nameWithoutSuffix = variableName.slice(0, -"Fixture".length);
          if (/^[a-z]+([A-Z][a-z\d]*)*$/.test(nameWithoutSuffix) === false) {
            context.report({
              data: { variableName },
              messageId: "mustBeCamelCase",
              node: declarator.id,
            });
          }

          if (nameWithoutSuffix.toLowerCase().includes(camelCaseBasename.toLowerCase()) === false) {
            context.report({
              data: { basename: camelCaseBasename, variableName },
              messageId: "mustContainFileName",
              node: declarator.id,
            });
          }
        });
      },
    };
  },
  meta: {
    docs: {
      category: "Best Practices",
      description: "Enforce naming conventions for fixture variables.",
      recommended: true,
    },
    messages: {
      mustBeCamelCase: "Fixture variable '{{variableName}}' must be in camelCase.",
      mustContainFileName: "Fixture variable '{{variableName}}' must contain the file's base name '{{basename}}'.",
      mustEndWithFixture: "Fixture variable '{{variableName}}' must end with the 'Fixture' suffix.",
      noDefaultExport: "Fixtures must be named exports, not default exports.",
    },
    schema: [],
    type: "problem",
  },
};
