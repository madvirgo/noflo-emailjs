const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = '';
  c.icon = 'paper-plane';
  c.inPorts.add('serviceid', {
    datatype: 'string',
    description: 'EmailJS ServiceID'
  });
  c.inPorts.add('templateid', {
    datatype: 'string',
    description: 'EmailJS TemplateID'
  });
  c.inPorts.add('userid', {
    datatype: 'string',
    description: 'EmailJS UserID'
  });
  c.inPorts.add('templateparams', {
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
    const serviceId = input.getData('serviceid');
    const templateId = input.getData('templateid');
    const userId = input.getData('userid');
    const templateParams = input.getData('templateparams');
    
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
