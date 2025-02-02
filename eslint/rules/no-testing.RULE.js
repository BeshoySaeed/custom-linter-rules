module.exports = {
  meta: {
    messages: {
      noTesting: "Testing is not allowed",
    },
  },
  create: function (context) {
    const filename = context.getFilename();
    return {
      Program: function (node) {
        if (filename.endsWith(".spec.ts")) {
          context.report({
            node,
            messageId: "noTesting",
            data: {
              filename: context.getFilename(),
            },
          });
        }
      },
    };
  },
};
