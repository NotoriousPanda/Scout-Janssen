<html>
	<body>
		<h1>Select tournament below</h1>
			<form action="/loadTournament.php" method="post">
				<select>
					<?php 
						$query = "SELECT code, name FROM events;"
						$password = $_ENV["HTTP_databsePassword"];
						$user = "pi";
						$databse = new mysqli("localhost", $user, $password, "scout_janssen");