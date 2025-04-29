adminMenuAddLecturer.addEventListener("click", function (e) {
    addLecturerForm.style.display = "flex";
    addCourseForm.style.display = "none";
    deleteCoursesForm.style.display = "none";
    deleteLecturersForm.style.display = "none";
    deleteStudentFromCourse.style.display = "none";
});
function HandleAddLecturer(e) {
    e.preventDefault();
    var name = e.target.elements.name.value;
    var id = e.target.elements.id.value;
    var email = e.target.elements.email.value;
    var phone = e.target.elements.phone.value;
    var address = e.target.elements.address.value;
    var password = e.target.elements.pass.value;
    var cPass = e.target.elements.cPass.value;
    if (password != cPass) {
        adminInnerMs.innerHTML = "<h2>Passwords Are Not Match</h2>";
        throw new Error("Passwords Are Not Match");
    }
    var newLecturer = new Lecturer(name, id, email, phone, password, address);
    lecturers.push(newLecturer);
    saveLecturerToLS(lecturers);
    adminInnerMs.innerHTML = "<h2>Lecturer added successfully</h2>";
}
adminMenuAddCourse.addEventListener("click", function (e) {
    addCourseForm.style.display = "flex";
    addLecturerForm.style.display = "none";
    deleteCoursesForm.style.display = "none";
    deleteLecturersForm.style.display = "none";
    deleteStudentFromCourse.style.display = "none";
    var htmlL = lecturers
        .map(function (lecturer) {
        return "<option> " + lecturer.name + "</option>";
    })
        .join(" ");
    listLecturers.innerHTML = "\n<select type=\"Lecturer[]\" class=\"addCourseForm__line__listLecturers\" name=\"lecturerC\">\n" + htmlL + "\n</select><br><br>";
});
function HandleAddCourse(e) {
    e.preventDefault();
    var name = e.target.elements.name.value;
    var dates = e.target.elements.dates.value;
    var lecturerC = e.target.elements.lecturerC.value;
    var datesArray = dates.split(" ");
    var lecturerIndex = lecturers.findIndex(function (lecturer) { return lecturer.name === lecturerC; });
    var newCourse = new Course(name, datesArray, lecturers[lecturerIndex]);
    courses.push(newCourse);
    saveCourseToLS(courses);
    console.log(lecturerC);
    adminInnerMs2.innerHTML = "<h2>Course added successfully</h2>";
}
deleteLecturers.addEventListener("click", function (e) {
    addCourseForm.style.display = "none";
    addLecturerForm.style.display = "none";
    deleteLecturersForm.style.display = "flex";
    deleteCoursesForm.style.display = "none";
    deleteStudentFromCourse.style.display = "none";
    var htmlL = lecturers
        .map(function (lecturer) {
        return "<option> " + lecturer.name + "</option>";
    })
        .join(" ");
    listLecturersDel.innerHTML = "\n<select type=\"Lecturer[]\"  name=\"lecturerD\">\n" + htmlL + "\n</select><br><br>";
});
function HandleDeleteLecturer(e) {
    e.preventDefault();
    var lecturerD = e.target.elements.lecturerD.value;
    var dLecturerIndex = lecturers.findIndex(function (lecturer) { return lecturer.name === lecturerD; });
    if (dLecturerIndex !== -1) {
        lecturers.splice(dLecturerIndex, 1);
        console.log("we deleted " + lecturerD);
        deleteLecturersSms.innerHTML = "<h2>we deleted " + lecturerD + "</h2>";
    }
    saveLecturerToLS(lecturers);
}
deleteCourses.addEventListener("click", function (e) {
    addCourseForm.style.display = "none";
    addLecturerForm.style.display = "none";
    deleteLecturersForm.style.display = "none";
    deleteCoursesForm.style.display = "flex";
    deleteStudentFromCourse.style.display = "none";
    var htmlL = courses
        .map(function (course) {
        return "<option> " + course.nameCourse + "</option>";
    })
        .join(" ");
    listCoursesDel.innerHTML = "\n<select type=\"Course[]\"  name=\"courseD\">\n" + htmlL + "\n</select><br><br>";
});
function HandleDeleteCourse(e) {
    e.preventDefault();
    var courseD = e.target.elements.courseD.value;
    var dCourseIndex = courses.findIndex(function (course) { return course.nameCourse === courseD; });
    if (dCourseIndex !== -1) {
        courses.splice(dCourseIndex, 1);
        console.log("we deleted " + courseD);
        deleteCoursesSms.innerHTML = "<h2>we deleted " + courseD + "</h2>";
    }
    saveCourseToLS(courses);
}
deleteStudents.addEventListener("click", function () {
    addCourseForm.style.display = "none";
    addLecturerForm.style.display = "none";
    deleteLecturersForm.style.display = "none";
    deleteCoursesForm.style.display = "none";
    deleteStudentFromCourse.style.display = "flex";
    var buttonCourse = courses
        .map(function (course, i) {
        return "<button class=\"courseNum\" onclick=\"courseNum(" + i + ")\">" + course.nameCourse + "</button> \n        <div class=\"studentsListToDel" + i + "\"></div>";
    })
        .join("");
    deleteStudentFromCourse.innerHTML = buttonCourse;
});
function courseNum(numOfCourse) {
    var htmlofStudents = document.querySelectorAll(".courseNum");
    htmlofStudents.forEach(function (element) {
        element.style.display = "none";
    });
    var studentsListToDel = document.querySelector(".studentsListToDel" + numOfCourse);
    console.log(numOfCourse);
    var studentsListOfCourse = courses[numOfCourse].studentsCourse;
    var studentsListOfCourseName = studentsListOfCourse
        .map(function (student) {
        return " <option>" + student.name + " </option>";
    })
        .join("");
    studentsListToDel.innerHTML = "\n  <form onsubmit=\"HandleDeleteStudent(event," + numOfCourse + ")\" \">\n  <label for=\"studentD\">Choose a Student To delete</label>\n  <input list=\"students\" name=\"studentD\" id=\"studentD\">\n  <datalist id=\"students\">\n  " + studentsListOfCourseName + "\n  </datalist>\n  <br><br>\n  <input type=\"submit\" value=\"submit\" \">\n";
}
function HandleDeleteStudent(e, courseIndex3) {
    e.preventDefault();
    var studentsListOfCourse = courses[courseIndex3].studentsCourse;
    var studentD = e.target.elements.studentD.value;
    var numOfStudent = studentsListOfCourse.findIndex(function (student) { return student.name === studentD; });
    if (numOfStudent !== -1) {
        console.log("delete " + studentD);
        studentsListOfCourse.splice(numOfStudent, 1);
        saveCourseToLS(courses);
    }
}
