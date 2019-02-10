// Exercise7
// Remember to use this using:
// node app.js

// We use the base of the exercise 4? :)

// First and always the require for the http server
const http = require('http');
// And, on this case for the https too
const https = require('https');

// Next, we create the base of the server object
const server = http.createServer((req, res) => {
  // Don't forget the CORS!
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', '*');

  if ((req.url === '/todo') && ((req.method === 'POST') || (req.method === 'OPTIONS'))) {
    // I know that there's no need for the brackets, but it's more easy
    // to read and I put OPTIONS because the CORS, you know
    // So now let's get the data
    var reqData = '';
    var responseData = '';

    // On this case, because what I must do it's "more important"
    // I will use the way to concatenate the emits from the http request
    // it's better (on my opinion) but sometimes more complicated to read
    // So if you have come here, you, at least are better than me (always)
    // and it will be easy for you to read

    req.on('error', (error) => { // There was an error!
      console.log('There was an error reading the post from the page!!; '+ error);
    })
    .on('data', (theData) => { // Taking the data
      reqData += theData;
    })
    .on('end', () => { // Finishing the request
      // So, here we have all the data in reqData and we must do the post

      // First the options of the request
      var postOptions = {
            host: '​jsonplaceholder.typicode.com​',
            port: '443',
            path: '/todo',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(reqData)
            }
          }
      // Second the request
      var postRequest = https.request(postOptions, function(responseFromPost) {
            responseFromPost.setEncoding('utf8'); // Let's try the encoding

            responseFromPost.on('error', (error) => {
              console.log('There is an error on the post of jsonplaceholder!! '+ error);
            });

            responseFromPost.on('data', (data) => {
              responseData += data;
            });

            responseFromPost.on('end', () => {
              // Let's send the response to the web browser client or whatever
              res.write(JSON.parse(responseData));
            });
          });

      postRequest.write(JSON.parse(reqData)); // Send the request to the ​jsonplaceholder server
      postRequest.end(); // and say to them that we have finished

      res.end(); // if you don't put this you are in a serious truble because
                 // it will never know if all has finished or not
    });
  }

});

// And, at last, we "run" the server on the port 8040
server.listen(8040);

// And, (this is personal) let's indicate the user that the server is running
console.log('Server up! Listening on 8040');
console.log('You will find it open a browser and http://localhost:8040');


// There's some important errors that I don't know how to resolve
/*
_http_outgoing.js:464
    throw err;
    ^

TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Host"]
    at ClientRequest.setHeader (_http_outgoing.js:473:3)
    at new ClientRequest (_http_client.js:214:12)
    at Object.request (https.js:281:10)
    at IncomingMessage.req.on.on.on (G:\Proyects\vimond\exercise_7\app.js:54:31)
    at IncomingMessage.emit (events.js:189:13)
    at endReadableNT (_stream_readable.js:1103:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
*/

// What it means it's that ​jsonplaceholder.typicode.com​ respond me with a bad
// header (the Host part) and I get stuck thinking that it's maybe a node problem
// because my version of node (really)... so, I will continue with the exercises
// and return here after that
