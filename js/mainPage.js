let event_key = "2019gagr";
let team_key = "";
let teamData = ""
var packet = [];
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
    var matchNumbers = [];
    var blueAllianceKeys = [];
    var redAllianceKeys = [];
    packet = [];
    response.json().then(function(value){
      teamData = value;
      for(i=0; i < teamData.length; i++){
        blueAllianceKeys = [];
        redAllianceKeys = [];
        packet.push([teamData[i].match_number, teamData[i].alliances.blue.team_keys, teamData[i].alliances.red.team_keys], teamData[i].comp_level);
      }
      packet.sort((a, b) => (a[0] > b[0]) ? 1 : -1);
      for(i=0; i < packet.length; i++){ //for each element in packet
        matchNumbers.push(packet[i][0]);
        blueAllianceKeys.push(packet[i][1]);
        redAllianceKeys.push(packet[i][2]);
      }
      for(i=0; i < packet.length; i++){
        let blueA = blueAllianceKeys[i];
        let redA = redAllianceKeys[i];
        for(var xxxtentacion = 0; xxxtentacion < blueA.length; xxxtentacion++){
          blueA[xxxtentacion] = blueA[xxxtentacion].replace("frc", "");
        }
        for(var xxxtentacion = 0; xxxtentacion < redA.length; xxxtentacion++){
          redA[xxxtentacion] = redA[xxxtentacion].replace("frc", "");
        }
        if(packet[i][3] === "qm"){
          createRow("matchqm" + matchNumbers[i]);
          createColumn(matchNumbers[i], "matchqm" + matchNumbers[i]);
          createColumn(blueA[0] + ", " + blueA[1] + ", " + blueA[2], "matchqm" + matchNumbers[i]);
          createColumn(redA[0] + ", " + redA[1] + ", " + redA[2], "matchqm" + matchNumbers[i]);
        }
        if(packet[i][3] === "qf"){
          /*createRow("matchqf" + matchNumbers[i]);
          createColumn(matchNumbers[i], "matchqf" + matchNumbers[i]);
          createColumn(blueA[0] + ", " + blueA[1] + ", " + blueA[2], "matchqf" + matchNumbers[i]);
          createColumn(redA[0] + ", " + redA[1] + ", " + redA[2], "matchqf" + matchNumbers[i]);*/
        }
        else{
          console.log(teamData[i].comp_level)
        }
      }

    })
    createRow("Matches");
    createHead("Match:", "Matches");
    createHead("Blue Teams:", "Matches");
    createHead("Red Teams:", "Matches");
    createHead("Scores:", "Matches");
    createHead("Match Time:", "Matches");
  });

  function createRow(id=""){
    let tr = document.createElement("tr");
    tr.appendChild(document.createTextNode(""));
    document.getElementById("TBATable").appendChild(tr);
    tr.id = id;
  }
  function createColumn(data, row, id=""){
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(data));
    document.getElementById(row).appendChild(td);
  }
  function createHead(data, row, id=""){
    let th = document.createElement("th");
    th.appendChild(document.createTextNode(data));
    document.getElementById(row).appendChild(th);
  }
}
go();
