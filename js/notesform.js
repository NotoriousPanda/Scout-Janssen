form = document.getElementById("notes");
function validateForm() {
  var x = document.forms["notes"]["notesInput"].value;
  if (x == "") {
    return false;
  }
}
