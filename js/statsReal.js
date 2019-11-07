
//Takes one bot's match
function calcBotUnreliantMatch(info){

    info.totalHatches = info["HA"] + info["HT"];
    info.totalCargo = info["CA"] + info["CT"];
    info.totalHatchPoints = info.totalHatches * 2;
    info.totalCargoPoints = info.totalCargo * 3;
    info.totalCyclePoints = (info["HT"] * 2) + (info["CT"]);
    info.totalAutoPoints = (info["jumpLevel"] * 3) + (info["HA"] * 2) + (info["CA"] * 3);
    info.climbPoints;
    switch(info["climbLevel"]){
      case 0:
        info.climbPoints = 0;
        break;
      case 1:
        info.climbPoints = 3;
        break;
      case 2:
        info.climbPoints = 6;
        break;
      case 3:
        info.climbPoints = 12;
        break;
    }
    info.climbAssistPoints = (info["habAssistLevel2"] * 3) + (info["habAssistLevel3"] * 9);
    info.totalEndgamePoints = info.climbPoints + info.climbAssistPoints;
    info.totalOffensePoints = info.totalAutoPoints + info.totalCyclePoints + info.totalEndgamePoints;
  
    return info;
  }
  
  function getBotsInMatch(reports, matchNum){
    var newReports = [];
    for(i in reports){
      if(i.matchNumber == matchNum){
        newReports.push(i);
      }
    }
  
    return newReports;
  }
  
  function calcBotReliantOnMatchBots(info){
    info.defensePointsBotFour = info["botFour"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotOne"] - info["botFour"]["timeInable"]);
    info.defensePointsBotFive = info["botFive"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotTwo"] - info["botFive"]["timeInable"]);
    info.defensePointsBotSix = info["botSix"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotThree"] - info["botSix"]["timeInable"]);
  
    info.totalDefensePoints = info.defensePointsBotFive + info.defensePointsBotFour + info.defensePointsBotSix;
  
    info.netOffensePoints = info.totalOffensePoints - info.offensePenalties;
  
    info.netDefensePoints = info.netDefensePoints - info.defensePenalties;
  
    //TODO: duress + points given
  
    info.totalContribution = info.totalOffensePoints + info.totalDefensePoints;
  
    info.netContribution = info.netDefensePoints + info.netOffensePoints;
  }
  
  //Takes array of variables, replaces ? with them
  function average(variables, s){
    var sum = 0;
    for(i of variables){
      sum += eval(s.replace("?", i));
    }
  
    sum /= variables.length;
  }
  
  //Takes one bot's all matches as info
  function getAllAverageDataOnBot(info){
    var keys = Object.keys(info);
    var subKeys = Object.keys(info[keys[0]]);
    for(var i = 0; i < Object.entries(info[keys[0]]).length; i++){
      var variables = [];
      for(var j = 0; j < Object.entries(info).length; j++){
        variables[j] = info[keys[i]][subKeys[j]];
      }
      info[keys.length] = [];
      info[keys.length][subKeys[i] + "Average"] = average(variables, "?");
    }
  
    return info;
  }
  
  //Takes one bot's match
  function calcBotReliantMatch(info){
  
  }
  
  async function getReports(){
    return (await fetch("http://71.204.66.21/printDB.php/?table=reports")).json();
  }
  
  async function run(){
    var reports = await getReports();
    
  }
  
  function getReportsOfOneBot(teamNum, reports){
    var rep = [];
    for(i of reports){
      if(i.teamNumber == teamNum){
        rep.push(i);
      }
    }
  
    return rep;
  }
  
  function calcBotStuffReliantOnTeams(info){
    info.defensePointsBotFour = info["botFour"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotOne"] - info["botFour"]["timeInable"]);
    info.defensePointsBotFive = info["botFive"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotTwo"] - info["botFive"]["timeInable"]);
    info.defensePointsBotSix = info["botSix"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotThree"] - info["botSix"]["timeInable"]);
  
    info.totalDefensePoints = info.defensePointsBotFive + info.defensePointsBotFour + info.defensePointsBotSix;
  
    info.netOffensePoints = info.totalOffensePoints - info.offensePenalties;
  
    info.netDefensePoints = info.netDefensePoints - info.defensePenalties;
  
    info.totalContribution = info.totalOffensePoints + info.totalDefensePoints;
  
    info.netContribution = info.netDefensePoints + info.netOffensePoints;
  
    return info;
  }
  
  //TODO: duress + points given