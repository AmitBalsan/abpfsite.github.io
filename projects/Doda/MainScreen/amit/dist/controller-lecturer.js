var studentsList = document.getElementById("studentsList");
var Student = /** @class */ (function () {
    function Student(name, attendance) {
        if (attendance === void 0) { attendance = false; }
        this.name = name;
        this.attendance = attendance;
    }
    return Student;
}());
var students = [];
function toggleAttendance(index) {
    students[index].attendance = true;
    console.log("Attendance toggled for " + students[index].name);
    console.log(students[index].attendance);
}
students.push(new Student("amit"));
students.push(new Student("John"));
students.push(new Student("Dani"));
for (var i = 0; i < students.length; i++) {
    var student = students[i];
    var listItem = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = student.attendance;
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(student.name));
    studentsList.appendChild(listItem);
}
var submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.addEventListener("click", function () {
    for (var i = 0; i < students.length; i++) {
        var checkbox = studentsList.children[i].querySelector("input[type=checkbox]");
        if (checkbox.checked) {
            toggleAttendance(i);
        }
    }
});
document.body.appendChild(submitButton);
