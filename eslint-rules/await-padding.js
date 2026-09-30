const awaitPadding = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {
      before: 'Expected a blank line before this await statement.',
      after: 'Expected a blank line after this await statement.',
    },
  },
  create(context) {
    const checkedStatements = new WeakSet();

    return {
      AwaitExpression(node) {
        let statement = node;

        while (
          statement.parent &&
          statement.parent.type !== 'BlockStatement' &&
          statement.parent.type !== 'Program' &&
          statement.parent.type !== 'SwitchCase'
        ) {
          statement = statement.parent;
        }

        if (checkedStatements.has(statement)) {
          return;
        }

        checkedStatements.add(statement);

        const statements = statement.parent.body ?? statement.parent.consequent;

        if (!Array.isArray(statements)) {
          return;
        }

        const index = statements.indexOf(statement);
        const previous = statements[index - 1];
        const next = statements[index + 1];

        if (previous && statement.loc.start.line - previous.loc.end.line < 2) {
          context.report({
            node: statement,
            messageId: 'before',
            fix: (fixer) =>
              fixer.insertTextBefore(statement, `\n${' '.repeat(statement.loc.start.column)}`),
          });
        }

        if (next && next.loc.start.line - statement.loc.end.line < 2) {
          context.report({
            node: statement,
            messageId: 'after',
            fix: (fixer) => fixer.insertTextAfter(statement, '\n'),
          });
        }
      },
    };
  },
};

export default awaitPadding;
