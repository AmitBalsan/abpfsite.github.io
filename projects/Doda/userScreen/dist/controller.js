userMenuCourses.addEventListener("click", function () {
    userInner.style.display = "flex";
    userInnerProfile.style.display = "none";
    userCourses(indexEmail);
});
function userCourses(indexEmail) {
    var idUser = students[indexEmail].id;
    try {
        if (!students)
            throw new Error("students not found");
        var html = courses
            .map(function (course) {
            return course.studentsCourse
                .map(function (student) {
                if (idUser === student.id) {
                    return "\n                    <div class=\"cardUserCourse\" onclick=\"HandleOpenCourseU('" + course.uid + "','" + course.nameCourse + "')\">\n                        <h2>" + course.nameCourse + "</h2>\n                        <h3>Lecturer: " + course.lecturer.name + "</h3>\n                        <h3> Start Date: " + course.datesCourse[0] + "</h3>\n                    </div>";
                }
            })
                .join(" ");
        })
            .join(" ");
        userInner.innerHTML = html;
    }
    catch (error) {
        console.log(error);
    }
}
function HandleOpenCourseU(courseUid, nameCourseL) {
    var courseIndex = courses.findIndex(function (course) { return course.uid === courseUid; });
    localStorage.setItem("courseIndex", JSON.stringify(courseIndex));
    userMenu.style.display = "none";
    userCourseMenu.style.display = "flex";
    userCourseName.innerHTML = "" + nameCourseL;
}
userCourseBack.addEventListener("click", function (e) {
    userMenu.style.display = "flex";
    userCourseMenu.style.display = "none";
    userInnerGrade.style.display = "none";
    userInnerAtt.style.display = "none";
    userInnerVideos.style.display = "none";
    userInner.style.display = "flex";
    userCourses(indexEmail);
});
userCourseAttendance.addEventListener("click", function (e) {
    userInner.style.display = "none";
    userInnerGrade.style.display = "none";
    userInnerAtt.style.display = "block";
    userInnerVideos.style.display = "none";
    userMenuProfile.style.display = "none";
    userAttendance();
});
function userAttendance() {
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    var idUser = students[indexEmail].id;
    var _studentsCourse = courses[_courseindex].studentsCourse;
    var _userIndex = _studentsCourse.findIndex(function (student) { return student.id === idUser; });
    console.log(_courseindex);
    console.log(idUser);
    console.log(_userIndex);
    var datesArr = courses[_courseindex].datesCourse;
    var sum = 0;
    var html = "";
    for (var i = 0; i < datesArr.length; i++) {
        html += "\n\n    Date: " + datesArr[i] + "<br>Attendance: " + checkAtt(i, _studentsCourse[_userIndex].attendance) + "<br><br>\n    ";
    }
    for (var z = 0; z < _studentsCourse[_userIndex].attendance.length; z++) {
        sum += _studentsCourse[_userIndex].attendance[z];
    }
    var html2 = "<h2>Summary: You have attendant " + sum + " from " + _studentsCourse[_userIndex].attendance.length + " lessons until now</h2>";
    console.log(html);
    userInnerAtt.innerHTML = " <div class=\"attLesson\">" + html + "</div>" + html2;
}
function checkAtt(i, userAttArr) {
    if (userAttArr[i] === 1) {
        return "Attend";
    }
    else if (userAttArr[i] === 0) {
        return "Absent";
    }
    else {
        return "Lesson has not took place yet";
    }
}
userCourseGrades.addEventListener("click", function (e) {
    userInner.style.display = "none";
    userInnerGrade.style.display = "block";
    userInnerAtt.style.display = "none";
    userMenuProfile.style.display = "none";
    userInnerVideos.style.display = "none";
    userGrades();
});
function userGrades() {
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    var idUser = students[indexEmail].id;
    var _studentsCourse = courses[_courseindex].studentsCourse;
    var _userIndex = _studentsCourse.findIndex(function (student) { return student.id === idUser; });
    console.log(_courseindex);
    console.log(idUser);
    console.log(_userIndex);
    var datesArr = courses[_courseindex].datesCourse;
    var sum = 0;
    var html = "";
    for (var i = 0; i < datesArr.length; i++) {
        html += "\n\n    Date: " + datesArr[i] + "<br>Attendance: " + checkGrade(i, _studentsCourse[_userIndex].grades) + "<br><br>\n    ";
    }
    for (var z = 0; z < _studentsCourse[_userIndex].grades.length; z++) {
        sum += _studentsCourse[_userIndex].grades[z];
    }
    var html2 = "<h2>Your grade average is: " + sum / _studentsCourse[_userIndex].grades.length + "</h2>";
    console.log(html);
    userInnerGrade.innerHTML = " <div class=\"attLesson\">" + html + "</div>" + html2;
}
function checkGrade(i, userGradeArr) {
    if (userGradeArr[i] >= 0) {
        return userGradeArr[i];
    }
    else {
        return "Grade not given yet";
    }
}
function profileUser(indexEmail) {
    try {
        if (!students)
            throw new Error("students not found");
        userInnerProfile.innerHTML = "\n    <div class=\"profileCard\">\n  <h2>Hello " + students[indexEmail].name + "</h2>\n  <h4>ID Number: " + students[indexEmail].id + "</h4>\n  <h4>Address: " + students[indexEmail].address + "</h4>\n  <h4>Email: " + students[indexEmail].email + "</h4>\n  <h4>Password: " + students[indexEmail].password + "</h4>\n  <h4>Phone Number: " + students[indexEmail].phone + "</h4>\n  </div>";
    }
    catch (error) {
        console.log(error);
    }
}
userMenuProfile === null || userMenuProfile === void 0 ? void 0 : userMenuProfile.addEventListener("click", function (e) {
    userInner.style.display = "none";
    userInnerProfile.style.display = "block";
    profileUser(indexEmail);
});
function renderVideosU() {
    var data = localStorage.getItem("courseIndex");
    if (!data)
        throw new Error("data is null");
    var _courseindex = JSON.parse(data);
    userInnerVideos.innerHTML = "";
    courses[_courseindex].videos.forEach(function (video) {
        var videoElement = document.createElement("video");
        videoElement.className = "videoCard";
        videoElement.src = video;
        videoElement.controls = true;
        userInnerVideos.appendChild(videoElement);
    });
}
userCourseVideos.addEventListener("click", function (e) {
    userInner.style.display = "none";
    userInnerGrade.style.display = "none";
    userInnerAtt.style.display = "none";
    userInnerVideos.style.display = "flex";
    renderVideosU();
});
