const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = '';
  c.icon = 'list';
  c.inPorts.add('name', {
    datatype: 'string',
    description: 'EmailJS Template Param name'
  });
  c.inPorts.add('notes', {
    datatype: 'string',
    description: 'EmailJS Template Param notes'
  });
  c.inPorts.add('replyemail', {
    datatype: 'string',
    description: 'EmailJS Template Param reply_email'
  });
  c.inPorts.add('message', {
    datatype: 'string',
    description: 'EmailJS Template Param message'
  });
  c.outPorts.add('templateparams', {
    datatype: 'object'
  });
  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasData('name')) {
      return;
    }
    // Read packets we need to process
    const name = input.getData('name');
    const notes = input.getData('notes');
    const replyEmail = input.getData('replyemail');
    const message = input.getData('message');
    // Process data and send output
    output.send({
      templateparams: {
        name: name,
        notes: notes,
        replyEmail: replyEmail,
        message: message
      }
    });
    // Deactivate
    output.done();
  });
  return c;
};
