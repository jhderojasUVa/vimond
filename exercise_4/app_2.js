// Exercise 4.2
// Remember to use this using:
// node app.js

// We use the base of the exercise 4.1

// First and always the require for the http server
const http = require('http');
// And, on this case for the https too
const https = require('https');

// Next, we create the base of the server object
const server = http.createServer((req, res) => {
  // So, let's create a request, an easy one :)
  if (req.url === '/ping') { // If they put /ping ...
    // I don't know if the response must be on the console or in the browser
    // so... why not doing both? :)
    console.log('Pong!'); // On the console
    res.write(`<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Pong response</title>
</head>
<body>
  <h1>Pong!</h1>
</body>
</html>`); // On the web browser, client or whatever you want
    res.end();
    // Because it's on the client and it must be (usually) an HTML
    // it will be perfect if it's well formed (HTML well formed)
  } else if (req.url === '/version'){
    // The same as before, first on the console, second on the browser
    console.log('The node version is: ' + global.process.version);
    res.write(`<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>Node version response</title>
  <style>
  h1 {
    text-align: center;
    font-size: 3em;
    color: rgba(12, 12, 12, 0.9);
    margin: 0.5em;
  }
  p {
    text-align: center;
    color: red;
  }
  </style>
</head>
<body>
  <h1>Node version</h1>
  <p>${global.process.version}</p>
</body>
</html>`); // To the browser and beyond!
    res.end();
  } else if (req.url.includes('/images')) {
    // We will put here if there's some parameters
    // I know it's not the best way but...

    // First we take the parameters by spliting the request
    let reqParameters = req.url.split('?');

    let parameters = []; // We will put all the parameters on this array in a two dimensional array with the parameter and his value
    if ((reqParameters.length > 1) && (reqParameters[1].split('&').length > 1)) {
      // Maybe it will send more than one parameter at the same time
      // There's more than one parameter
      // So the way it's to go through all the parameters (that must be separated by &)
      reqParameters[1].split('&').forEach((element) => {
        // But, maybe (and it must be maybe) can be a value or not so..
        if (element.split('=').length > 1) { // If has a value
          let theFinalSplit = element.split('=');
          parameters.push([ // We push every element
            theFinalSplit[0],
            theFinalSplit[1]
          ]);
        } else { // If not
          parameters.push(element); // We push the only element with no value (a sadness)
        }
      });
    } else if (reqParameters.length > 1) {
      // Well there's only one parameter, hurra!
      let theFinalSplit = reqParameters[1].split('=');
      parameters.push([
        theFinalSplit[0],
        theFinalSplit[1]
      ]);
    } else {

    }
    // At this pint parameters its a bidimensional array with properties and values
    // And, of course it can be refactores this thing in an external function that do this work...
    // but I guess this is the most easy way for someone who read this to understand what I have do

    // First we create a place to store all the data
    let theData = ''; // Where to store the response data

    // Well, let's do a "get" to the URL (with https)
    https.get('https://jsonplaceholder.typicode.com/photos', (response) => {
      // Because it's an stream of data you will have in
      // consideration the begin and the end of the stream
      // We do this thanks an event

      // Recibing the "data"
      response.on('data', (theResponseData) => {
        theData += theResponseData;
      });
      // The "data" has finished
      response.on('end', () => {
        // Before sending "nothing" we must convert the raw data to something more easy to process
        let parsedResponse = JSON.parse(theData);
        let whatYouWant = []; // Let's create a response array
        let whatYouWantSring = ''; // and the string for the browser

        // But before that we create two variables, where we will store the data and then we "cut" the JSON
        let size = parsedResponse.length;
        let offset = 0;
        if (parameters.length > 0) { // If there's parameters
          // Let's walk into them to find what I want
          // On this way the parameters can be on any order but only
          // you must consider that it will use the last one
          parameters.forEach((parameter) => {
            switch (parameter[0]) {
              case 'size': // if it's size
                size = parameter[1];
                break;
              case 'offset': // if it's offset
                offset = parameter[1];
                break;
              default:  // if it's whatever
                // Well we do nothing
                break;
              }
          });
          // So we can do an slice but on this way you can see better what I want to do
          // if I had understand well what you want
          for (let i = 0; i < size; i++) {
            whatYouWant.push(parsedResponse[(offset + i)]);
          }
          // The other way
          // whatYouWant = parsedResponse.slice(offset, (size + offset)); // start - // end
        } else {
          // There's no parameters so we send it all :)
          whatYouWant = parsedResponse;
        }
        // Sending the "things"
        //console.log(whatYouWant); // On the console!

        whatYouWantSring = JSON.stringify(whatYouWant); // Let stringify the JSON
        res.write(whatYouWantSring); // On the web browser, in raw mode
        res.end();
      });
    });
  }
});

// And, at last, we "run" the server on the port 8040
server.listen(8040);

// And, (this is personal) let's indicate the user that the server is running
console.log('Server up! Listening on 8040');
console.log('You will find it open a browser and http://localhost:8040');

// Other ways to do this.
// I use if, but can be done by a case, it will be more elegant, but it will
// deppend of the person who will see it.
// And yes, the "HTML" verion of the response can be better if we add some
// styling and so on

// Sure there's more thing to make clean code creating more "external functions"
// What I mean it's that we can create some function to put outside the request
// in order to create a more easy way to read the code.
// From line 76 to 113 we will create a function that encapsulates that logic
// outse called, for example SliceFromTo(start, end, content) like this:
/*
function SliceFromTo(parameters, parsedResponse) {
  let whatYouWant = [];
  let size = parsedResponse.length;
  let offset = 0;
  if (parameters.length > 0) { // If there's parameters
    parameters.forEach((parameter) => {
      switch (parameter[0]) {
        case 'size': // if it's size
          size = parameter[1];
          break;
        case 'offset': // if it's offset
          offset = parameter[1];
          break;
        default:  // if it's whatever
          // Well we do nothing
          break;
        }
    });
    for (let i = 0; i < size; i++) {
      whatYouWant.push(parsedResponse[(offset + i)]);
    }
  } else {
    whatYouWant = parsedResponse;
  }

  return whatYouWantM
}
*/
// This will be better? On my opinion yes, because this function will be
// reusable and "more easy to read", but I have done in the other way
// because I think it's more easy to read (you read from top to bottom without
// any stop) and this function will be used only ones.
