<html>
	<body>
		<?php
			$password = getenv("DBPASS");
			$database = new mysqli("localhost", "pi", $password, "scout_janssen");
			if ($database->connect_error) {
				die("Connection to database failed" . $conn->connect_error);
			}
			$query = "SELECT * FROM ?";
			$statement = $database->prepare($query);
			$statement->bind_param("s", "reports");
			echo($query);
			try {
				$statement->execute();
				$statement->bind_result($result);
				$statement->fetch();
				echo($statement->error);
			} catch (Exception $e) {
				echo 'Caught exception: ',  $e->getMessage(), "\n";
			}
			echo(gettype($result));
		?>
	</body>
</html>