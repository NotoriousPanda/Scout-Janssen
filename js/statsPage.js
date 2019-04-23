var info = getInfo();

var totalHatches = info["hatchauto"] + info["hatchteleop"];
var totalCargo = info["cargoauto"] + info["cargoteleop"];
var totalHatchPoints = totalHatches * 2;
var totalCargoPoints = totalCargo * 3;
var totalCyclePoints = totalCargoPoints + totalHatchPoints;
var totalAutoPoints = (info["jumpLevel"] * 3) + info["hatchauto"] + info["cargoauto"];
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
var climbAssistPoints = (info["habAssistLevelTwo"] * 6) + (info["habAssistLevelThree"] * 9);
var totalEndgamePoints = climbPoints + climbAssistPoints;
var totalOffensePoints = totalAutoPoints +totalCyclePoints + totalEndgamePoints;
