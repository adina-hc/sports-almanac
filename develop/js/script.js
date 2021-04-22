// Initialize MaterializeCss
/*  $(document).ready(function(){
    $('select').formSelect();
  });
  */
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var option = document.querySelectorAll('option');
    var instances = M.FormSelect.init(elems, option);
  });
   

/* ****************  Start  Section API 1 Functions           **************** */
 
var footballAPI = "9df998956f9649df8ee3ca86b464e05b";
var listCompetitions = document.querySelector("#listCompetitions");

// I ge the list of the competitions from the API
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
            for (var i = 0; i < data.count; i++){
                //According to the plan of the API I check if is TIER_ONE so I can do a filter of that 
                if (data.competitions[i].plan == "TIER_ONE") {
                    //Create the element of the option that I will use to display the leagues
                    var opt = document.createElement("option");
                        opt.value= data.competitions[i].id;
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
var getCompetitionMatches = function (event) {
  var leagueId = event.target.value;
  // I check if the select have a value
  if(leagueId!=""){
    // I get the league ID value so I can use it to set the URL 
      var apiUrl =
          "https://api.football-data.org/v2/competitions/"+leagueId+"/matches"
      
      // I do the fecth and I also add headers to set the token that I get from the API
      fetch(apiUrl, {
      cache: 'no-cache', 
      headers: {
        'X-Auth-Token': '9df998956f9649df8ee3ca86b464e05b',
      }
    }).then(function (response) {
          // I check if the API return the 200 status if not it means that there are no data 
        if (response.status == 200) {
          saveCompetition(leagueId);
              //if the API return 200 status I parse the information to json format
            response.json().then(function (data) {
              //  I do a loop to get all the matches from that league
                for (var i = 0; i < data.matches.length;i++){
                    var statusMatch = data.matches[i].status
                  //   I filter the information in order to get the matches that are Scheduled
                  if (statusMatch ==="SCHEDULED") {         
                  // I start to pass the information into the front-end elements
                  }
                }
                
            });
          }
    });
  } else {
    console.log('No results');
   }
}
// I add a listener to the select so once the user select a league can return the matches 
listCompetitions.addEventListener('change', getCompetitionMatches);
/* ****************  End    Section API 1 Functions           **************** */


 
/* ****************  Start  Section Init Functions           **************** */


var initSystem = function () {
  getCompetitionsList();
}
// I call the function to initialize the APP
initSystem();
/* ****************  End  Section Init Functions           **************** */

M.AutoInit();
