function addGrade(event) {
  event.preventDefault();

  const grade = (document.getElementById("grade") as HTMLInputElement).value;
  console.log(grade);

  const note = (document.getElementById("note") as HTMLInputElement).value;
  console.log(note);

  const select = (document.getElementById("students") as HTMLInputElement)
    .value;
  console.log(select);
}
