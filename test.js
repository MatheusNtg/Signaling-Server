let monitor = [
  user1 = {
    name: "a",
    id  : 1
  },
  user2 = {
    name: "b",
    id  : 3
  }
]

let locator = [
  user1 = {
    name: "d",
    id  : 4
  },
  user2 = {
    name: "e",
    id  : 5
  }
]

function findArrayThatIdBelogns(id){
  let response;
  monitor.filter( element => {
    if(element.id === id){
      response = "monitor";
    }else{
      response = "locator";
    }
  });

  return response;
}

function deleteFromMonitor(id){

}

function getUserFromMonitorById(id){
  let response = null;
  monitor.filter(element => {
    if(element.id === id) response = element;
  });

  return response;
}

function deleteFromMonitor(id){
  let user = getUserFromMonitorById(id);
  monitor.splice( monitor.indexOf(user), 1);
}


function printActiveClients(){
  monitor.forEach(element => {
    console.log(element);
  }); 
}
console.log(printActiveClients());
deleteFromMonitor(3);
console.log(printActiveClients());