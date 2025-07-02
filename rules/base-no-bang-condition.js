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
      description: "disallow use of bang in if statement",
      recommended: true,
    },
    fixable: "code",
    schema: [], // no options
    type: "suggestion",
  },
};
