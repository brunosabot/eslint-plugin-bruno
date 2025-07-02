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

        if (programNode.body.length > 1) {
          context.report({
            message:
              "Fixture files should only contain a single export default statement.",
            node: programNode.body[1],
          });
          return;
        }

        const statement = programNode.body[0];
        if (statement.type !== "ExportDefaultDeclaration") {
          context.report({
            message:
              "Fixture files should only contain a single export default statement.",
            node: statement,
          });
          return;
        }

        checkIsLiteral(statement.declaration);
      },
    };
  },
  meta: {
    docs: {
      category: "Best Practices",
      description: "Enforce that fixture files only contain literals.",
      recommended: true,
    },
    schema: [],
    type: "problem",
  },
};
