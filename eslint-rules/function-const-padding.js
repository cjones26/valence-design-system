function definesFunction(statement) {
  return (
    statement.type === 'VariableDeclaration' &&
    statement.kind === 'const' &&
    statement.declarations.some(
      ({ init }) => init?.type === 'ArrowFunctionExpression' || init?.type === 'FunctionExpression',
    )
  );
}

function containsAwait(statement, sourceCode) {
  return sourceCode.getTokens(statement).some((token) => token.value === 'await');
}

const functionConstPadding = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {
      before: 'Expected a blank line before this function-valued const.',
      after: 'Expected a blank line after this function-valued const.',
      grouped: 'Unexpected blank line between non-function variables.',
      order: 'Declare non-function variables before function-valued constants.',
    },
  },
  create(context) {
    return {
      VariableDeclaration(node) {
        if (!definesFunction(node)) {
          const statements = node.parent.body ?? node.parent.consequent;

          if (!Array.isArray(statements)) {
            return;
          }

          const index = statements.indexOf(node);
          const previous = statements[index - 1];
          const sourceCode = context.sourceCode;

          if (
            previous?.type === 'VariableDeclaration' &&
            !definesFunction(previous) &&
            !containsAwait(previous, sourceCode) &&
            !containsAwait(node, sourceCode) &&
            node.loc.start.line - previous.loc.end.line > 1
          ) {
            const between = sourceCode.text.slice(previous.range[1], node.range[0]);

            if (between.trim() === '') {
              context.report({
                node,
                messageId: 'grouped',
                fix: (fixer) =>
                  fixer.replaceTextRange(
                    [previous.range[1], node.range[0]],
                    `\n${' '.repeat(node.loc.start.column)}`,
                  ),
              });
            }
          }

          return;
        }

        const statements = node.parent.body ?? node.parent.consequent;

        if (!Array.isArray(statements)) {
          return;
        }

        const index = statements.indexOf(node);
        const previous = statements[index - 1];
        const next = statements[index + 1];
        const misplacedVariable = statements
          .slice(index + 1)
          .find(
            (statement) => statement.type === 'VariableDeclaration' && !definesFunction(statement),
          );

        if (misplacedVariable) {
          context.report({ node: misplacedVariable, messageId: 'order' });
        }

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

export default functionConstPadding;
