function isJestMock(statement) {
  const expression = statement.type === 'ExpressionStatement' ? statement.expression : undefined;

  return (
    expression?.type === 'CallExpression' &&
    expression.callee.type === 'MemberExpression' &&
    expression.callee.object.type === 'Identifier' &&
    expression.callee.object.name === 'jest' &&
    expression.callee.property.type === 'Identifier' &&
    expression.callee.property.name === 'mock'
  );
}

const jestMockPadding = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {
      before: 'Expected a blank line before this jest.mock statement.',
      after: 'Expected a blank line after this jest.mock statement.',
    },
  },
  create(context) {
    return {
      ExpressionStatement(node) {
        if (!isJestMock(node)) {
          return;
        }

        const statements = node.parent.body;

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

        if (next && next.loc.start.line - node.loc.end.line < 2) {
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

export default jestMockPadding;
