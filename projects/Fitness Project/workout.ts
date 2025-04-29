const pushups = localStorage.getItem("pushups");

const pullups = localStorage.getItem("pullups");
const squats = localStorage.getItem("squats");
const situps = localStorage.getItem("situps");
const pushups1 = Math.floor(pushups / 2);

const pullups1 = Math.floor(pullups / 2);
const squats1 = Math.floor(squats / 2);
const situps1 = Math.floor(situps / 2);

const workout = document.querySelector(".header1__workout") as HTMLDivElement;
const uN = localStorage.getItem("username");

workout.innerHTML = `
    <h1 style="color:rgb(154, 182, 252);font-size:6rem; ;">Workout</h1>
    <h2 style="color:white">Hi ${uN}!</h2>
    <p>We made for you fullbody workout. <br>
    Follow the instructions and get the results!<br>
     Please save the rules and get accept from the doctor for that. <br>
    Wait at least 45 seconds between sets <br>
     and 2 minutes between the exercises . <br>
     Repeat that 3 times per week <br>
     with one-day rest between every workout. </p>
    <h3 style="color:darkgreen">Push-ups(Chest , Shoulders , Triceps)</h3> - do 4 sets of ${pushups1} reps.<br><br>
    <h3 style="color:darkgreen">Pull-ups(Upper back, Biceps)</h3> - do 4 sets of ${pullups1} reps.<br><br>
    <h3 style="color:darkgreen">Squats(Legs)</h3> - do 4 sets of ${squats1} reps.<br><br>
    <h3 style="color:darkgreen">Sit-ups(Abs)</h3> - do 4 sets of ${situps1} reps.<br><br>
    <button><a href="./index.html">Back here to update your strength level and get new workout!</a></button>`;
