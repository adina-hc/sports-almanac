// Initialize MaterializeCss
M.AutoInit();


/* ****************  Start  Section API 1 Functions           **************** */

var footballAPI = "9df998956f9649df8ee3ca86b464e05b";
var listCompetitions = document.querySelector("#listCompetitions");
var gameInfo = document.querySelector("#gameInfo");
var gameTitle = document.querySelector("#gameTitle");
var tema1tab = document.querySelector("#tema1tab");
var tema2tab = document.querySelector("#tema2tab");
var tema1info = document.querySelector("#tema1info");
var team1logo = document.querySelector("#team1logo");
var team1wins = document.querySelector("#team1wins");
var team1draws = document.querySelector("#team1draws");
var team1losses = document.querySelector("#team1losses");
var playersListTeam1 = document.querySelector("#playersListTeam1");
var coachTeam1 = document.querySelector("#coachTeam1");
var tema2info = document.querySelector("#tema2info");
var team2logo = document.querySelector("#team2logo");
var team2wins = document.querySelector("#team2wins");
var team2draws = document.querySelector("#team2draws");
var team2losses = document.querySelector("#team2losses");
var playersListTeam2 = document.querySelector("#playersListTeam2");
var coachTeam2 = document.querySelector("#coachTeam2");
var historyList = document.querySelector("#historyList");

// I get the list of the competitions from the API
var getCompetitionsList = function () {
  //I get the value of the input
  //I set the value of the API URL and I concatenate the city and the API Key
  var apiUrl =
    "https://api.football-data.org/v2/competitions/"
  // I do the fecth and I also add headers to set the token that I get from the API
  fetch(apiUrl, {
    cache: 'no-cache',
    headers: {
      'X-Auth-Token': '9df998956f9649df8ee3ca86b464e05b',
    }
  }).then(function (response) {
    // I check if the API return the 200 status if not it means that there are no data 
    if (response.status == 200) {
      //if the API return 200 status I parse the information to json format
      response.json().then(function (data) {
        for (var i = 0; i < data.count; i++) {
          //According to the plan of the API I check if is TIER_ONE so I can do a filter of that 
          if (data.competitions[i].plan == "TIER_ONE") {
            //Create the element of the option that I will use to display the leagues
            var opt = document.createElement("option");
            opt.value = data.competitions[i].id + ";" + data.competitions[i].name;
            opt.innerHTML = data.competitions[i].name;
            // then append it to the select element
            listCompetitions.appendChild(opt);
          }
        }
        // I initialize the select so it can display the Materialize design
        var elems = document.querySelectorAll('select');
        var option = document.querySelectorAll('option');
        var instances = M.FormSelect.init(elems, option);
      });
    }
  });
}

// I get the list of the competitions matches from the API
var getEventLeague = function (event) {  
  var eventData = (event.target.value).split(";");
  var leagueId = eventData[0];
  var leagueName = eventData[1];
  getCompetitionMatches(leagueId, leagueName);
}

var getCompetitionMatches  = function (leagueId,leagueName){
  // I check if the select have a value
  if (leagueId != "") {
    // I get the league ID value so I can use it to set the URL 
    var apiUrl =
      "https://api.football-data.org/v2/competitions/" + leagueId + "/matches"

    // I do the fecth and I also add headers to set the token that I get from the API
    fetch(apiUrl, {
      cache: 'no-cache',
      headers: {
        'X-Auth-Token': '9df998956f9649df8ee3ca86b464e05b',
      }
    }).then(function (response) {
      // I check if the API return the 200 status if not it means that there are no data 
      if (response.status == 200) {

        saveCompetition(leagueId,leagueName);

        //if the API return 200 status I parse the information to json format
        response.json().then(function (data) {
          //  I do a loop to get all the matches from that league
          for (var i = 0; i < data.matches.length; i++) {
            var statusMatch = data.matches[i].status
            //   I filter the information in order to get the matches that are Scheduled
            if (statusMatch === "SCHEDULED") {
              // I start to pass the information into the front-end elements
              console.log(data.matches[i]);
            }
          }

        });
      }
    });
  } else {
    console.log('No results');
  }
}

// Function to create button with history of searches -()
//class="waves-effect waves-light btn boton
function generateBtn(leagueId,leagueName) {
  var newLi = document.createElement("li");
  var newA = document.createElement("a");
  newA.setAttribute("class","wave-effect waves-light btn boton");
  newLi.appendChild(newA);
  newA.setAttribute("data-value",leagueId+";"+leagueName);
  historyList.appendChild(newLi);
  newA.textContent = leagueName; 
}

// On click of history button, display data
// Store the value of the history
function displayHistory(e) {
  console.log(e.target.dataset.value);
  console.log(e);
}




// I get the teamsInfo of a match  from the API

var gameMatchInfo = function (matchId) {
  // I get the league ID value so I can use it to set the URL 
  var apiUrl =
    "https://api.football-data.org/v2/matches/" + matchId

  // I do the fecth and I also add headers to set the token that I get from the API
  fetch(apiUrl, {
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'X-Auth-Token': '9df998956f9649df8ee3ca86b464e05b',
    }
  }).then(function (response) {
    // I check if the API return the 200 status if not it means that there are no data 
    if (response.status == 200) {
      //if the API return 200 status I parse the information to json format
      response.json().then(function (data) {
        // Get the information of the match and I start to append the information into the Front-End

        gameTitle.textContent = data.head2head.homeTeam.name + " vs " + data.head2head.awayTeam.name;
        // I append the information of the Home team
        team1wins.textContent = data.head2head.homeTeam.wins;
        team1draws.textContent = data.head2head.homeTeam.draws;
        team1losses.textContent = data.head2head.homeTeam.losses;
        tema1tab.textContent = data.head2head.homeTeam.name + " (Home Team)";
        // I append the information of the Away team
        team2wins.textContent = data.head2head.awayTeam.wins;
        team2draws.textContent = data.head2head.awayTeam.draws;
        team2losses.textContent = data.head2head.awayTeam.losses;
        tema2tab.textContent = data.head2head.awayTeam.name + " (Away Team)";
        //I call the function that get the information of the team according to their ID and I set id is hoome or away team 
        getInfoTeam(data.head2head.homeTeam.id, true);
        getInfoTeam(data.head2head.awayTeam.id, false);
        $('#gameInfo').modal('open');
      });
    }
  });
}
//With this function I get the info of a Team
var getInfoTeam = function (teamId, ishomeTeam) {

  // I get the league ID value so I can use it to set the URL 
  var apiUrl =
    "https://api.football-data.org/v2/teams/" + teamId

  // I do the fecth and I also add headers to set the token that I get from the API
  fetch(apiUrl, {
    cache: 'no-cache',
    headers: {
      'X-Auth-Token': '9df998956f9649df8ee3ca86b464e05b',
    }
  }).then(function (response) {
    // I check if the API return the 200 status if not it means that there are no data 
    if (response.status == 200) {
      //if the API return 200 status I parse the information to json format
      response.json().then(function (data) {
        //  I do a loop to get all the matches from that league
        console.log(data);
        // I insert the logo of the team
        if (ishomeTeam) {
          team1logo.src = data.crestUrl;
        } else {
          team2logo.src = data.crestUrl;
        }

        for (var it = 0; it < data.squad.length; it++) {
          // I define the general elements that I will use that later I will append to the frontend
          var spanNameEl = document.createElement('span');
          var liEl = document.createElement('li');
          var divEl = document.createElement('div');
          var iEl = document.createElement('i');
          iEl.setAttribute('class', 'material-icons');
          liEl.setAttribute('class', 'collection-item');
          if (data.squad[it].role == "COACH") {
            // I insert the information of the coach into the list on the modal so the user can see that 
            spanNameEl.textContent = data.squad[it].name;
            // I insert the icon 
            iEl.textContent = "event_note";
            // I appenad the elements 
            divEl.appendChild(iEl);
            divEl.append(spanNameEl);
            liEl.appendChild(divEl);

            if (ishomeTeam) {
              coachTeam1.append(liEl);
            } else {
              coachTeam2.append(liEl);
            }
          } else {
            // I check if the player have a position with this I make sure that is a current player
            if (data.squad[it].position !== null) {
              // I insert the information of the players into the list on the modal so the user can see that 
              var spanBadgeEl = document.createElement('span');
              // I insert the classes into the elements 
              spanBadgeEl.setAttribute('class', 'new badge');
              // I custom the value of  the badge in order to display the user position
              spanBadgeEl.setAttribute('data-badge-caption', data.squad[it].position);
              spanNameEl.textContent = data.squad[it].name;
              // I insert the icon 
              iEl.textContent = "directions_run";
              // I appenad the elements 
              divEl.append(iEl);
              divEl.append(spanNameEl);
              divEl.append(spanBadgeEl);
              liEl.appendChild(divEl);

              if (ishomeTeam) {
                playersListTeam1.append(liEl);
              } else {
                playersListTeam2.append(liEl);
              }
            }
          }
        }
      });
    }
  });
}

// I add a listener to the select so once the user select a league can return the matches 
listCompetitions.addEventListener('change', getEventLeague);
/* ****************  End    Section API 1 Functions           **************** */



/* ****************  Start  Section Init Functions           **************** */


var initSystem = function () {
  getCompetitionsList();
}
// I call the function to initialize the APP
initSystem();
/* ****************  End  Section Init Functions           **************** */

// Event listener for History button
historyList.addEventListener('click',displayHistory);