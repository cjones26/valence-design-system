function isUserEventSetup(node) {
  return (
    node?.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'userEvent' &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === 'setup'
  );
}

function isSetupDeclaration(statement) {
  return (
    statement?.type === 'VariableDeclaration' &&
    statement.kind === 'const' &&
    statement.declarations.length === 1 &&
    statement.declarations[0].id.type === 'Identifier' &&
    statement.declarations[0].id.name === 'user' &&
    isUserEventSetup(statement.declarations[0].init)
  );
}

function countSetupCalls(node) {
  let count = 0;

  function visit(current) {
    if (!current || typeof current !== 'object') {
      return;
    }

    if (isUserEventSetup(current)) {
      count += 1;
    }

    if (
      current.type === 'CallExpression' &&
      current.callee.type === 'Identifier' &&
      current.callee.name === 'describe'
    ) {
      return;
    }

    for (const [key, value] of Object.entries(current)) {
      if (key !== 'parent') {
        if (Array.isArray(value)) {
          value.forEach(visit);
        } else {
          visit(value);
        }
      }
    }
  }

  visit(node);

  return count;
}

const userEventSetup = {
  meta: {
    type: 'suggestion',
    schema: [],
    messages: {
      placement:
        'Declare "const user = userEvent.setup();" once as the first statement in this describe block.',
    },
  },
  create(context) {
    return {
      "CallExpression[callee.name='describe']"(node) {
        const callback = node.arguments[1];

        if (
          !callback ||
          (callback.type !== 'ArrowFunctionExpression' && callback.type !== 'FunctionExpression') ||
          callback.body.type !== 'BlockStatement'
        ) {
          return;
        }

        const setupCount = countSetupCalls(callback.body);

        if (setupCount > 0 && (setupCount !== 1 || !isSetupDeclaration(callback.body.body[0]))) {
          context.report({ node, messageId: 'placement' });
        }
      },
    };
  },
};

export default userEventSetup;
