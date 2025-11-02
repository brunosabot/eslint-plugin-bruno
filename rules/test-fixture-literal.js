export default {
  create(context) {
    const filename = context.getFilename();
    if (filename.endsWith(".fixture.ts") === false) {
      return {};
    }

    function checkIsLiteral(node) {
      if (node.type === "Literal") {
        return;
      }

      if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
        return;
      }

      if (
        node.type === "UnaryExpression" &&
        (node.operator === "-" || node.operator === "+") &&
        node.argument.type === "Literal"
      ) {
        return;
      }

      if (node.type === "MemberExpression") {
        return;
      }

      if (
        node.type === "NewExpression" &&
        (node.callee.name === "Date" ||
          node.callee.name === "Map" ||
          node.callee.name === "Set")
      ) {
        return;
      }

      if (node.type === "ObjectExpression") {
        for (const prop of node.properties) {
          if (prop.type === "SpreadElement") {
            context.report({
              message: "Spread syntax is not allowed in fixture files.",
              node: prop,
            });
            continue;
          }
          if (prop.computed) {
            context.report({
              message: "Computed properties are not allowed in fixture files.",
              node: prop.key,
            });
          }
          checkIsLiteral(prop.value);
        }
        return;
      }

      if (node.type === "ArrayExpression") {
        for (const element of node.elements) {
          if (element) {
            if (element.type === "SpreadElement") {
              context.report({
                message: "Spread syntax is not allowed in fixture files.",
                node: element,
              });
              continue;
            }
            checkIsLiteral(element);
          }
        }
        return;
      }

      context.report({
        message:
          "Fixture files can only contain literals. No variables, functions, or other expressions are allowed.",
        node,
      });
    }

    return {
      Program(programNode) {
        if (programNode.body.length === 0) {
          return;
        }

        for (const statement of programNode.body) {
          if (statement.type === "ExportDefaultDeclaration") {
            context.report({
              message: "Fixture files should not contain any default export.",
              node: statement,
            });
          } else if (statement.type === "ExportNamedDeclaration") {
            if (statement.declaration?.type === "VariableDeclaration") {
              for (const declaration of statement.declaration.declarations) {
                if (declaration.init) {
                  checkIsLiteral(declaration.init);
                }
              }
            }
          } else if (statement.type !== "ImportDeclaration") {
            context.report({
              message: "Fixture files should only contain named exports and imports.",
              node: statement,
            });
          }
        }
      },
    };
  },
  meta: {
    docs: {
      category: "Best Practices",
      description: "Enforce that fixture files only contain literals.",
      recommended: true,
      url: "https://github.com/brunosabot/eslint-plugin-bruno/blob/main/docs/rules/test-fixture-literal.md",
    },
    schema: [],
    type: "problem",
  },
};
