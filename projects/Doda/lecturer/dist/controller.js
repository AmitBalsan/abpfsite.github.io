lecturerMenuCourses.addEventListener("click", function (e) {
    lecturerInner.style.display = "flex";
    lecturerCourses(indexPass);
});
function lecturerCourses(indexPass) {
    var idLecturer = lecturers[indexPass].id;
    try {
        if (!courses)
            throw new Error("courses not found");
        var html = courses
            .map(function (course) {
            if (idLecturer === course.lecturer.id) {
                return "\n                <div class=\"CourseCard\" onclick=\"HandleOpenCourse('" + course.uid + "','" + course.nameCourse + "')\">\n                    <h2>" + course.nameCourse + "</h2>\n                    <h3>Lecturer: " + course.lecturer.name + "</h3>\n                    <h3> Start Date: " + course.datesCourse[0] + "</h3>\n                </div>";
            }
        })
            .join(" ");
        lecturerInner.innerHTML = html;
    }
    catch (error) {
        console.log(error);
    }
}
function HandleOpenCourse(courseUid, nameCourseL) {
    var courseIndex = courses.findIndex(function (course) { return course.uid === courseUid; });
    localStorage.setItem("courseIndex", JSON.stringify(courseIndex));
    lecturerMenu.style.display = "none";
    courseMenu.style.display = "flex";
    courseName.innerHTML = "" + nameCourseL;
}
courseMenuBack.addEventListener("click", function (e) {
    lecturerMenu.style.display = "flex";
    courseMenu.style.display = "none";
    lecturerInnerLessonsG.style.display = "none";
    lecturerInnerLessons.style.display = "none";
    lecturerInner.style.display = "flex";
    lecturerInnerGrades.style.display = "none";
    lecturerInnerAttendance.style.display = "none";
    videoPage.style.display = "none";
});
courseAttendance.addEventListener("click", function (e) {
    lecturerInner.style.display = "none";
    lecturerInnerLessons.style.display = "flex";
    lecturerInnerLessonsG.style.display = "none";
    lecturerInnerGrades.style.display = "none";
    lecturerInnerAttendance.style.display = "none";
    videoPage.style.display = "none";
    attendanceCourse();
});
function attendanceCourse() {
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    var datesArr = courses[_courseindex].datesCourse;
    var html = "";
    for (var i = 0; i < datesArr.length; i++) {
        html += "\n    <div class=\"cardDate\" onclick=\"markAttendance()\">\n    <h3>Lesson " + (i + 1) + "</h3>\n    <h5>Date: " + datesArr[i] + "</h5>\n  </div>\n  ";
    }
    lecturerInnerLessons.innerHTML = html;
}
function markAttendance() {
    studentsList === null || studentsList === void 0 ? void 0 : studentsList.innerHTML = "";
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    lecturerInnerLessons.style.display = "none";
    lecturerInnerAttendance.style.display = "flex";
    lecturerInnerAttendance.style.flexDirection = "column";
    for (var i = 0; i < courses[_courseindex].studentsCourse.length; i++) {
        var student = courses[_courseindex].studentsCourse[i];
        var listItem = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.id = "" + i;
        checkbox.type = "checkbox";
        td1.appendChild(document.createTextNode(student.name));
        listItem.appendChild(td1);
        td2.appendChild(checkbox);
        listItem.appendChild(td2);
        studentsList === null || studentsList === void 0 ? void 0 : studentsList.appendChild(listItem);
        saveCourseToLS(courses);
    }
}
submitButton.addEventListener("click", function () {
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    for (var i = 0; i < courses[_courseindex].studentsCourse.length; i++) {
        var checkbox = studentsList === null || studentsList === void 0 ? void 0 : studentsList.children[i].querySelector("input[type=checkbox]");
        if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
            var studentI = courses[_courseindex].studentsCourse[i];
            studentI.attendance.push(1);
            console.log(studentI);
            console.log(courses[_courseindex].studentsCourse[i]);
        }
        else {
            courses[_courseindex].studentsCourse[i].attendance.push(0);
        }
    }
    saveCourseToLS(courses);
    saveStudentToLS(students);
    lecturerInnerAttendance.style.display = "none";
    lecturerInnerLessons.style.display = "flex";
});
courseGrades.addEventListener("click", function (e) {
    lecturerInner.style.display = "none";
    lecturerInnerLessonsG.style.display = "flex";
    lecturerInnerLessons.style.display = "none";
    lecturerInnerAttendance.style.display = "none";
    lecturerInnerGrades.style.display = "none";
    videoPage.style.display = "none";
    gradesCourse();
});
function gradesCourse() {
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    var datesArr = courses[_courseindex].datesCourse;
    var html = "";
    for (var i = 0; i < datesArr.length; i++) {
        html += "\n    <div class=\"cardDate\" onclick=\"markGrades()\">\n    <h3>Lesson " + (i + 1) + "</h3>\n    <h5>Date: " + datesArr[i] + "</h5>\n  </div>\n  ";
    }
    lecturerInnerLessonsG.innerHTML = html;
}
function markGrades() {
    studentsListG === null || studentsListG === void 0 ? void 0 : studentsListG.innerHTML = "";
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    lecturerInnerLessonsG.style.display = "none";
    lecturerInnerGrades.style.display = "flex";
    for (var i = 0; i < courses[_courseindex].studentsCourse.length; i++) {
        var student = courses[_courseindex].studentsCourse[i];
        var listItem = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var inputG = document.createElement("input");
        inputG.id = "" + i;
        inputG.type = "number";
        td1.appendChild(document.createTextNode(student.name));
        listItem.appendChild(td1);
        td2.appendChild(inputG);
        listItem.appendChild(td2);
        studentsListG === null || studentsListG === void 0 ? void 0 : studentsListG.appendChild(listItem);
        saveCourseToLS(courses);
        saveStudentToLS(students);
    }
    submitButtonG.addEventListener("click", function (e) {
        var data = localStorage.getItem("courseIndex");
        if (!data)
            throw new Error("data is null");
        var _courseindex = JSON.parse(data);
        for (var i = 0; i < courses[_courseindex].studentsCourse.length; i++) {
            var gradeS = document.getElementById("" + i);
            var value = Number(gradeS.value);
            var studentI = courses[_courseindex].studentsCourse[i];
            studentI.grades.push(value);
        }
        saveCourseToLS(courses);
        saveStudentToLS(students);
        lecturerInnerGrades.style.display = "none";
        lecturerInnerLessonsG.style.display = "flex";
        console.log();
    });
}
//---------------video
courseVideo.addEventListener("click", function (e) {
    lecturerInner.style.display = "none";
    lecturerInnerLessonsG.style.display = "none";
    lecturerInnerLessons.style.display = "none";
    lecturerInnerAttendance.style.display = "none";
    lecturerInnerGrades.style.display = "none";
    videoPage.style.display = "flex";
    plus.style.display = "block";
    videosCourse();
});
plus.addEventListener("click", function (e) {
    newVideo.style.display = "flex";
});
function videosCourse() {
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    innerVideos.innerHTML = "";
    courses[_courseindex].videos.forEach(function (video) {
        var videoElement = document.createElement("video");
        videoElement.className = "videoCard";
        videoElement.src = video;
        videoElement.controls = true;
        innerVideos.appendChild(videoElement);
    });
}
function HandleAddVideo(e) {
    e.preventDefault();
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    var file = e.target.elements.videoFile.files[0];
    var blobURL = URL.createObjectURL(file);
    courses[_courseindex].videos.push(blobURL);
    console.log(courses[_courseindex].videos);
    var videoElement = document.createElement("video");
    videoElement.className = "videoCard";
    videoElement.src = blobURL;
    videoElement.controls = true;
    innerVideos.appendChild(videoElement);
    saveCourseToLS(courses);
    videosCourse();
}
function profileLecturer(indexPass) {
    try {
        if (!lecturers)
            throw new Error("lecturer not found");
        lecturerInner.innerHTML = "\n    <div class=\"profileCard\">\n  <h2>Hello " + lecturers[indexPass].name + "</h2>\n  <h4>ID Number: " + lecturers[indexPass].id + "</h4>\n  <h4>Address: " + lecturers[indexPass].address + "</h4>\n  <h4>Email: " + lecturers[indexPass].email + "</h4>\n  <h4>Password: " + lecturers[indexPass].password + "</h4>\n  <h4>Phone Number: " + lecturers[indexPass].phone + "</h4>\n  </div>";
    }
    catch (error) {
        console.log(error);
    }
}
lecturerMenuProfile.addEventListener("click", function (e) {
    lecturerInner.style.display = "block";
    profileLecturer(indexPass);
});
