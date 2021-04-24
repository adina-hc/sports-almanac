//Save on local storage
var saveCompetition = function(leagueId, leagueName) {
    var savedHistory = JSON.parse(localStorage.getItem("league")) || [];
    var isOnLocalStorage = false;
    var leagueObject = {
        leagueName: leagueName,
        leagueId: leagueId
    };


    for (var i = 0; i < savedHistory.length; i++) {
        if (savedHistory[i] === leagueId) {
            isOnLocalStorage = true;
            break;
        }
    }
    if (!isOnLocalStorage) {
        savedHistory.push(leagueObject);
    localStorage.setItem("league", JSON.stringify(savedHistory));
    }

}

var deleteCompetition = function () {
    localStorage.setItem("league", "");
} 