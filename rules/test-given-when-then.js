export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce Given/When/Then structure in test files",
      category: "Best Practices",
      recommended: true,
    },
    schema: [],
  },
  create: function (context) {
    const describeStack = [];

    function getDescribeTitle(node) {
      if (node.arguments[0] && node.arguments[0].type === "Literal") {
        return node.arguments[0].value;
      }
      return "";
    }

    function getItTitle(node) {
      if (node.arguments[0] && node.arguments[0].type === "Literal") {
        return node.arguments[0].value;
      }
      return "";
    }

    return {
      CallExpression(node) {
        const isDescribe = node.callee.name === "describe";
        const isIt = node.callee.name === "it";

        if (isDescribe) {
          if (describeStack.length === 0) {
            if (getDescribeTitle(node).startsWith("Given") === false) {
              context.report({
                node,
                message:
                  'Top-level describe block title must start with "Given".',
              });
            }
          } else {
            const parentDescribe = describeStack[describeStack.length - 1];
            if (parentDescribe.title.startsWith("Given")) {
              if (getDescribeTitle(node).startsWith("When") === false) {
                context.report({
                  node,
                  message:
                    'A describe block nested under "Given" must start with "When".',
                });
              }
            } else {
              context.report({
                node,
                message:
                  'A "describe" block cannot be nested inside a block that is not a "Given" block.',
              });
            }
          }
          describeStack.push({ title: getDescribeTitle(node), node });
        }

        if (isIt) {
          if (describeStack.length === 0) {
            context.report({
              node,
              message: '"it" block must be inside a "When" describe block.',
            });
            return;
          }

          const parentDescribe = describeStack[describeStack.length - 1];
          if (parentDescribe.title.startsWith("When") === false) {
            context.report({
              node,
              message: '"it" block must be inside a "When" describe block.',
            });
            return;
          }

          if (getItTitle(node).startsWith("Then") === false) {
            context.report({
              node,
              message:
                'An "it" block nested under "When" must start with "Then".',
            });
          }
        }
      },
      "CallExpression:exit"(node) {
        if (node.callee.name === "describe") {
          describeStack.pop();
        }
      },
    };
  },
};
