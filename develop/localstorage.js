//Save on local storage
var saveCompetition = function(leagueId) {
    var savedHistory = JSON.parse(localStorage.getItem("league")) || [];
    var isOnLocalStorage = false;

    for (var i = 0; i < savedHistory.length; i++) {
        if (savedHistory[i] === leagueId) {
            isOnLocalStorage = true;
            break;
        }
    }
    if (!isOnLocalStorage) {
        savedHistory.push(leagueId);
    localStorage.setItem("league", JSON.stringify(savedHistory));
    }

}
