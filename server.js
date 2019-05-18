// Const
const PORT = 8000;

// Vars to create the server
const app  = require('express')();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

// The list of sockets connected
let monitors_connected = [];
let locators_connected = [];

// This is the function that is triggered when someone connect to the server
io.on('connection', socket => {
  console.log(`Someone has connected to the server`);
  
  // Handle with the register of new users
  socket.on('registration', user_received => {
    let user = {
      name: JSON.parse(user_received).name,
      id  : socket.id,
      type: JSON.parse(user_received).type
    }
    switch(user.type){
      case "monitor":
        console.log("A new monitor has been registered");
        monitors_connected.push(user);
        break;
      case "locator":
        console.log("A new locator has been registered");
        locators_connected.push(user);
        break;
      default:
        console.log("There was an erro with the register of a new user");  
    }
  });

  // Handle when a user disconnected
  socket.on('disconnect', () => {
    
  });

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

function userIsOnArray(array, id){
  let response;
  array.filter(user => {
    response = user.id === id ? true: false;
    return response;
  });
}