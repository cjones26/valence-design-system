const ifStatementPadding = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {
      before: 'Expected a blank line before this if statement.',
      after: 'Expected a blank line after this if statement.',
    },
  },
  create(context) {
    return {
      IfStatement(node) {
        const statements = node.parent.body ?? node.parent.consequent;

        if (!Array.isArray(statements)) {
          return;
        }

        const index = statements.indexOf(node);
        const previous = statements[index - 1];
        const next = statements[index + 1];

        if (previous && node.loc.start.line - previous.loc.end.line < 2) {
          context.report({
            node,
            messageId: 'before',
            fix: (fixer) => fixer.insertTextBefore(node, `\n${' '.repeat(node.loc.start.column)}`),
          });
        }

        if (next && next.type !== 'IfStatement' && next.loc.start.line - node.loc.end.line < 2) {
          context.report({
            node,
            messageId: 'after',
            fix: (fixer) => fixer.insertTextAfter(node, '\n'),
          });
        }
      },
    };
  },
};

export default ifStatementPadding;
