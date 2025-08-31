export default {
  create: function (context) {
    const describeStack = [];

    function getDescribeTitle(node) {
      if (
        node.arguments[0] &&
        node.arguments[0].type === "Literal" &&
        typeof node.arguments[0].value === "string"
      ) {
        return node.arguments[0].value;
      }
      return "";
    }

    function getItTitle(node) {
      if (
        node.arguments[0] &&
        node.arguments[0].type === "Literal" &&
        typeof node.arguments[0].value === "string"
      ) {
        return node.arguments[0].value;
      }
      return "";
    }

    return {
      CallExpression(node) {
        const calleeName = node.callee.name;
        const isDescribe = calleeName === "describe";
        const isTest = calleeName === "it" || calleeName === "test";

        if (isDescribe) {
          if (describeStack.length === 0) {
            if (getDescribeTitle(node).startsWith("Given") === false) {
              context.report({
                message:
                  'Top-level describe block title must start with "Given".',
                node,
              });
            }
          } else {
            const parentDescribe = describeStack[describeStack.length - 1];
            if (parentDescribe.title.startsWith("Given")) {
              if (getDescribeTitle(node).startsWith("When") === false) {
                context.report({
                  message:
                    'A describe block nested under "Given" must start with "When".',
                  node,
                });
              }
            } else {
              context.report({
                message:
                  'A "describe" block cannot be nested inside a block that is not a "Given" block.',
                node,
              });
            }
          }
          describeStack.push({ node, title: getDescribeTitle(node) });
        }

        if (isTest) {
          const message =
            '"' +
            calleeName +
            '" block must be inside a "When" describe block.';
          if (describeStack.length === 0) {
            context.report({ message, node });
            return;
          }

          const parentDescribe = describeStack[describeStack.length - 1];
          if (parentDescribe.title.startsWith("When") === false) {
            context.report({ message, node });
            return;
          }

          if (getItTitle(node).startsWith("Then") === false) {
            context.report({
              message:
                'An "' +
                calleeName +
                '" block nested under "When" must start with "Then".',
              node,
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
  meta: {
    docs: {
      category: "Best Practices",
      description: "enforce Given/When/Then structure in test files",
      recommended: true,
      url: "https://github.com/brunosabot/eslint-plugin-bruno/blob/main/docs/rules/test-given-when-then.md",
    },
    schema: [],
    type: "suggestion",
  },
};
