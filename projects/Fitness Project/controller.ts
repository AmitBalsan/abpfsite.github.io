function handleDetails(evt) {
  console.log(evt);
  try {
    evt.preventDefault();
    const userName = evt.target.elements.header__username.value;
    let pushups = evt.target.elements.header__pushups.value;
    const pullups = evt.target.elements.header__pullups.value;
    const squats = evt.target.elements.header__squats.value;
    const situps = evt.target.elements.header__situps.value;

    users.push(new User(userName, pushups, pullups, squats, situps));
    console.log(users);

    localStorage.setItem("username", userName);
    localStorage.setItem("pushups", pushups);
    localStorage.setItem("pullups", pullups);
    localStorage.setItem("squats", squats);
    localStorage.setItem("situps", situps);

    const workoutButton = document.querySelector(
      ".workoutButton"
    ) as HTMLDivElement;
    workoutButton.innerHTML = `<button><a href="./workout.html">Show my workout!</a></button>`;
  } catch (error) {
    console.log(error);
  }
}
