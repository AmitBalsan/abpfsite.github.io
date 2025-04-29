const studentsList = document.getElementById("studentsList");

class Student {
  constructor(public name: string, public attendance: boolean = false) {}
}
const students: Student[] = [];

function toggleAttendance(index) {
  students[index].attendance = true;

  console.log(`Attendance toggled for ${students[index].name}`);
  console.log(students[index].attendance);
}

students.push(new Student("amit"));
students.push(new Student("John"));
students.push(new Student("Dani"));

for (let i = 0; i < students.length; i++) {
  const student = students[i];

  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = student.attendance;
  listItem.appendChild(checkbox);
  listItem.appendChild(document.createTextNode(student.name));
  studentsList.appendChild(listItem);
}

const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.addEventListener("click", () => {
  for (let i = 0; i < students.length; i++) {
    const checkbox = studentsList.children[i].querySelector(
      "input[type=checkbox]"
    );
    if (checkbox.checked) {
      toggleAttendance(i);
    }
  }
});
document.body.appendChild(submitButton);
