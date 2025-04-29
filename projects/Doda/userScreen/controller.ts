userMenuCourses.addEventListener("click", () => {
  userInner.style.display = "flex";
  userInnerProfile.style.display = "none";
  userCourses(indexEmail);
});

function userCourses(indexEmail: number) {
  const idUser = students[indexEmail].id;
  try {
    if (!students) throw new Error(`students not found`);
    const html: string = courses
      .map((course) => {
        return course.studentsCourse
          .map((student) => {
            if (idUser === student.id) {
              return `
                    <div class="cardUserCourse" onclick="HandleOpenCourseU('${course.uid}','${course.nameCourse}')">
                        <h2>${course.nameCourse}</h2>
                        <h3>Lecturer: ${course.lecturer.name}</h3>
                        <h3> Start Date: ${course.datesCourse[0]}</h3>
                    </div>`;
            }
          })
          .join(" ");
      })
      .join(" ");
    userInner.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

function HandleOpenCourseU(courseUid: string, nameCourseL: string) {
  let courseIndex = courses.findIndex((course) => course.uid === courseUid);
  localStorage.setItem("courseIndex", JSON.stringify(courseIndex));
  userMenu.style.display = "none";
  userCourseMenu.style.display = "flex";
  userCourseName.innerHTML = `${nameCourseL}`;
}

userCourseBack.addEventListener("click", (e) => {
  userMenu.style.display = "flex";
  userCourseMenu.style.display = "none";
  userInnerGrade.style.display = "none";
  userInnerAtt.style.display = "none";
  userInnerVideos.style.display = "none";
  userInner.style.display = "flex";
  userCourses(indexEmail);
});

userCourseAttendance.addEventListener("click", (e) => {
  userInner.style.display = "none";
  userInnerGrade.style.display = "none";
  userInnerAtt.style.display = "block";
  userInnerVideos.style.display = "none";
  userMenuProfile.style.display = "none";
  userAttendance();
});

function userAttendance() {
  let data = localStorage.getItem("courseIndex");
  if (!data) throw new Error("data is null");
  const _courseindex = JSON.parse(data);

  const idUser = students[indexEmail].id;

  const _studentsCourse = courses[_courseindex].studentsCourse;
  const _userIndex = _studentsCourse.findIndex(
    (student) => student.id === idUser
  );

  console.log(_courseindex);
  console.log(idUser);
  console.log(_userIndex);

  const datesArr = courses[_courseindex].datesCourse;

  let sum: number = 0;
  let html: string = "";
  for (let i = 0; i < datesArr.length; i++) {
    html += `

    Date: ${datesArr[i]}<br>Attendance: ${checkAtt(
      i,
      _studentsCourse[_userIndex].attendance
    )}<br><br>
    `;
  }

  for (let z = 0; z < _studentsCourse[_userIndex].attendance.length; z++) {
    sum += _studentsCourse[_userIndex].attendance[z];
  }

  let html2: string = `<h2>Summary: You have attendant ${sum} from ${_studentsCourse[_userIndex].attendance.length} lessons until now</h2>`;
  console.log(html);

  userInnerAtt.innerHTML = ` <div class="attLesson">${html}</div>${html2}`;
}

function checkAtt(i, userAttArr): string {
  if (userAttArr[i] === 1) {
    return "Attend";
  } else if (userAttArr[i] === 0) {
    return "Absent";
  } else {
    return "Lesson has not took place yet";
  }
}

userCourseGrades.addEventListener("click", (e) => {
  userInner.style.display = "none";
  userInnerGrade.style.display = "block";
  userInnerAtt.style.display = "none";
  userMenuProfile.style.display = "none";
  userInnerVideos.style.display = "none";
  userGrades();
});

function userGrades() {
  let data = localStorage.getItem("courseIndex");
  if (!data) throw new Error("data is null");
  const _courseindex = JSON.parse(data);

  const idUser = students[indexEmail].id;

  const _studentsCourse = courses[_courseindex].studentsCourse;
  const _userIndex = _studentsCourse.findIndex(
    (student) => student.id === idUser
  );

  console.log(_courseindex);
  console.log(idUser);
  console.log(_userIndex);

  const datesArr = courses[_courseindex].datesCourse;

  let sum: number = 0;
  let html: string = "";
  for (let i = 0; i < datesArr.length; i++) {
    html += `

    Date: ${datesArr[i]}<br>Attendance: ${checkGrade(
      i,
      _studentsCourse[_userIndex].grades
    )}<br><br>
    `;
  }

  for (let z = 0; z < _studentsCourse[_userIndex].grades.length; z++) {
    sum += _studentsCourse[_userIndex].grades[z];
  }

  let html2: string = `<h2>Your grade average is: ${
    sum / _studentsCourse[_userIndex].grades.length
  }</h2>`;
  console.log(html);

  userInnerGrade.innerHTML = ` <div class="attLesson">${html}</div>${html2}`;
}

function checkGrade(i, userGradeArr): string {
  if (userGradeArr[i] >= 0) {
    return userGradeArr[i];
  } else {
    return "Grade not given yet";
  }
}

function profileUser(indexEmail) {
  try {
    if (!students) throw new Error(`students not found`);
    userInnerProfile.innerHTML = `
    <div class="profileCard">
  <h2>Hello ${students[indexEmail].name}</h2>
  <h4>ID Number: ${students[indexEmail].id}</h4>
  <h4>Address: ${students[indexEmail].address}</h4>
  <h4>Email: ${students[indexEmail].email}</h4>
  <h4>Password: ${students[indexEmail].password}</h4>
  <h4>Phone Number: ${students[indexEmail].phone}</h4>
  </div>`;
  } catch (error) {
    console.log(error);
  }
}

userMenuProfile?.addEventListener("click", (e) => {
  userInner.style.display = "none";
  userInnerProfile.style.display = "block";
  profileUser(indexEmail);
});

function renderVideosU() {
  let data = localStorage.getItem("courseIndex");
  if (!data) throw new Error("data is null");
  const _courseindex = JSON.parse(data);
  userInnerVideos.innerHTML = "";
  courses[_courseindex].videos.forEach((video) => {
    let videoElement = document.createElement("video");
    videoElement.className = "videoCard";
    videoElement.src = video;
    videoElement.controls = true;
    userInnerVideos.appendChild(videoElement);
  });
}

userCourseVideos.addEventListener("click", (e) => {
  userInner.style.display = "none";
  userInnerGrade.style.display = "none";
  userInnerAtt.style.display = "none";
  userInnerVideos.style.display = "flex";
  renderVideosU();
});
