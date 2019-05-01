<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $notes = sanitize($_POST["notes"]);
  $CA = sanitize($_POST["cargoAuto"]);
  $HA = sanitize($_POST["hatchAuto"]);
  $CT = sanitize($_POST["cargoTeleop"]);
  $HT = sanitize($_POST["hatchTeleop"]);
  $ClimbL = sanitize($_POST["climbLevel"]);
  $ClimbA = sanitize($_POST["climbAssist"]);

  echo "<h2>Form submitted</h2>";
}

function sanitize($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
