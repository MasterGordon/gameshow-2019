const io = require('socket.io')();
const fs = require('fs');
const players = [];
var lastId = 0;
var runde = 0;
var runden = [];
var frage = -1;

console.log("Loading Gameshow...");
runden = JSON.parse(fs.readFileSync("gameshow.json"));
console.log("Loaded " + runden.length + " Runden!");

io.on('connection', function(socket) {
  console.log('a user connected');
  registerEvents(socket)
});

io.listen(3000);
console.log("Server is running on port 3000");

function registerEvents(socket) {
  socket.on('eval', function(e) {
    try {
      socket.emit('eval', eval(e));
    } catch (ex) {
      socket.emit('eval', ex);
    }
  });
  socket.on('login', function(e) {
    players.push({
      name: e.name,
      id: lastId,
      points: 0
    });
    socket.emit('login', lastId);
    socket.emit('type', runden[runde].type);
    lastId++;
    console.log(e.name + " logged in!");
    sendPlayersUpdate();
  });
  socket.on('relogin', function(e){
    socket.emit('login', e.id);
    socket.emit('type', runden[runde].type);
  })
  socket.on('nextfrage', function(e) {
    frage++;
    var packet = runden[runde].fragen[frage];
    packet.type = runden[runde].type;
    io.local.emit("frage", packet);
    io.local.emit("unlock");
    socket.emit('rundeninfo', "Runde " + (runde + 1) + "/" + runden.length + " Frage " + (frage + 1) + "/" + runden[runde].fragen.length);
  });
  socket.on('nextrunde', function(e) {
    runde++;
    frage = 0;
    var packet = runden[runde].fragen[frage];
    packet.type = runden[runde].type;
    console.log(packet);
    io.local.emit('type', runden[runde].type);
    io.local.emit("frage", packet);
    io.local.emit("unlock");
    socket.emit('rundeninfo', "Runde " + (runde + 1) + "/" + runden.length + " Frage " + (frage + 1) + "/" + runden[runde].fragen.length);
  });
  socket.on('unlock', function(e) {
    io.local.emit("unlock");
  });
  socket.on('antwort', function(e) {
    console.log(e);
    players[e.player].antwort = e.antwort;
    io.local.emit("antwort", players[e.player]);
    sendPlayersUpdate();
  });
  socket.on('points', function(e) {
    players[e.player].points += e.points;
    sendPlayersUpdate();
  });
}

function sendPlayersUpdate() {
  io.local.emit("playersupdate", players);
}
