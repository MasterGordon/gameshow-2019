var socket = null;
var playerid = 0;
$(function() {
  console.log("dom loaded");
  socket = io("http://192.168.137.1:3000")
  socket.on('connect', function(socket) {
    console.log("connected");
  });
  socket.on('type', function(e) {
    $("ons-page").hide();
    console.log(e);
    $("#" + e).show();
  });
  socket.on('login', function(e) {
    playerid = e;
  })
  socket.on('unlock', function(e) {
    $("#blocker").hide();
    $(".antwort").removeAttr("style");
  })
  socket.on('antwort', function(e) {
    if (e.antwort == "BZ") {
      $("#blocker").show();
    }
  })
  $(".antwort").click(function(e) {
    $(this).css("background-color", "lightblue");
    $("#blocker").show();
  })
})

function login() {
  socket.emit("login", {
    name: $("#name").val()
  });
}

function relogin() {
  socket.emit("relogin", {
    id: parseInt($("#name").val())
  });
}

function senden() {
  var packet = {};
  packet.player = playerid;
  packet.antwort = $('#textinput').val();
  $('#textinput').val("");
  socket.emit('antwort', packet);
}

function antwort(antwort) {
  var packet = {};
  packet.player = playerid;
  packet.antwort = antwort;
  socket.emit('antwort', packet);
}
