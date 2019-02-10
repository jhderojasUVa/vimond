// Exercise5
// Remember to use this using:
// node app.js

// We use the base of the exercise 4.2

// On this case, before of everything I will put here what I have understand
// So, what you want it to make two fech into to urls
// In the first one I will find the id number 8 and all his data
// and in the second all post related to the user id number 8.
// After that I will merge it in a JSON where "user" is the content of the user
// and post will be all the posts

// First and always the require for the http server
const http = require('http');
// And, on this case for the https too
const https = require('https');
// And an event emitter (you will se later why)
const EventEmitter = require('events');
// And, of course, we need a new instance of the EventEmitter class
const emitter = new EventEmitter;

// Next, we create the base of the server object
const server = http.createServer((req, res) => {
  // In this case we will clean the mesh of the other exercises and some of
  // the comments because, I think, if you get here, you will know
  // what I have done before

  // How to do this exercise. If the goal it's to do two http request there's a lot of solutions
  // I used this. Because http is an event emitter why not use it?
  // What I mean is I created another emitter that handle the second request
  // and will be called when the first finish, so in this way, they don't do
  // at the same time and we don't have a mesh of responses

  // Some variables for the filtered data
  var userId8Data = [];
  var postFromUserId8 = [];

  // Let's create the event (of the class) that recives the data from the
  // first event of the http
  emitter.on('secondPetition' ,(userId8data) => {
    // A typical pettition, nothing hard to understand
    https.get('https://jsonplaceholder.typicode.com/posts', (response) => {
      // A variable for putting all the content of all the post of th get
      let allPosts = '';

      // When I get data let's add to the data :)
      response.on('data', (theResponseData) => {
        allPosts += theResponseData;
      });

      // When it finished
      response.on('end', () => {
        // Let's filter the data
        postFromUserId8 = JSON.parse(allPosts).filter((element) => {
          return element.userId == 8;
        });
        // So here we must send it to the client and the console
        // so let's create an "array" that contain all
        // The fast way.. the "spread operator" a good friend in es6
        let bigResponse = {
          'user': [...userId8data],
          'posts': [...postFromUserId8]
        };
        console.log(bigResponse); // on terminal
        res.write(JSON.stringify(bigResponse)); // on the browser
        res.end(); // and finishing all
      });
    });
  });

  if (req.url === '/Nicholas') { // Sure that they request /Nicholas
    // A variable for having the response of the get
    var allUsers = '';

    // Let's do the first get to the users
    https.get('https://jsonplaceholder.typicode.com/users', (response) => {

      response.on('data', (theResponseData) => {
        allUsers += theResponseData; // All the user will be here
      });

      response.on('end', () => {
        // Filtering the users by the id 8
        userId8Data = JSON.parse(allUsers).filter((element) => {
          return element.id == 8;
        });
        // Sending to the emitter to make the seccond petition
        emitter.emit('secondPetition', userId8Data);
      });
    });
  }
});

// And, at last, we "run" the server on the port 8040
server.listen(8040);

// And, (this is personal) let's indicate the user that the server is running
console.log('Server up! Listening on 8040');
console.log('You will find it open a browser and http://localhost:8040');

// This can be done in other ways?
// Of course, you can refactor this to use the emitter in a good way doing two
// .emits and two .on. It will be more easy readable (or not, depending the
// person), but, I think this is an easy way to be on the path of what I have
// do because the .on must be before the .emit, sometimes it's difficult to
// follow the code
