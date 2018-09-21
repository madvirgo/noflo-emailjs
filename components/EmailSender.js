const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = '';
  c.icon = 'paper-plane';
  c.inPorts.add('serviceId', {
    datatype: 'string',
    description: 'EmailJS ServiceID'
  });
  c.inPorts.add('templateId', {
    datatype: 'string',
    description: 'EmailJS TemplateID'
  });
  c.inPorts.add('userId', {
    datatype: 'string',
    description: 'EmailJS UserID'
  });
  c.inPorts.add('templateParams', {
    datatype: 'object',
    description: 'EmailJS Template Params'
  });
  c.outPorts.add('out', {
    datatype: 'boolean'
  });
  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasData('serviceId')) {
      return;
    }
    // Read packets we need to process
    const serviceId = input.getData('serviceId');
    const templateId = input.getData('templateId');
    const userId = input.getData('userId');
    const templateParams = input.getData('templateParams');
    
    // Process data and send output
    emailjs.send(serviceId, templateId, templateParams)
      .then(function(response) {
         output.send({
           out: true
         });
         // Deactivate
         output.done();
      }, function(error) {
         output.send({
           out: false
         });
         // Deactivate
         output.done();
      });
  });
  return c;
};
