// Exercise 4.1
// Remember to use this using:
// node app.js

// We use the base of the exercise 4

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
        if (parameters.length > 0) { // If there's parameters
          // Let's walk into them to find what I want
          parameters.forEach((parameter) => {
            if (parameter[0] === 'size') { // if it's size
              for (let i = 0; i <= parameter[1]; i++) {
                whatYouWant.push(parsedResponse[i]); // Ok let's add to the real response
                                                     // This can be done in a better way with an slice
                                                     // Do something like
                                                     // whatYouWant = parsedResponse.slice(0, parameter[i]);
                                                     // And, maybe in the second part of excercise it will be great to use it :)
              }
            }
          });

        } else {
          // There's no parameters so we send it all :)
          whatYouWant = parsedResponse;
        }
        // Sending the "things"
        console.log(whatYouWant); // On the console!

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
