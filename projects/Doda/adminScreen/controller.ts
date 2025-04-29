adminMenuAddLecturer.addEventListener("click", (e) => {
  addLecturerForm.style.display = "flex";
  addCourseForm.style.display = "none";
  deleteCoursesForm.style.display = "none";
  deleteLecturersForm.style.display = "none";
  deleteStudentFromCourse.style.display = "none";
});

function HandleAddLecturer(e) {
  e.preventDefault();
  const name = e.target.elements.name.value;
  const id = e.target.elements.id.value;
  const email = e.target.elements.email.value;
  const phone = e.target.elements.phone.value;
  const address = e.target.elements.address.value;
  const password = e.target.elements.pass.value;
  const cPass = e.target.elements.cPass.value;
  if (password != cPass) {
    adminInnerMs.innerHTML = `<h2>Passwords Are Not Match</h2>`;
    throw new Error("Passwords Are Not Match");
  }

  const newLecturer = new Lecturer(name, id, email, phone, password, address);

  lecturers.push(newLecturer);
  saveLecturerToLS(lecturers);

  adminInnerMs.innerHTML = `<h2>Lecturer added successfully</h2>`;
}

adminMenuAddCourse.addEventListener("click", (e) => {
  addCourseForm.style.display = "flex";
  addLecturerForm.style.display = "none";
  deleteCoursesForm.style.display = "none";
  deleteLecturersForm.style.display = "none";
  deleteStudentFromCourse.style.display = "none";
  const htmlL: string = lecturers
    .map((lecturer) => {
      return `<option> ${lecturer.name}</option>`;
    })
    .join(" ");
  listLecturers.innerHTML = `
<select type="Lecturer[]" class="addCourseForm__line__listLecturers" name="lecturerC">
${htmlL}
</select><br><br>`;
});

function HandleAddCourse(e) {
  e.preventDefault();
  const name = e.target.elements.name.value;
  const dates = e.target.elements.dates.value;
  const lecturerC = e.target.elements.lecturerC.value;

  const datesArray = dates.split(" ");
  const lecturerIndex = lecturers.findIndex(
    (lecturer) => lecturer.name === lecturerC
  );
  const newCourse = new Course(name, datesArray, lecturers[lecturerIndex]);

  courses.push(newCourse);

  saveCourseToLS(courses);
  console.log(lecturerC);

  adminInnerMs2.innerHTML = `<h2>Course added successfully</h2>`;
}

deleteLecturers.addEventListener("click", (e) => {
  addCourseForm.style.display = "none";
  addLecturerForm.style.display = "none";
  deleteLecturersForm.style.display = "flex";
  deleteCoursesForm.style.display = "none";
  deleteStudentFromCourse.style.display = "none";
  const htmlL: string = lecturers
    .map((lecturer) => {
      return `<option> ${lecturer.name}</option>`;
    })
    .join(" ");
  listLecturersDel.innerHTML = `
<select type="Lecturer[]"  name="lecturerD">
${htmlL}
</select><br><br>`;
});

function HandleDeleteLecturer(e) {
  e.preventDefault();
  const lecturerD = e.target.elements.lecturerD.value;
  const dLecturerIndex = lecturers.findIndex(
    (lecturer) => lecturer.name === lecturerD
  );
  if (dLecturerIndex !== -1) {
    lecturers.splice(dLecturerIndex, 1);
    console.log(`we deleted ${lecturerD}`);
    deleteLecturersSms.innerHTML = `<h2>we deleted ${lecturerD}</h2>`;
  }
  saveLecturerToLS(lecturers);
}
deleteCourses.addEventListener("click", (e) => {
  addCourseForm.style.display = "none";
  addLecturerForm.style.display = "none";
  deleteLecturersForm.style.display = "none";
  deleteCoursesForm.style.display = "flex";
  deleteStudentFromCourse.style.display = "none";

  const htmlL: string = courses
    .map((course) => {
      return `<option> ${course.nameCourse}</option>`;
    })
    .join(" ");
  listCoursesDel.innerHTML = `
<select type="Course[]"  name="courseD">
${htmlL}
</select><br><br>`;
});

function HandleDeleteCourse(e) {
  e.preventDefault();
  const courseD = e.target.elements.courseD.value;
  const dCourseIndex = courses.findIndex(
    (course) => course.nameCourse === courseD
  );
  if (dCourseIndex !== -1) {
    courses.splice(dCourseIndex, 1);
    console.log(`we deleted ${courseD}`);
    deleteCoursesSms.innerHTML = `<h2>we deleted ${courseD}</h2>`;
  }
  saveCourseToLS(courses);
}

deleteStudents.addEventListener("click", () => {
  addCourseForm.style.display = "none";
  addLecturerForm.style.display = "none";
  deleteLecturersForm.style.display = "none";
  deleteCoursesForm.style.display = "none";
  deleteStudentFromCourse.style.display = "flex";

  const buttonCourse = courses
    .map((course, i) => {
      return `<button class="courseNum" onclick="courseNum(${i})">${course.nameCourse}</button> 
        <div class="studentsListToDel${i}"></div>`;
    })
    .join("");

  deleteStudentFromCourse.innerHTML = buttonCourse;
});

function courseNum(numOfCourse: number) {
  let htmlofStudents = document.querySelectorAll(
    `.courseNum`
  ) as NodeListOf<Element>;
  htmlofStudents.forEach((element) => {
    element.style.display = "none";
  });
  let studentsListToDel = document.querySelector(
    `.studentsListToDel${numOfCourse}`
  ) as HTMLDivElement;
  console.log(numOfCourse);
  var studentsListOfCourse = courses[numOfCourse].studentsCourse;
  const studentsListOfCourseName = studentsListOfCourse
    .map((student) => {
      return ` <option>${student.name} </option>`;
    })
    .join("");

  studentsListToDel.innerHTML = `
  <form onsubmit="HandleDeleteStudent(event,${numOfCourse})" ">
  <label for="studentD">Choose a Student To delete</label>
  <input list="students" name="studentD" id="studentD">
  <datalist id="students">
  ${studentsListOfCourseName}
  </datalist>
  <br><br>
  <input type="submit" value="submit" ">
`;
}
function HandleDeleteStudent(e, courseIndex3: number) {
  e.preventDefault();

  const studentsListOfCourse = courses[courseIndex3].studentsCourse;
  const studentD = e.target.elements.studentD.value;
  const numOfStudent = studentsListOfCourse.findIndex(
    (student) => student.name === studentD
  );
  if (numOfStudent !== -1) {
    console.log(`delete ${studentD}`);

    studentsListOfCourse.splice(numOfStudent, 1);
    saveCourseToLS(courses);
  }
}
