export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow use of bang in if statement",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [], // no options
  },
  create: function (context) {
    function checkForBang(node) {
      if (node.type === "UnaryExpression" && node.operator === "!") {
        context.report({
          node: node,
          message: "Using ! in if statements is not allowed.",
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
};
