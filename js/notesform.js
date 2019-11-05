let timerCount = 0;

let event_key = "2019gagr";
let team_key = "";
let teamData = ""
var packet = [];
var select = "qm"
var match = 0;
let matchData;
var team = 4026;
var set = 1;
let alliances = []
let globalVal = []
//Whenever typeOfMatch changes, a new array needs to be created and sorted with the setinterval using its values instead
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
    await rqAPI('https://www.thebluealliance.com/api/v3/event/' + event_key + '/matches', function() {
        response.json().then(function (value) {
            value = (checkSelect(value, select));
            value.sort((a, b) => (a.match_number > b.match_number) ? 1 : -1);
            globalVal = value;
                //Sorts out values not equal to type of match then sorts by number^
            setInterval(function () {
                for (i = 0; i < value.length; i++) {
                    changeForm(value[i]); //function that makes matchdata exist
                }
            }, 100);
    })
  });
}
go();

function checkMatch() {
    if (document.getElementsByName("matchNumber").length);
    document.getElementsByName("matchNumber")[0].addEventListener('input', function () {
        if (match < globalVal.length) {
            match = this.value;
        }
        else {
            
        }
    });
   
}


function checkTeam() {
    if (document.getElementsByName("teamNumber").length) {
        document.getElementsByName("teamNumber")[0].addEventListener('input', function () {
            team = this.value;
        });
    }
}

function checkSet() {
    if (document.getElementsByName("setNumber").length) {
        document.getElementsByName("setNumber")[0].addEventListener('input', function () {
            set = this.value;
        });
    }
}

function checkTypeOfMatch() {
    if (document.getElementsByName("compLevel").length) {
        clearInterval(checkTypeOfMatch);
        document.getElementsByName("compLevel")[0].addEventListener('input', function () {
            select = this.value;
            console.log(select)
        });
    }
}

function changeForm(val) {
    checkMatch();
    checkTeam();
    checkSet();
    checkTypeOfMatch();
    if (val.match_number == match && val.set_number == set) {
        changeBotPos()
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
        y = document.getElementById("setNumber");
        team = x.options[x.selectedIndex].value;
        set = y.value;
        changeBotPos()
    }
}


function changeBotPos() {
    for (i = 0; i < alliances.length; i++) {
        if (alliances[i] == team) {
            var botpos = document.getElementById("botpos");
            botpos.value = i + 1;
        }
    }
}


function checkSelect(value, select) {
    var newArr = []
    for (i = 0; i < value.length; i++) {
        if (select == value[i].comp_level) {
            newArr.push(value[i])
        }
        if (i === value.length - 1) {
            return newArr;
        }
    }
}