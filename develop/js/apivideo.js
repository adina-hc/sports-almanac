// Football videos API
// var competitionVideo = document.querySelector("");
function matchVideosApi (leagueName){
    var apiUrl = "https://www.scorebat.com/video-api/v1/";
    var checkDate = moment();
    var checkSeasonVideos = 0;
    var gameList = document.querySelector("#gameListVideos");
    gameList.textContent = "";
// Fecth test function
fetch(apiUrl)
.then(function (response) {
    if (response.ok) {
        response.json().then(function (data){
            for (var i = 0; i < data.length; i++) {
                var nameComp = data[i].competition.name;
                nameComp = nameComp.split(": ");
                if(nameComp[1] === leagueName) {
                    var dateVideo = moment(data[i].date);
                    
                    if (checkDate.diff(dateVideo, 'days') < 15) {
                        checkSeasonVideos++;
                        var display = document.createElement("div");
                        display.setAttribute("class", "col l10 s12");
                        var videoDiv = document.createElement("div");
                        videoDiv.setAttribute("class", "video-container");
                        videoDiv.setAttribute("style", "margin: 10px 0 10px 0");
                        videoDiv.innerHTML = data[i].embed;
                        display.append(videoDiv);
                        gameList.append(display);
                    }

                }
            }
            if (checkSeasonVideos === 0) {
            
              var h5TitleMatch = document.createElement('h5');
              h5TitleMatch.textContent = "No videos for this Season";
              h5TitleMatch.setAttribute('style', 'text-align:center');
              gameList.append(h5TitleMatch);
          }
        })
    }
})

}
