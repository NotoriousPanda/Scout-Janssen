
<html>
	<body>
		<?php

			function sanitize($data) {
			  $data = trim($data);
			  $data = stripslashes($data);
			  $data = htmlspecialchars($data);
			  return $data;
			}
			function console_log( $data ){
			  echo '<script>';
			  echo 'console.log('. json_encode( $data ) .')';
			  echo '</script>';
			}
			$jumpLevel = sanitize($_POST["jumpLevel"]);
			console_log("Got to jumpLevel");
			$HA = sanitize($_POST["HA"]);
			console_log("Got to HA");
			$HAM = sanitaize($_POST["HAM"]);
			console_log("Got to HAM");
			$CA = sanitize($_POST["CA"]);
			console_log("Got to CA");
			$CAM = sanitaize($_POST["CAM"]);
			console_log("Got to CAM");
			$HT = sanitize($_POST["HT"]);
			console_log("Got to HT");
			$HTM = sanitaize($_POST["HTM"]);
			console_log("Got to HTM");
			$CT = sanitize($_POST["CT"]);
			console_log("Got to CT");
			$CTM = sanitaize($_POST["CTM"]);
			console_log("Got to CTM");
			if (isset($_POST["highCargo"])) {
				$highCargo = "true";
			} else {
				$highCargo = "false";
			}
			console_log("Got to highCargo");
			if (isset($_POST["highHatch"])) {
				$highHatch = "true";
			} else {
				$highHatch = "false";
			}
			console_log("Got to highHatch");
			$timeOnDefense = sanitize($_POST["timeOnDefense"]);
			console_log("Got to timeOnDefense");
			$timeOnBot1 = sanitize($_POST["timeOnBot1"]);
			console_log("Got to timeOnBot1");
			$timeOnBot2 = sanitize($_POST["timeOnBot2"]);
			console_log("Got to timeOnBot2");
			$timeOnBot3 = sanitize($_POST["timeOnBot3"]);
			console_log("Got to timeOnBot3");
			$climbLevel = sanitize($_POST["climbLevel"]);
			console_log("Got to climbLevel");
			$timeBroke = sanitize($_POST["timeBroke"]);
			console_log("Got to timeBroke");
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