
//Takes one bot's match
function calcBotUnreliant(info){

  info.totalHatches = info["HA"] + info["HT"];
  info.totalCargo = info["CA"] + info["CT"];
  info.totalHatchPoints = info.totalHatches * 2;
  info.totalCargoPoints = info.totalCargo * 3;
  info.totalCyclePoints = (info["hatchTeleop"] * 2) + (info["cargoTeleop"]);
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

  info.defensePointsBotFour = info["botFour"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotOne"] - info["botFour"]["timeInable"]);
  info.defensePointsBotFive = info["botFive"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotTwo"] - info["botFive"]["timeInable"]);
  info.defensePointsBotSix = info["botSix"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotThree"] - info["botSix"]["timeInable"]);

  info.totalDefensePoints = info.defensePointsBotFive + info.defensePointsBotFour + info.defensePointsBotSix;

  info.netOffensePoints = info.totalOffensePoints - info.offensePenalties;

  info.netDefensePoints = info.netDefensePoints - info.defensePenalties;

  //TODO: duress + points given

  info.totalContribution = info.totalOffensePoints + info.totalDefensePoints;

  info.netContribution = info.netDefensePoints + info.netOffensePoints;

  return info;
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
  //var bot = {};
  var keys = Object.keys(info);
  var subKeys = Object.keys(info[keys[0]]);
  for(var i = 0; i < Object.entries(info[keys[0]]).length; i++){
    var variables = [];
    for(var j = 0; j < Object.entries(info).length; j++){
      variables[j] = info[keys[i]][subKeys[j]];
    }
    info[keys.length][subKeys[i] + "Average"] = average(variables, "?");
  }

  return info;
}

