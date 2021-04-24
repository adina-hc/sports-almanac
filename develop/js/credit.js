
/* ****************  Start    Section API 3 Functions           **************** */
var githubUsers = ['adina-hc', 'Sofiacrf', 'AdrianoArmen', 'izaack89'];
var githubListInfo = document.querySelector("#githubListInfo");
var getInfo = document.querySelector("#getInfo");

var setInfoGithub = function () {
  
  // I do a loop for the github names of the team in order to get their info 
  for (var it = 0; it < githubUsers.length;it++) {
      // I get the league ID value so I can use it to set the URL 
      console.log(githubUsers[it]);
      var apiUrl =
        "https://api.github.com/users/" + githubUsers[it];
      
      // I do the fecth and I also add headers to set the token that I get from the API
      fetch(apiUrl).then(function (response) {
        // I check if the API return the 200 status if not it means that there are no data 
        if (response.status == 200) {
          //if the API return 200 status I parse the information to json format
                response.json().then(function (data) {
                console.log(data);
                // I create the elements that will be displayed on the front-end
                var liEl = document.createElement("li");
                var imgEL = document.createElement("img");
                var spanEl = document.createElement("span");
                var pEl = document.createElement("p");
                var aEl = document.createElement("a");
                var updatedDate = moment(data.updated_at).format('DD-MM-YYYY hh:mm:ss');   
                liEl.setAttribute('class', 'collection-item avatar');
                imgEL.setAttribute('class', 'circle');
                imgEL.src = data.avatar_url;
                spanEl.setAttribute('class', 'title');
                if (data.name !== null) {
                  spanEl.textContent = data.name;
                } else {
                  spanEl.textContent = data.login;
                }
                aEl.textContent = "GitHub";
                aEl.href = data.url;
                pEl.textContent = updatedDate;
                liEl.appendChild(imgEL);
                liEl.appendChild(spanEl);
                liEl.appendChild(pEl);
                liEl.appendChild(aEl);
                githubListInfo.append(liEl);
            });
        }
        });
  }

}

/* ****************  End    Section API 3 Functions           **************** */

getInfo.addEventListener('click', setInfoGithub);