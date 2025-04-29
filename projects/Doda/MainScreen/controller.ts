// import "./model";
function saveStudentToLS(students: Student[]) {
  try {
    if (!students) throw new Error("info is null");
    localStorage.setItem("students", JSON.stringify(students));
  } catch (error) {
    console.log(error);
  }
}

function getStudentFromLS(): Student[] | undefined {
  const data = localStorage.getItem("students");
  const _students = JSON.parse(data);
  return _students;
}

function saveMessagesToLS(messages: Message[]) {
  try {
    if (!messages) throw new Error("info is null");
    localStorage.setItem("messages", JSON.stringify(messages));
  } catch (error) {
    console.log(error);
  }
}

function getMessagesFromLS(): Message[] | undefined {
  const data = localStorage.getItem("messages");
  const _messages = JSON.parse(data);
  return _messages;
}

function saveLecturerToLS(lecturers: Lecturer[]) {
  try {
    if (!lecturers) throw new Error("lecturers is null");
    localStorage.setItem("lecturers", JSON.stringify(lecturers));
  } catch (error) {
    console.log(error);
  }
}

function getLecturerFromLS(): Lecturer[] | undefined {
  const data = localStorage.getItem("lecturers");
  const _lecturers = JSON.parse(data);
  return _lecturers;
}

function saveCourseToLS(courses: Course[]) {
  try {
    if (!courses) throw new Error("courses is null");
    localStorage.setItem("courses", JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}

function getCourseFromLS(): Course[] | undefined {
  const data = localStorage.getItem("courses");
  const _courses = JSON.parse(data);
  return _courses;
}

function saveAdminToLS(admins: Admin[]) {
  try {
    if (!admins) throw new Error("admins is null");
    localStorage.setItem("admins", JSON.stringify(admins));
  } catch (error) {
    console.log(error);
  }
}

function getAdminFromLS(): Admin[] | undefined {
  const data = localStorage.getItem("admins");
  const _admins = JSON.parse(data);
  return _admins;
}

const _coursesN = getCourseFromLS();
if (_coursesN) {
  courses = _coursesN;
}

const html: string = courses
  .map((course) => {
    return `<option> ${course.nameCourse}</option>`;
  })
  .join(" ");
listCourse.innerHTML = `<select class="registerForm__line__listCourse" name="courses">${html}</select><br><br>`;

function HandleSubmit(e) {
  e.preventDefault();
  const name = e.target.elements.name.value;
  const id = e.target.elements.id.value;
  const email = e.target.elements.email.value;
  const phone = e.target.elements.phone.value;
  const address = e.target.elements.address.value;
  const password = e.target.elements.pass.value;
  const cPass = e.target.elements.cPass.value;
  const courseUser = e.target.elements.courses.value;
  if (password != cPass) {
    alert("Passwords Are Not Match");
    throw new Error("Passwords Are Not Match");
  }

  const newStudent = new Student(name, id, email, phone, password, address);

  const index: number = courses.findIndex(
    (course) => course.nameCourse === courseUser
  );

  courses[index].studentsCourse.push(newStudent);
  students.push(newStudent);

  saveStudentToLS(students);
  saveCourseToLS(courses);

  const indexEmail: number = students.length - 1;
  const url = new URL("../userScreen/userScreen.html", window.location.href);
  url.searchParams.set("indexEmail", indexEmail);
  window.location.href = url.href;
}

login.addEventListener("click", (e) => {
  console.log("entered login");
  loginLecturer.style.display = "block";
  loginStudent.style.display = "block";
  loginAdmin.style.display = "block";
  loginLecturerForm.style.display = "none";
  loginStudentForm.style.display = "none";
  loginAdminForm.style.display = "none";
});

loginLecturer.addEventListener("click", (e) => {
  loginLecturerForm.style.display = "block";
  loginLecturer.style.display = "none";
  loginStudent.style.display = "none";
  loginAdmin.style.display = "none";
});

loginStudent.addEventListener("click", (e) => {
  loginStudentForm.style.display = "block";
  loginLecturer.style.display = "none";
  loginStudent.style.display = "none";
  loginAdmin.style.display = "none";
});

loginAdmin.addEventListener("click", (e) => {
  loginAdminForm.style.display = "block";
  loginLecturer.style.display = "none";
  loginStudent.style.display = "none";
  loginAdmin.style.display = "none";
});

function HandleLecturerLogin(e) {
  try {
    e.preventDefault();
    const emailCheck = e.target.elements.emailCheck.value;
    const passCheck = e.target.elements.passCheck.value;
    const indexEmail: number | null = lecturers.findIndex(
      (lecturer) => lecturer.email === emailCheck
    );
    const indexPass: number | null = lecturers.findIndex(
      (lecturer) => lecturer.password === passCheck
    );
    if (indexEmail !== -1 && indexPass !== -1 && indexEmail === indexPass) {
      const url = new URL("../lecturer/lecturer.html", window.location.href);
      url.searchParams.set("indexPass", indexPass);
      window.location.href = url.href;
    } else {
      wrongInfo.innerHTML = `You entered wrong userName or Password`;
    }
  } catch (error) {
    console.log(error);
  }
}

function handleStudentLogin(e) {
  try {
    e.preventDefault();
    const emailCheck = e.target.elements.emailCheck.value;
    const passCheck = e.target.elements.passCheck.value;
    const indexEmail = students.findIndex(
      (student) => student.email === emailCheck
    );
    const indexPass = students.findIndex(
      (student) => student.password === passCheck
    );
    if (indexEmail !== -1 && indexPass !== -1 && indexEmail === indexPass) {
      const url = new URL(
        "../userScreen/userScreen.html",
        window.location.href
      );
      url.searchParams.set("indexEmail", indexEmail);
      window.location.href = url.href;
    } else {
      wrongInfo.innerHTML = `You entered wrong userName or Password`;
    }
  } catch (error) {
    console.log(error);
  }
}

function HandleAdminLogin(e) {
  console.log("entered login admin ");
  try {
    e.preventDefault();
    const emailCheck = e.target.elements.emailCheck.value;
    const passCheck = e.target.elements.passCheck.value;
    const indexEmail = admins.findIndex((admin) => admin.email === emailCheck);
    const indexPassA = admins.findIndex(
      (admin) => admin.password === passCheck
    );

    if (indexEmail !== -1 && indexPassA !== -1 && indexEmail === indexPassA) {
      const url = new URL(
        "/projects/Doda/adminScreen/adminScreen",
        window.location.href
      );
      url.searchParams.set("indexPassA", indexPassA);
      window.location.href = url.href;
    } else {
      wrongInfo.innerHTML = `You entered wrong userName or Password`;
    }
  } catch (error) {
    console.log(error);
  }
}
