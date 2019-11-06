let event_key = "2019gagr";
let team_key = "";
let teamData = ""
let select = "qm"
var match = 0;
let prevMatch = 0;
let matchData;
let team = 4026;
let set = 1;
let alliances = []
let globalVal = []
let change = false;
let ogMatchData;
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
            ogMatchData = value;
            startCheck()
            sortData(value);
            //Sorts out values not equal to type of match then sorts by number^
    })
  });
}
go();

function sortData(val) {
    value = (checkSelect(val, select));
    value.sort((a, b) => (a.match_number > b.match_number) ? 1 : -1);
    globalVal = value;
    dataWarning = new Warning("WARNING: No data in this type of match")
    if (globalVal.length == 0) {
        console.log("No data in this match")
        dataWarning.create();
    }
    else {
        dataWarning.remove();
    }
}

function Warning(text) {
    this.text = text;
    this.element = document.createElement("p");
    this.node = document.createTextNode(this.text);
    this.parent = document.getElementById("warnings");

    this.create = function () {
        this.element.appendChild(this.node);
        this.parent.appendChild(this.element);
        this.created = true;
    }

    this.remove = function () {
        this.parent.removeChild(this.node);
    }


}

function startCheck() {
    var m = setInterval(function () {
        if (document.getElementsByName("matchNumber").length) {
            document.getElementsByName("matchNumber")[0].addEventListener('input', function () {
                if (match < globalVal.length) {
                    prevMatch = match;
                    match = this.value;
                    changeDataLoop();
                }
                else {
                    warning("WARNING: Match does not exist")
                }
            });
            clearInterval(m);
        }
    }, 100);
    var t = setInterval(function () {
        if (document.getElementsByName("teamNumber").length) {
            document.getElementsByName("teamNumber")[0].addEventListener('input', function () {
                team = this.value;
                changeDataLoop()
            });
            clearInterval(t);
        }
    }, 100);
    var s = setInterval(function () {
        if (document.getElementsByName("setNumber").length) {
            document.getElementsByName("setNumber")[0].addEventListener('input', function () {
                set = this.value;
                changeDataLoop()
            });
            clearInterval(s);
        }
    }, 100);
    var cl = setInterval(function () {
        if (document.getElementsByName("compLevel").length) {
            document.getElementsByName("compLevel")[0].addEventListener('input', function () {
                select = this.value;
                sortData(ogMatchData);
                changeDataLoop()
            });
            clearInterval(cl);
        }
    }, 100);
}

function changeDataLoop() {
    for (i = 0; i < globalVal.length; i++) {
        changeForm(globalVal[i]); //function that makes matchdata exist
    }
}


function changeForm(val) {
    console.log("change form called")
    if (val.match_number == match && val.set_number == set) {
        matchData = val;
        alliances = matchData.alliances.red.team_keys.concat(matchData.alliances.blue.team_keys); //Concat. Blue then red.
        for (var i = 0; i < alliances.length; i++) {
            alliances[i] = alliances[i].replace("frc", "");
        }
        for (var i = 0; i < alliances.length; i++) {
            e = document.getElementById("team" + (i + 1));
            e.value = alliances[i];
            if (!e.hasChildNodes()) {
                e.appendChild(document.createTextNode(alliances[i]));
            }
            e.replaceChild(document.createTextNode(alliances[i]), e.childNodes[0]);
        }
        
        x = document.getElementById("teamNumber");
        y = document.getElementById("setNumber");
        team = x.options[x.selectedIndex].value;
        set = y.value;
        changeBotPos();
    }
}


function changeBotPos() {
    console.log("Change bot called")
    for (var i = 0; i < alliances.length; i++) {
        if (alliances[i] == team) {
            var botpos = document.getElementById("botpos");
            botpos.value = i + 1;
        }
    }
}


function checkSelect(value, select) {
    console.log("Check select called")
    var newArr = []
    for (var i = 0; i < value.length; i++) {
        if (select == value[i].comp_level) {
            newArr.push(value[i])
        }
        if (i === value.length - 1) {
            return newArr;
        }
    }
}