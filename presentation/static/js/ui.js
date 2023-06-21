function setFrageMC(frage) {
  $(".multiplechoise .frage").text(frage.frage);
  $(".multiplechoise .B").text("B " + frage.B);
  $(".multiplechoise .A").text("A " + frage.A);
  $(".multiplechoise .C").text("C " + frage.C);
  $(".multiplechoise .D").text("D " + frage.D);
}

function setFrageBZ(frage) {
  $(".buzzer .frage strong").hide();
  $(".buzzer .frage strong").text(frage.frage);
  console.log(frage.frage);
}

function setAntwortMC(frage) {
  showAntworten = "";
  $(".multiplechoise ." + frage.right).addClass("right");
}

function setFrage(frage) {
  showAntworten = 'display: none';
  updatePlayers();
  $(".right").removeClass("right");
  currentFrage = frage;
  switch (currentFrage.type) {
    case "MC":
      setFrageMC(currentFrage);
      break;
    case "BZ":
      setFrageBZ(currentFrage);
      break;
    case "text":
      $('.frage').text(frage.frage);
      $('.text').html("");
      dudenText = frage.antwort;
    default:

  }
}

var dudenText = "";

function showText() {
  var texte = [];
  texte.push("<h4>" + dudenText + "<i class=\"teamspoiler\"> - Der Duden</i></h4>")
  for (var i = 0; i < players.length; i++) {
    texte.push("<h4>" + players[i].antwort + "<i class=\"teamspoiler\" style=\"display: none;\"> - " + players[i].name + "</i></h4>");
  }
  var texteJoined = shuffle(texte).join("\n");
  console.log(texteJoined);
  $('.text').html(texteJoined);
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function setAntwort() {
  switch (currentFrage.type) {
    case "MC":
      setAntwortMC(currentFrage);
      break;
    case "BZ":
      $(".buzzer .frage strong").show();
      break;
    case "text":
      $('.teamspoiler').show();
    default:
  }
  updatePlayers();
}

var showAntworten = 'display: none';

function updatePlayers() {
  $("#players").empty();
  for (var i = 0; i < players.length; i++) {
    player = players[i];
    $("#players").append('<div class="player"><h3>' + player.name + '</h3><h3 class="playeranswer" style="' + showAntworten + '">Antwort ' + player.antwort + '</h3><h4>Punkte: ' + player.points + '</h4></div>')
  }
}
