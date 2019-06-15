// Const
const PORT = 7000;
const MESSAGE  = "message";
const SET_ID   = "set_id"

// Vars to create the server
const app  = require('express')();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

// The list of sockets connected
var users = new Map();

// This is the function that is triggered when someone connect to the server
io.on('connection', socket => {
  console.log(`Someone has connected to the server`);
  users.set(socket.id,null);
  socket.emit(SET_ID, "set_id");

  socket.on(MESSAGE,msg => {
    users.set(socket.id,msg);
    console.log(users);
    makeTheCall(msg.to,msg);
  });

  socket.on("RESPONSE", msg => {
    console.dir(msg);
    users.set(socket.id, msg.username);
  });
  
  // Handle when a user disconnected
  socket.on('disconnect', () => {
    // This looks if a user that's disconneting is a monitor or a locator then removes it from the proper array
  })
});


// Put the server listening on PORT
http.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

//Functions
function printActiveClients(){
  users_connected.forEach(element => {
    console.log(element.id);
  }); 
}

function makeTheCall(username, msg){
  let calleid = getSocketIdByUserName(username);
  io.to(`${calleid}`).emit(MESSAGE,msg); 
}

function getSocketIdByUserName(username){
  let result;
  for(const [key,value] of users){
    if(typeof value === "object"){
      if(value.username === username){
        result = key;
      }
    }else{
      if(value === username){
        result = key;
      }
    }
  }
  return result;
}