<?php
	$query = "DELTE FROM districts; DELETE FROM events;";
	$user = "pi";
	$password = "sm4llp0tst0ck";
	$database = new mysqli("localhost", $user, $password, "scout_janssen");
	if ($database->connect_error) {
		die("Connection failed: " . $database->connect_error);
	}
	$database->query($query);
	$statusGet = curl_init("https://www.thebluealliance.com/api/v3/status");
	$option = array('X-TBA-Auth-Key: nGj3OKIzPDXOqAs93AaNHKCZdrKcEXRpxGfl0nvzJyShGmEhVxZzjoHz86UGrolF');
	curl_setopt_array(
		$statusGet,
		array(
			CURLOPT_HTTPHEADER => $option,
			CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
			CURLOPT_RETURNTRANSFER => true
		)
	);
	$tbaStatus = curl_exec($statusGet);
	curl_close($statusGet);
	$tbaStatus = json_decode($tbaStatus, true);
	$year = $tbaStatus["current_season"];
	$command = "echo 'year={$year}' | sudo tee -a /etc/environment && source /etc/environment";
	shell_exec($command);
	/*$districtsGet = curl_init("https://www.thebluealliance.com/api/v3/districts/{$year}");
	curl_setopt_array(
		$districtsGet,
		array(
			CURLOPT_HTTPHEADER => $option,
			CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
			CURLOPT_RETURNTRANSFER => true
		)
	);
	$districtList = curl_exec($districtsGet);
	curl_close($districtsGet);
	$district_List = json_decode($districtList, true);
	foreach ($district_List as &$district) {
		$query = "INSERT INTO districts (abbreviation, name, key, year) VALUES ('" . $district["abbreviation"] . "', '" . $district["display_name"] . "', '" . $district["key"] . "', '" . $district["year"] . "');";
		$database->query($query);
	}
	unset($district);*/
	$eventsGet = curl_init("https://www.thebluealliance.com/api/v3/events/{$year}/simple");
	curl_setopt_array(
		$eventsGet,
		array(
			CURLOPT_HTTPHEADER => $option,
			CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
			CURLOPT_RETURNTRANSFER => true
		)
	);
	$eventsList = curl_exec($eventsGet);
	curl_close($eventsGet);
	$events = json_decode($eventsList, true);
	echo var_dump($events);
	foreach ($events as &$event) {
		//echo var_dump($event);
		if ($event["district"] === null) {
			$query = "INSERT INTO events (code, name, start_date, end_date, year) VALUES ('" . $event["key"] . "', '" . $event["name"] . "', '" . $event["start_date"] . "', '" . $event["end_date"] . "', '" . $event["year"] . ");";
		}
		$query = "INSERT INTO events (code, name, start_date, end_date, year) VALUES ('" . $event["key"] . "', '" . $event["name"] . "', '" . $event["start_date"] . "', '" . $event["end_date"] . "', '" . $event["year"] . "');";
		echo $query;
		$database->query($query);
	}
	unset($event);
	$page = 0;
	while (true) {
		$teams = curl_init("https://www.thebluealliance.com/api/v3/teams/{$year}/{$page}/simple");
		curl_setopt_array(
			$teams,
			array(
				CURLOPT_HTTPHEADER => $option,
                        	CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
                        	CURLOPT_RETURNTRANSFER => true
			)
		);
		$teamList = curl_exec($teams);
		//echo var_dump(empty($teamList));
		$httpCode = curl_getinfo($teams, CURLINFO_HTTP_CODE);
		//if ($page > 15) echo var_dump($teamList);
		curl_close($teams);
		//echo "{$page}";
		$tempTeam = (array)$teamList;
		if ($teamList == "[]") {
			//echo var_dump($teamList);
			break;
		}
		$teamList = json_decode($teamList, true);
		echo $teamList;
		foreach ($teamList as &$team) {
			$query = "INSERT INTO teams (code, number, name) VALUES ('" . $team["key"] . "', '" . $team["team_number"] . "', '" . $team["nickname"] . "');";
			$database->query($query);
		}
		$page = $page + 1;
	}
?>
