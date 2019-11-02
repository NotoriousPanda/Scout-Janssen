function calcBot(info){

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
}

function average(variables, s){
  for(i of variables){
    eval(s.replace("?", i));
  }
}

function getAllAverageDataOnBot(info){
  var bot = {};
  for(i of info){
    for(j of i){
      
    }
  }
}

