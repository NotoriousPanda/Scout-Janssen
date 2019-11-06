<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/pages.css">
    <link rel="stylesheet" href="css/tba.css">
	<link rel="stylesheet" href="css/teampage.css">
    <script src="js/teamPage.js" type="text/javascript"></script>
</head>
<?php
$team = $_GET['team'];
echo("<h1 id='selTeam' style='padding-left: 2vw'>Selected team: $team</h2>");

//$password = getenv("DBPASS");
$password = getenv("DBPASS");
$database = new mysqli("localhost", "pi", $password, "scout_janssen");
if ($database->connect_error) {
				die("Connection to database failed" . $conn->connect_error);
}

$sql = $conn->prepare("SELECT * FROM reports");
$result = $conn->query($sql);
echo($result);

?>
<body>
	<div>
		<div>
		<p class="pCaution">*Some data may be incorrect as it comes from TBA</p>
		</div>
	</div>
</body>
</html