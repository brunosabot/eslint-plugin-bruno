import fs from "fs";
import path from "path";

export default {
  create(context) {
    return {
      Program(programNode) {
        const filename = context.getFilename();
        const appDirIdentifier = `${path.sep}app${path.sep}`;

        if (
          path.basename(filename) !== "page.tsx" ||
          filename.includes(appDirIdentifier) === false
        ) {
          return;
        }

        const dir = path.dirname(filename);
        const loadingFilePath = path.join(dir, "loading.tsx");

        if (fs.existsSync(loadingFilePath) === false) {
          const relativeDir = path.dirname(filename.split(appDirIdentifier)[1]);
          context.report({
            message: `Missing loading.tsx for page in: app/${relativeDir}`,
            node: programNode.body[0] || programNode,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      category: "Best Practices",
      description: "Enforce that every page.tsx has a corresponding loading.tsx.",
      recommended: true,
      url: "https://github.com/brunosabot/eslint-plugin-bruno/blob/main/docs/rules/next-page-has-loading.md",
    },
    schema: [],
    type: "problem",
  },
};