const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = '';
  c.icon = 'share';
  c.inPorts.add('send', {
    datatype: 'bang',
    description: 'Signal to send the userId'
  });
  c.inPorts.add('userid', {
    datatype: 'string',
    description: 'userId to forward',
    control: true,
    default: null
  });
  c.outPorts.add('userid', {
    datatype: 'string'
  });
  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasStream('send')) {
      return;
    }
    
    if (input.attached('userid').length && !input.hasData('userid')) {
      return;
    }
    
    // Read packets we need to process
    const userId = input.getData('userid');
    // Process data and send output
    output.send({
      userid: userId
    });
    // Deactivate
    output.done();
  });
  return c;
};
