
<html>
	<body>
		<?php

			function sanitize($data) {
			  $data = trim($data);
			  $data = stripslashes($data);
			  $data = htmlspecialchars($data);
			  return $data;
			}
			$jumpLevel = sanitize($_POST["jumpLevel"]);
			$HA = sanitize($_POST["HA"]);
			$HAM = sanitaize($_POST["HAM"]);
			$CA = sanitize($_POST["CA"]);
			$CAM = sanitaize($_POST["CAM"]);
			$HT = sanitize($_POST["HT"]);
			$HTM = sanitaize($_POST["HTM"]);
			$CT = sanitize($_POST["CT"]);
			$CTM = sanitaize($_POST["CTM"]);
			if (isset($_POST["highCargo"])) {
				$highCargo = "true";
			} else {
				$highCargo = "false";
			}
			if (isset($_POST["highHatch"])) {
				$highHatch = "true";
			} else {
				$highHatch = "false";
			}
			$timeOnDefense = sanitize($_POST["timeOnDefense"]);
			$timeOnBot1 = sanitize($_POST["timeOnBot1"]);
			$timeOnBot2 = sanitize($_POST["timeOnBot2"]);
			$timeOnBot3 = sanitize($_POST["timeOnBot3"]);
			$climbLevel = sanitize($_POST["climbLevel"]);
			$timeBroke = sanitize($_POST["timeBroke"]);
			$habAssistLevel2 = sanitize($_POST["habAssistLevel2"]);
			$habAssistLevel3 = sanitize($_POST["habAssistLevel3"]);
			if (isset($_POST["mechanicalIssues"])) {
				$mechanicalIssues = "true";
			} else {
				$mechanicalIssues = "false";
			}
			if (isset($_POST["connectionIssues"])) {
				$connectionIssues = "true";
			} else {
				$connectionIssues = "false";
			}
			$position = sanitize($_POST["position"]);
			$teamNumber = sanitize($_POST["teamNumber"]);
			$matchNumber = sanitize($_POST["matchNumber"]);
			$setNumber = sanitize($_POST["setNumber"]);
			$compLevel = sanitize($_POST["compLevel"]); //qm, ef, qf, sf, f
			$notes = sanitize($_POST["notes"]);
			$offensivePenalties = sanitize($_POST["offensivePenalties"]);
			$defensivePenalties = sanitize($_POST["defensivePenalties"]);



			$servername = "localhost";
			$username = "root";
			$password = $_ENV["databasePassword"];

			$dbconn = new mysqli($servername, $username, $password, "scout_janssen");

			if ($dbconn->connect_error) {
				die("Connection to database failed" . $conn->connect_error);
			}

			$query = "INSERT INTO reports (jumpLevel, HA, CA, HT, CT, highCargo, highHatch, timeOnDefense, timeOnBot1, timeOnBot2, timeOnBot3, climbLevel, timeBroke, habAssistLevel2, habAssistLevel3, mechanicalIssues, connectionIssues, position, teamNumber, matchNumber, setNumber, compLevel, notes, offensivePenalties, defensivePenalties, HAM, CAM, HTM, CTM)
			VALUES (" . $jumpLevel .", " . $HA . ", " . $HT . ", " . $CT . ", '" . $highCargo . "', '" . $highHatch . "', " . $timeOnDefense . ", " . $timeOnBot1 . ", " . $timeOnBot2 . ", " . $timeOnBot3 . ", " . $climbLevel . ", " . $timeBroke . ", " . $habAssistLevel2 . ", " . $habAssistLevel3 . ", '" . $mechanicalIssues . "', '" . $connectionIssues . "', " . $position . ", " . $teamNumber . ", " . $matchNumber . ", " . $setNumber . ", '" . $compLevel . "', '" . $notes . "', " . $offensivePenalties . ", " . $defensivePenalties . ", " . $HAM . ", " . $CAM . ", " . $HTM . ", " . $CTM . ");");
			$dbconn->query($query);
