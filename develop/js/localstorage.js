//Save on local storage
var saveCompetition = function(leagueId, leagueName) {
    
    var isOnLocalStorage = false;
    var leagueObject = {
        leagueName: leagueName,
        leagueId: leagueId
    };


    for (var i = 0; i < savedHistory.length; i++) {
        if (savedHistory[i].leagueId === leagueId) {
            isOnLocalStorage = true;
            break;
        }
    }
    if (!isOnLocalStorage) {
        savedHistory.push(leagueObject);
        localStorage.setItem("league", JSON.stringify(savedHistory));
        generateBtn(leagueId,leagueName) 
    }

}

var deleteCompetition = function () {
    localStorage.setItem("league", "");
} 