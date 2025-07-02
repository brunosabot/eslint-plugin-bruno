export default {
  create: function (context) {
    return {
      CallExpression(node) {
        const calleeName = node.callee.name;
        if (calleeName !== "it" && calleeName !== "test") {
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
            message: 'The "' + calleeName + '" block must contain an "// Arrange" comment.',
            node,
          });
        }

        if (hasAssert === false) {
          context.report({
            message: 'The "' + calleeName + '" block must contain an "// Assert" comment.',
            node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      category: "Best Practices",
      description: "enforce Arrange/Act/Assert pattern in test files",
      recommended: true,
    },
    schema: [],
    type: "suggestion",
  },
};
