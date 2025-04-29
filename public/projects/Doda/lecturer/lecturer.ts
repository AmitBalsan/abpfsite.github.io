let paramsL = new URLSearchParams(window.location.search);
let indexPass = paramsL.get("indexPass");

lecturerInnerFunc(indexPass);

function lecturerInnerFunc(indexPass) {
  try {
    if (!indexPass) throw new Error(`user not found`);
    lecturerMenuName.innerHTML = `Hello ${lecturers[indexPass].name}`;
  } catch (error) {
    console.log(error);
  }
}

lecturerCourses(indexPass);
