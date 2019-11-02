
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
			echo("Got to jumpLevel");
			$HA = sanitize($_POST["HA"]);
			echo("Got to HA");
			$HAM = sanitaize($_POST["HAM"]);
			echo("Got to HAM");
			$CA = sanitize($_POST["CA"]);
			echo("Got to CA");
			$CAM = sanitaize($_POST["CAM"]);
			echo("Got to CAM");
			$HT = sanitize($_POST["HT"]);
			echo("Got to HT");
			$HTM = sanitaize($_POST["HTM"]);
			echo("Got to HTM");
			$CT = sanitize($_POST["CT"]);
			echo("Got to CT");
			$CTM = sanitaize($_POST["CTM"]);
			echo("Got to CTM");
			if (isset($_POST["highCargo"])) {
				$highCargo = "true";
			} else {
				$highCargo = "false";
			}
			echo("Got to highCargo");
			if (isset($_POST["highHatch"])) {
				$highHatch = "true";
			} else {
				$highHatch = "false";
			}
			echo("Got to highHatch");
			$timeOnDefense = sanitize($_POST["timeOnDefense"]);
			echo("Got to timeOnDefense");
			$timeOnBot1 = sanitize($_POST["timeOnBot1"]);
			echo("Got to timeOnBot1");
			$timeOnBot2 = sanitize($_POST["timeOnBot2"]);
			echo("Got to timeOnBot2");
			$timeOnBot3 = sanitize($_POST["timeOnBot3"]);
			echo("Got to timeOnBot3");
			$climbLevel = sanitize($_POST["climbLevel"]);
			echo("Got to climbLevel");
			$timeBroke = sanitize($_POST["timeBroke"]);
			echo("Got to timeBroke");
			$climbAssistCount = sanitize($_POST["climbAssistCount"]);
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

			$query = "INSERT INTO reports (jumpLevel, HA, CA, HT, CT, highCargo, highHatch, timeOnDefense, timeOnBot1, timeOnBot2, timeOnBot3, climbLevel, timeBroke, mechanicalIssues, connectionIssues, position, teamNumber, matchNumber, setNumber, compLevel, notes, offensivePenalties, defensivePenalties, HAM, CAM, HTM, CTM, climbAssistCount)
			VALUES (" . $jumpLevel .", " . $HA . ", " . $HT . ", " . $CT . ", '" . $highCargo . "', '" . $highHatch . "', " . $timeOnDefense . ", " . $timeOnBot1 . ", " . $timeOnBot2 . ", " . $timeOnBot3 . ", " . $climbLevel . ", " . $timeBroke . ", '" . $mechanicalIssues . "', '" . $connectionIssues . "', " . $position . ", " . $teamNumber . ", " . $matchNumber . ", " . $setNumber . ", '" . $compLevel . "', '" . $notes . "', " . $offensivePenalties . ", " . $defensivePenalties . ", " . $HAM . ", " . $CAM . ", " . $HTM . ", " . $CTM . ", " . $climbAssistCount . ");");
			$dbconn->query($query);
		?>
	</body>
</html>