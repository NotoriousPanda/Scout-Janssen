<html>
	<body>
		<?php
		
			function sanitize($data) {
			  $data = trim($data);
			  $data = stripslashes($data);
			  $data = htmlspecialchars($data);
			  return $data;
			}
			
			$HA = sanitize($_POST["hatchauto"]);
			$CA = sanitize($_POST["cargoauto"]);
			$HT = sanitize($_POST["hatchteleop"]);
			$CT = sanitize($_POST["cargoteleop"]);
			$jumpLevel = sanitize($_POST["jumpLevel"]);
			$timeOnDefense = sanitize($_POST["timeOnDefense"]);
			$timeOnBot1 = sanitize($_POST["timeOnBot1"]);
			$timeOnBot2 = sanitize($_POST["timeOnBot2"]);
			$timeOnBot3 = sanitize($_POST["timeOnBot3"]);
			$climbLevel = sanitize($_POST["climbLevel"]);
			$timeBroke = sanitize($_POST["timeBroke"]);
			$habAssistLevel2 = sanitize($_POST["habAssistLevel2"]);
			$habAssistLevel3 = sanitize($_POST["habAssistLevel3"]);
			$mechanicalIssues = sanitize($_POST["mechanicalIssues"]);
			$connectionIssues = sanitize($_POST["connectionIssues"]);
			$position = sanitize($_POST["position"]);
			$matchNumber = sanitize($_POST["matchNumber"]);
			$setNumber = sanitize($_POST["setNumber"]);
			$compLevel = sanitize($_POST["compLevel"]); //qm, ef, qf, sf, f  
			$notes = sanitize($_POST["notes"]);
			$currentTournament = $_ENV["currentTournament"];
			$currentYear = $_ENV["currentYear"];
			
			$autoPoints = $HA * 2 + $CA * 3 + $jumpLevel * 3;
			$teleopPoints = $HT * 2 + $CT * 2;
			$endgamePoints = $habAssistLevel2 * 3 + $habAssistLevel3 * 9 + 3 * (2 ** ($habClimb - 1));
			
			$servername = "localhost";
			$username = "root";
			$password = $_ENV["databasePassword"];
			
			$dbconn = new mysqli($servername, $username, $password, "scout_janssen");
			
			if ($dbconn->connect_error) {
				die("Connection to database failed" . $conn->connect_error);
			}
			
			$query = "SELECT number FROM matches m INNER JOIN teams tt ON m.team{$position} = tt.key WHERE m.key = '{$currentYear}