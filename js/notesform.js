let event_key = "2019gagr";
let team_key = "";
let teamData = ""
var packet = [];
var select = "qm"
var match = 0;
let matchData;
var team = 4026;
async function go() {
  //headers
  const headers = new Headers();
  headers.append('X-TBA-Auth-Key', 'qg4OFGslC8z4zpEdaR8qPA79OUCBCi6dpE1tWLDEZqHARJLhu1GL7s8Aqq84vvJP')
  const init = {
    method: 'GET',
    headers: headers,
  }
  //Create request w/ url and function
  async function rqAPI(url, func){
    const request = new Request(url, init)
      response = await fetch(request);
    func();
  }
  rqAPI('https://www.thebluealliance.com/api/v3/event/' + event_key + "/matches", function() {
    response.json().then(function(value){
        for (i = 0; i < value.length; i++){
            value = (checkSelect(value, select));
            value.sort((a, b) => (a.match_number > b.match_number) ? 1 : -1);
            //Sorts out values not equal to type of match ^
        }
        for (i = 0; i < value.length; i++) {
            checkExist(value[i]); //function that makes matchdata exist
            //document.getElementById("botpos").value = 
        }
    })
  });
}
go();
function checkExist(val) {
    setInterval(function () {
        if (document.getElementsByName("matchNumber").length) {
            clearInterval(checkExist);
            document.getElementsByName("matchNumber")[0].addEventListener('input', function () {
                if (match != this.value) {
                }
                match = this.value;
                if (val.match_number == match) {
                    matchData = val;
                    var alliances = matchData.alliances.red.team_keys.concat(matchData.alliances.blue.team_keys); //Concat. Blue then red.
                    for (i = 0; i < alliances.length; i++) {
                        alliances[i] = alliances[i].replace("frc", "");
                        if (alliances[i] == team) {
                            var botpos = document.getElementById("botpos");
                            botpos.value = i + 1;
                            //botpos.setAttribute("value", i + 1);
                        }
                    }
                }
            });
        }
    }, 100);


    setInterval(function () {
        if (document.getElementsByName("teamNumber").length) {
            clearInterval(checkExist);
            document.getElementsByName("teamNumber")[0].addEventListener('input', function () {
                if (team != this.value) {
                }
                team = this.value;
            });
        }
    }, 100);
}
/*setInterval(function () {
    checkMatchNumber();
}, 100)

function checkMatchNumber() {
    if (document.getElementById("matchNumber") = )
}*/




function checkSelect(value, select) {
    var counter = 0;
    if ((value[i].comp_level != select)) {
        value.splice(i, 1);
        if (value[i].comp_level != select) {
            checkSelect(value, select);
        }
    }
    for (x = 0; x < value.length; i++) {
        if (value[x].comp_level != select) {
            break
        }
        else {
            counter++;
        }
        if (counter == value.length) {
            return value;
        }
    }

}