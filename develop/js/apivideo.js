// Football videos API
// var competitionVideo = document.querySelector("");
function matchVideosApi (leagueName){
    var apiUrl = "https://www.scorebat.com/video-api/v1/";
    var checkDate = moment();

// Fecth test function
fetch(apiUrl)
.then(function (response) {
    if (response.ok) {
        response.json().then(function (data){
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var nameComp = data[i].competition.name;
                nameComp = nameComp.split(": ");


                if(nameComp[1] === leagueName) {
                    var dateVideo = moment(data[i].date);
                    
                    if (checkDate.diff(dateVideo, 'days') < 15) {
                        // creacion de div para el display
                    }

                }
            }
        })
    }
})

}
