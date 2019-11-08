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
/*$database = new mysqli("localhost", "pi", $password, "scout_janssen");
if ($database->connect_error) {
				die("Connection to database failed" . $conn->connect_error);
}
$sql = "SELECT * FROM reports";
$sql = "DESCRIBE reports";
$stmt = $database->prepare($sql);
$result = $database->query($stmt);*/

echo "<table style='border: solid 1px black;'>";
 echo "<tr><th>id</th><th>team number</th><th>match number</th><th>notes</th></tr>";

class TableRows extends RecursiveIteratorIterator {
    function __construct($it) {
        parent::__construct($it, self::LEAVES_ONLY);
    }

    function current() {
        return "<td style='width: 150px; border: 1px solid black;'>" . parent::current(). "</td>";
    }

    function beginChildren() {
        echo "<tr>";
    }

    function endChildren() {
        echo "</tr>" . "\n";
    }
}

$servername = "localhost";
$username = "pi";
$password = "$password";
$dbname = "scout_janssen";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT id, teamNumber, matchNumber, notes FROM reports");
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

    foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
        echo $v;
    }
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;
echo "</table>";


/*if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}
$database->close();*/

?>
<script>

</script>
<body>
	<div>
		<div>
		<p class="pCaution">*Some data may be incorrect as it comes from TBA</p>
		</div>
	</div>
</body>
</html
