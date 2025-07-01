export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce Arrange/Act/Assert pattern in test files",
      category: "Best Practices",
      recommended: true,
    },
    schema: [],
  },
  create: function (context) {
    return {
      CallExpression(node) {
        if (node.callee.name !== "it") {
          return;
        }

        const sourceCode = context.getSourceCode();
        const comments = sourceCode.getCommentsInside(node);

        const hasArrange = comments.some(
          (comment) => comment.value.trim() === "Arrange"
        );
        const hasAssert = comments.some(
          (comment) => comment.value.trim() === "Assert"
        );

        if (hasArrange === false) {
          context.report({
            node,
            message: 'The "it" block must contain an "// Arrange" comment.',
          });
        }

        if (hasAssert === false) {
          context.report({
            node,
            message: 'The "it" block must contain an "// Assert" comment.',
          });
        }
      },
    };
  },
};
