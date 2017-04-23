'use strict';

process.env.DEBUG = 'actions-on-google:*';

const Assistant = require('actions-on-google').ApiAiAssistant,
      express = require('express'),
      bodyParser = require('body-parser'),
      groceryService = require('./services/grocery.service')

let app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ type: 'application/json'}));

app.post('/', (req, res) => {
  //check auth

  const assistant = new Assistant({request: req, response: res});

  // Fulfill action business logic
  function responseHandler (assistant) {
    console.log("Intent: ")
    console.log(req.body.result.metadata);
    console.log(req.body.result.parameters);

    // Get Intent and parameters
    let intent = req.body.result.metadata.intentName;
    
    // Complete your fulfillment logic and send a response
    switch(intent) {
				case 'Clear List':
          groceryService.clearGroceryList()
            .then((res) => {
              assistant.tell("I've cleared your list. Want to start a new one?");
            });
        case 'Adding Groceries':
          let items = 
          groceryService.addGroceryItems(items);
        case 'Get Groceries':
          let items = 
          groceryService.checkGroceryList(items)
            .then((res) => {
            })
            .catch((err) => {
            });
        case 'Get List':
          groceryService.getGroceryList()
            .then((res) => {
              assistant.tell("Let's see what you have in your list.");
              if (res.length > 0) {
                assistant.tell("Here's what's in your list.");
                let response = "";
                res.forEach((item, i) => {
                  if (i === 0) {
                    response += item.name;
                  } else if (i !== (res.length-1)) {
                    response += ", " + item.name;
                  } else {
                    response += ", and " + item.name;
                  }
                });
                assistant.tell(response);

              } else {
                assistant.tell("Looks like you don't have any items in your grocery list? Would you like to add something?");
              }
            })
            .catch((err) => {
              assistant.tell("Looks like there was an error in your request. Please try again.")
            });
        case 'Removing Groceries':
          let items = 
          groceryService.removeGroceryItems(items)
            .then((res) => {
            })
            .catch((err) => {
            });    
    
    }
  };

  assistant.handleRequest(responseHandler);
});

let server = app.listen(process.env.PORT || 8080, () => {
  let port = server.address().port;
  console.log('Magic Happens on port %s', port);
});

module.exports = app;
