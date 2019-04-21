var info = getInfo();

var totalHatches = info["hatchauto"] + info["hatchteleop"];
var totalCargo = info["cargoauto"] + info["cargoteleop"];
var totalHatchPoints = totalHatches * 2;
var totalCargoPoints = totalCargo * 3;
var totalCyclePoints = totalCargoPoints + totalHatchPoints;
var totalAutoPoints = (info["jumpLevel"] * 3) + info["hatchauto"] + info["cargoauto"];
