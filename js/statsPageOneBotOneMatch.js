var info = getInfo();

var totalHatches = info["hatchauto"] + info["hatchteleop"];
var totalCargo = info["cargoauto"] + info["cargoteleop"];
var totalHatchPoints = totalHatches * 2;
var totalCargoPoints = totalCargo * 3;
var totalCyclePoints = (info["hatchteleop"] * 2) + (info["cargoteleop"]);
var totalAutoPoints = (info["jumpLevel"] * 3) + (info["hatchauto"] * 2) + (info["cargoauto"] * 3);
var climbPoints;
switch(info["climbLevel"]){
  case 0:
    climbPoints = 0;
    break;
  case 1:
    climbPoints = 3;
    break;
  case 2:
    climbPoints = 6;
    break;
  case 3:
    climbPoints = 12;
    break;
}
var climbAssistPoints = (info["habAssistLevelTwo"] * 3) + (info["habAssistLevelThree"] * 9);
var totalEndgamePoints = climbPoints + climbAssistPoints;
var totalOffensePoints = totalAutoPoints + totalCyclePoints + totalEndgamePoints;

var defensePointsBotFour = info["botFour"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotOne"] - info["botFour"]["timeInable"]);
var defensePointsBotFive = info["botFive"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotTwo"] - info["botFive"]["timeInable"]);
var defensePointsBotSix = info["botSix"]["totalCyclePoints"]  * 115 / (115 - info["defTimeOnBotThree"] - info["botSix"]["timeInable"]);
