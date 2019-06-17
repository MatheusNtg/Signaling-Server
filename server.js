// Const
const PORT = 7000;
const _OFFER = "_offer";
const _ANSWER = "_answer";
const _ICE    = "_ice";
const SET_ID   = "set_id";
// Vars to create the server
const app  = require('express')();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

// The list of sockets connected
var users = new Map();
var p2p   = new Map();

// This is the function that is triggered when someone connect to the server
io.on('connection', socket => {
  console.log(`Someone has connected to the server`);
  users.set(socket.id,null);
  socket.emit(SET_ID, "set_id");

  socket.on(_OFFER, msg =>{
    console.log(msg);
    console.log("Server has capture a offer to: " + msg.to);
    let caller = users.get(socket.id);
    makeTheCall(caller , msg.to, msg.sdp, _OFFER);
    console.log("Message to " + msg.to + " has been sended");
    p2p.set(socket.id, getSocketIdByUserName(msg.to));
  });

  socket.on(_ANSWER, msg => {
    console.log("A answer has been received");
    console.log("Forwarding answer");
    let caller = users.get(socket.id);
    makeTheCall(caller, msg.to, msg.sdp, _ANSWER);
    console.log("Answer to " + msg.to + " has been sended");
  });

  socket.on(_ICE, msg => {
    console.log("I receveid a ICE candidate");
    let caller = p2p.keys().next().value;
    console.log("Sending ICE's from " + caller + " to " + p2p.get(caller));
    makeTheCall(caller,p2p.get(caller),msg,_ICE);
  });

  socket.on("FLAG", msg => {
    console.dir(msg);
    users.set(socket.id, msg.username);
  });
  
  // Handle when a user disconnected
  socket.on('disconnect', () => {
    console.log(`Deleting ${socket.id} from the server`);
    users.delete(socket.id);
    console.log("Active clients:");
    console.dir(users);
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

function makeTheCall(caller, calle, msg, type){
  let calleid = getSocketIdByUserName(calle);
  let msgObject = {};
  msgObject.sdp = msg;
  msgObject.callerusername = caller;
  io.to(`${calleid}`).emit(type,msgObject); 
}

function getSocketIdByUserName(username){
  let result;
  for(const [key,value] of users){
      if(value === username){
        result = key;
      }
  }
  return result;
}