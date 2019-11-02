let event_key = "2019gagr";
event_key = "2019gal";
let teams = [];
let teamData = ""
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

  rqAPI('https://www.thebluealliance.com/api/v3/event/' + event_key + "/teams", function() {
    response.json().then(function(value){
      teamData = value;
      for(i=0; i < teamData.length; i++){
        number = teamData[i].team_number;
        name = ("Team " + teamData[i].team_number + ", " + teamData[i].nickname);
        teams.push(teamData[i].team_number);
        createRow("team" + number);
        createColumn(name, "team" + number);
      }
    })
    createRow("Teams");
    createHead("Teams:", "Teams");
    //createRow("teams");
  });

  rqAPI('https://www.thebluealliance.com/api/v3/event/' + event_key + '/teams/statuses', function() {
    response.json().then(function(value){
      teamData = value;
      console.log(teamData)
      for(i=0; i < 67; i++){
        let data = teamData["frc" + teams[i]]
        console.log()
        createColumn("Qualifier Ranking: " + data.qual.ranking.rank, ("team" + teams[i]));
        createBreak("team" + teams[i])
      }
    });
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
  function createBreak(row){
    let th = document.createElement("br");
    document.getElementById(row).appendChild(th);
  }
}
go();
