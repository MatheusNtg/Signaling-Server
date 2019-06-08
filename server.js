// Const
const PORT = 7000;
const NEW_ICE_CANDIDATE = 'newIceCandidate';
const SDP               = 'sdp';
const ANSWER            = 'answer';

// Vars to create the server
const app  = require('express')();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

// The list of sockets connected
var peers = [];

// This is the function that is triggered when someone connect to the server
io.on('connection', socket => {
  console.log(`Someone has connected to the server`);
  
  // Handle with the register of new users
  // socket.on('registration', user_received => {
  //   let user = {
  //     name: JSON.parse(user_received).name,
  //     id  : socket.id,
  //     type: JSON.parse(user_received).type
  //   }
  //   switch(user.type){
  //     case "monitor":
  //       console.log("A new monitor has been registered");
  //       monitors_connected.push(user);
  //       break;
  //     case "locator":
  //       console.log("A new locator has been registered");
  //       locators_connected.push(user);
  //       break;
  //     default:
  //       console.log("There was an error with the register of a new user");  
  //   }
  // });

  socket.on(NEW_ICE_CANDIDATE, msg =>{
    console.log(msg);
  });

  socket.on(SDP, msg => {
    console.log("Received a SDP message from a client");
    let object = JSON.parse(msg);
    io.emit(ANSWER,object);
  });

  // Handle when a user disconnected
  socket.on('disconnect', () => {
    // This looks if a user that's disconneting is a monitor or a locator then removes it from the proper array
    
});


// Put the server listening on PORT
http.listen(PORT, () =>{
  console.log(`Server is listening on port: ${PORT}`);
});

//Functions
function printActiveClients(){
  users_connected.forEach(element => {
    console.log(element.id);
  }); 
}
