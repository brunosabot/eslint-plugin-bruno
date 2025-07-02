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

        const arrangeComment = comments.find(
          (comment) => comment.value.trim() === "Arrange"
        );
        const actComment = comments.find(
          (comment) => comment.value.trim() === "Act"
        );
        const assertComment = comments.find(
          (comment) => comment.value.trim() === "Assert"
        );

        if (arrangeComment === undefined) {
          context.report({
            message: `The "${calleeName}" block must contain an "// Arrange" comment.`,
            node,
          });
        }

        if (assertComment === undefined) {
          context.report({
            message: `The "${calleeName}" block must contain an "// Assert" comment.`,
            node,
          });
        }

        if (
          actComment !== undefined &&
          assertComment !== undefined &&
          actComment.range[1] < assertComment.range[0]
        ) {
          const textBetween = sourceCode
            .getText()
            .slice(actComment.range[1], assertComment.range[0]);

          if (textBetween.trim() === "") {
            context.report({
              message: 'The "// Act" comment is empty and should be removed.',
              node: actComment,
            });
          }
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
