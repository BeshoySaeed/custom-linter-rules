module.exports = {
  rules: {
    "my-custom-rule": {
      meta: {},
      create: function (context) {
        return {};
      },
    },
    "no-testing": {
      meta: {
        messages: {
          noTesting: "Testing is not allowed",
        },
      },
      create: function (context) {
        const filename = context.getFilename();
        return {
          Program: function (node) {
            if (filename.includes("component")) {
              console.log("file name", context.getFilename());
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
    },
  },
};
