var socket = null;
var players = {};
var geantworted = 0;

var currentFrage = {};
$(function() {
  socket = io("http://localhost:3000")
  socket.on('connect', function(socket) {
    // Check if team is set
  });
  socket.on("eval", function(e) {
    console.log(e);
  })
  socket.on("frage", function(e) {
    setFrage(e)
  })
  socket.on("playersupdate", function(e) {
    players = e;
    updatePlayers();
  })
  socket.on("rundeninfo", function(e) {
    console.log(e);
  })
  socket.on("antwort", function(e) {
    console.log("player " + e.id + " " + e.name + " | " + e.antwort);
    console.log(++geantworted + "/" + players.length)
    if (e.antwort == "BZ") {
      $(".team").text(e.name);
      console.log("buzzer " + e.name);
    }
  })
})

function e(eval) {
  console.log(socket.emit("eval", eval));
}

function nextFrage() {
  socket.emit('nextfrage');
  geantworted = 0;
}

function nextRound() {
  socket.emit('nextrunde');
  geantworted = 0;
}

function unlock() {
  socket.emit('unlock');
  $('.team').text("");
}

function addPoint(player, points) {
  var packet = {};
  packet.player = player;
  packet.points = points;
  socket.emit('points', packet);
}
