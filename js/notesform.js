let event_key = "2019gagr";
let team_key = "";
let teamData = ""
var packet = [];
var select = "qf"
var match = 0;
let matchData;
var team = 4026;
let alliances = []
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
        value = (checkSelect(value, select));
        console.log(value)
        value.sort((a, b) => (a.match_number > b.match_number) ? 1 : -1);
            //Sorts out values not equal to type of match then sorts by number^
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
                    alliances = matchData.alliances.red.team_keys.concat(matchData.alliances.blue.team_keys); //Concat. Blue then red.
                    for (i = 0; i < alliances.length; i++) {
                        alliances[i] = alliances[i].replace("frc", "");
                    }
                    for (w = 0; w < alliances.length; w++) {
                        e = document.getElementById("team" + (w + 1));
                        e.value = alliances[w];
                        if (!e.hasChildNodes()) {
                            e.appendChild(document.createTextNode(alliances[w]));
                        }
                        e.replaceChild(document.createTextNode(alliances[w]), e.childNodes[0]);
                    }
                    x = document.getElementById("teamNumber");
                    team = x.options[x.selectedIndex].value;
                    changeBotPos()
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
                changeBotPos()
            });
        }
    }, 100);
}
function checkTypeOfMatch() {
    setInterval(function () {
        if (document.getElementsByName("compLevel").length) {
            clearInterval(checkTypeOfMatch);
            document.getElementsByName("compLevel")[0].addEventListener('input', function () {
                select = this.value;
                changeBotPos()
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

function changeBotPos() {
    console.log(alliances[1])
    for (i = 0; i < alliances.length; i++) {
        //console.log(team)
        if (alliances[i] == team) {
            var botpos = document.getElementById("botpos");
            botpos.value = i + 1;
            console.log(alliances)
            //botpos.setAttribute("value", i + 1);
        }
    }
}
//select = document.getElementsByName("compLevel").options[document.getElementsByName("compLevel").selectedIndex].value;

/*function checkSelect(value, select) {
    for (h = 0; h < value.length; h++) {
        var counter = 0;
        console.log(value)
        if ((value[h].comp_level != select)) {
            value.splice(h, 1); //splicing out data that isnt select
            if (value[h].comp_level != select) {
                checkSelect(value, select);
            }
        }
        else {
        }
        for (x = 0; x < value.length; x++) {
            if (value[x].comp_level != select) {
                break;
            }
            else {
                counter++;
            }
            if (counter == value.length) { //check if # of values is equal to # of values that are of type select
                return value;
            }
        }
    }
}*/
function checkSelect(value, select) {
    var counter = 0;
    for (i = 0; i < value.length; i++) {
        if (select == value[i].comp_level) {
            counter++;
        }
        else {
            value.splice(i, 1);
            checkSelect(value, select);
        }
    }
    if (counter == value.length) {
        //console.log(value)
        return value;
    }

    else {
        checkSelect(value, select);
        changeBotPos()
    }
}