function addGrade(event) {
    event.preventDefault();
    var grade = document.getElementById("grade").value;
    console.log(grade);
    var note = document.getElementById("note").value;
    console.log(note);
    var select = document.getElementById("students")
        .value;
    console.log(select);
}
