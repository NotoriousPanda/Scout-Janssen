<html>
	<body>
		<h1>Select tournament below</h1>
		<form action="/loadTournament.php" method="post">
			<select name="eventChoice">
				<?php
					$query = "SELECT code, name FROM events;";
					$password = getenv("DBPASS");
					$user = "pi";
					$database = new mysqli("localhost", $user, $password, "scout_janssen");
					if ($database->connect_error) {
						echo '</select>';
						die("unable to connect: " . $database->connect_error);
					$events = $database->query($query);
					$menu = "";
					if ($events->num_rows > 0) {
						while($event = $result->fetch_assoc()) {
							$menu .= '<option value="' . $event["code"] . '">' . $event["name"] . '</option>';
						}
					}
					$menu .= "</select>";
					echo $menu;
				?>
			<input type="submit" value="Submit" />
		</form>
	</body>
</html>
