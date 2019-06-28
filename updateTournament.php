<html>
	<body>
		<?php

			$query = "DROP FROM matches;";
			$password = getenv("DBPASS");
			$database = new mysqli("localhost", "pi", $password, "scout_janssen");
			$key = getenv("AUTHKEY");
			$year = getenv("YEAR");
			if ($database->connect_error) {
				echo "failed to connect";
				exit();
			}
			$database->query($query);
			$option = array('X-TBA-Auth-Key: nGj3OKIzPDXOqAs93AaNHKCZdrKcEXRpxGfl0nvzJyShGmEhVxZzjoHz86UGrolF');
			$teamsGet = curl_init("https://www.thebluealliance.com/api/v3/events/" . $_POST["eventChoice"] . "/teams/keys");
			curl_setopt_array(
				$teamsGet,
				array(
					CURLOPT_HTTPHEADER => $option,
					CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
					CURLOPT_RETURNTRANSFER => true
				)
			);
			$teams = curl_exec($teamsGet);
			curl_close($teamsGet);
			foreach ($teams as &$teamKey) {
				$query = "INSERT INTO eventteams (team, tournament) VALUES ('" . $teamsKey . "', '" . $_POST["eventChoice"] . "');";
				$database->query($query);
			}
			unset($teamKey);
			$matchesGet = curl_init("https://www.thebluealiance.com/api/v3/events/" . $_POST["eventChoice"] . "/matches/simple");
			curl_setopt_array(
                                $matchsGet,
                                array(
                                        CURLOPT_HTTPHEADER => $option,
                                        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
                                        CURLOPT_RETURNTRANSFER => true
                                )
                        );
			$matches = curl_exec($matchesGet);
			curl_close($matchesGet);
			$matches = json_decode($matches, true);
			foreach ($matches as &$match) {
				$query = "INSERT INTO matches (code, comp_level, match_number, set_number, red1, red2, red3, blue4, blue5, blue6) VALUES ('" . $matches["key"] . "', '" . $matches["comp_level"] . "', '" . $matches["match_number"] . "', '" . $matches["set_number"] . "', '" . $matches["alliances"]["red"]["team_keys"][0] . "', '" . $matches["alliances"]["red"]["team_keys"][1] . "', '" . $matches["alliances"]["red"]["team_keys"][2] . "', '" . $matches["alliances"]["blue"]["team_keys"][0] . "', '" . $matches["alliances"]["blue"]["team_keys"][1] . "', '" . $matches["alliances"]["blue"]["team_keys"][2] . "');";
				$database->query($query);
			}
			shell_exec("echo 'SetEnv TOURN " . $_POST["eventChoice"] . "' >> /etc/apache2/apache2.conf");
			shell_exec("systemctl restart apache2");
			echo("Tournament Updated:");
		?>
		<a href="/">Back to main page</a>
	</body>
</html>
