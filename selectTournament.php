<html>
	<body>
		<h1>Select tournament below</h1>
		<form action="/loadTournament.php" method="post">
			<select name="eventChoice">
				<?php 
					$query = "SELECT code, name FROM events;"
					$password = getenv("DBPASS");
					$user = "pi";
					$databse = new mysqli("localhost", $user, $password, "scout_janssen");
					$events = $database->query($query);
					if ($events->num_rows > 0) {
						while($event = $result->fetch_assoc()) {
							echo '<option value="' . $event["code"] . '">' . $event["name"] . '</option>';
						}
					}
					?>
			</select>
				
			<input type="submit" value="Submit" />
		</form>
	</body>
</html>