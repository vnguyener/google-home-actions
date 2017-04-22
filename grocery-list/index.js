'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;

// [START YourAction]
exports.yourAction = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Fulfill action business logic
  function responseHandler (assistant) {
    // Complete your fulfillment logic and send a response
    assistant.tell('Hello, World!');
  }

  const actionMap = new Map();
  actionMap.set('<API.AI_action_name>', responseHandler);

  assistant.handleRequest(actionMap);
};
// [END YourAction]
