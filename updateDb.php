<?php
	$query = "DELTE FROM districts; DELETE FROM events;";
	$user = root;
	$password = $_ENV["databasePassword"];
	$database = new mysqli("localhost", $user, $password, "scout_janssen");
	if ($database->connect_error) {
		die("Connection failed: " . $conn->connect_error);
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
	echo $tbaStatus;
	$year = $tbaStatus["current_season"];
	echo "{$year}";
	$_ENV["currentYear"] = $year;
	$districtsGet = curl_init("https://www.thebluealliance.com/api/v3/districts/{$year}");
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
	$districtList = json_decode($districtList, true);
	echo $districtList;
	foreach ($districtList as &$district) {
		$query = "INSERT INTO districts (abbreviation, name, key, year) VALUES ('" . $district["abbreviation"] . "', '" . $district["display_name"] . "', '" . $district["key"] . "', '" . $district["year"] . "');";
		$database->query($query);
	}
	unset($district);
	$eventsGet = curl_init("https://www.thebluealliance.com/api/v3/events/{$year}/simple");
	curl_setopt_array(
		$eventsGet, 
		array(
			CURLOPT_HTTPHEADER => $option,
			CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
			CURLOPT_RETURNTRANSFER => true
		)
	);
	$eventsList = $curl_exec($eventsGet);
	curl_close($eventsGet);
	$eventsList = json_decode($events_list, true);
	echo $eventsList;
	foreach ($eventsList as &$event) {
		if ($event["district"] === null) {
			$query = "INSERT INTO events (key, name, start_date, end_date, year, district) VALUES ('" . $event["key"] . "', '" . $event["name"] . "', '" . $event["start_date"] . "', '" . $event["end_date"] . "', '" . $event["year"] . "', NULL);";
		}
		$query = "INSERT INTO events (key, name, start_date, end_date, year, district) VALUES ('" . $event["key"] . "', '" . $event["name"] . "', '" . $event["start_date"] . "', '" . $event["end_date"] . "', '" . $event["year"] . "', '" . $event["district"]["key"] . "');";
		$database->query($query);
	}
	unset($event);
	$page = 0;
	while (true) {
		$teams = curl_init("https://www.thebluealliance.com/api/v3/teams/{$year}/{$page}/simple");
		curl_setopt_array(
			$eventsGet, 
			array(
				CURLOPT_HTTPHEADER => $option,
				CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
				CURLOPT_RETURNTRANSFER => true
			)
		);
		$teamList = $curl_exec($teams);
		$httpCode = curl_getinfo($teams, CURLINFO_HTTP_CODE);
		curl_close($teams);
		if ($httpCode === 404) {
			break;
		}
		$teamList = json_decode($teamList);
		echo $teamList;
		foreach ($teamList as &$team) {
			$query = "INSERT INTO teams (key, number, name) VALUES ('" . $team["key"] . "', '" . $team["team_number"] . "', '" . $team["nickname"] . "');";
			$databse->query($query);
		}
	}
?>