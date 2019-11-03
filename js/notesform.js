let event_key = "2019gagr";
let team_key = "";
let teamData = ""
var packet = [];
var select = "qm"
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
      for(i=0; i < value.length; i++){
        if(select === "qm"){
          if(value[i].comp_level != select){
            console.log(value[i].comp_level)
            value.splice(i, 1);
            console.log(value)
          }
          else{
            //console.log(value[i].comp_level)
          }
          value.sort((a, b) => (a.match_number > b.match_number) ? 1 : -1);
          //console.log(value)
        }
      }
    })
  });
}
go();
