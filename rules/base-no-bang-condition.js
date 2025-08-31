export default {
  create: function (context) {
    function checkForBang(node) {
      if (node.type === "UnaryExpression" && node.operator === "!") {
        context.report({
          message: "Using ! in if statements is not allowed.",
          node: node,
        });
      } else if (node.type === "LogicalExpression") {
        checkForBang(node.left);
        checkForBang(node.right);
      }
    }

    return {
      IfStatement(ifNode) {
        checkForBang(ifNode.test);
      },
    };
  },
  meta: {
    docs: {
      category: "Best Practices",
      description: "disallow the use of bang operators in conditions",
      recommended: true,
      url: "https://github.com/brunosabot/eslint-plugin-bruno/blob/main/docs/rules/base-no-bang-condition.md",
    },
    fixable: "code",
    schema: [], // no options
    type: "suggestion",
  },
};
