module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure observables are properly unsubscribed",
      category: "Best Practices",
      recommended: true,
    },
    schema: [],
    messages: {
      missingUnsubscribe:
        "Observable should be unsubscribed to prevent memory leaks.",
    },
  },
  create(context) {
    return {
      "CallExpression[callee.property.name='subscribe']": (node) => {
        const parentExpression = node.parent;

        // Check if parent has pipe and includes takeUntilDestroyed or other unsubscribers
        const pipeExpression = parentExpression?.parent;
        if (
          pipeExpression &&
          pipeExpression.type === "CallExpression" &&
          pipeExpression.callee.property &&
          pipeExpression.callee.property.name === "pipe"
        ) {
          const pipeArgs = pipeExpression.arguments;
          if (
            pipeArgs.some((arg) => arg.callee?.name === "takeUntilDestroyed")
          ) {
            return; // Skip reporting if takeUntilDestroyed exists
          }
        }

        // Report the issue if no proper unsubscribe mechanism is detected
        context.report({
          node,
          messageId: "missingUnsubscribe",
        });
      },
    };
  },
};
