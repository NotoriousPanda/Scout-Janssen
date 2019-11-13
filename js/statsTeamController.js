function getTeamNum(){
    return location.href.substring(location.href.indexOf("#") + 1);
}

async function run(){
    if(!(1 * getTeamNum() > 0)){
        document.write("Error! Yell at Keon.");
    }
    var reports = await getReports();
    reportsOfTeam = getReportsOfOneBot(getTeamNum(), reports);
    var varNames = Object.keys(reportsOfTeam[0]);
    var varNamesToDisplay = "";
    for(i of varNames){
        varNamesToDisplay += i + "<br>";
    }
    document.getElementById("varnamelist").innerHTML += varNamesToDisplay;
}

run();