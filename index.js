const BASE_URL = 'http://localhost:3000/api/'

const navBar = document.querySelector(".nav-bar")
const homePage = document.querySelector("#home-page")
const workoutDiv = document.querySelector("#workouts-container")
const exercisesDiv = document.querySelector("#exercises-container")
const statsDiv = document.querySelector("#stats-container")
workoutDiv.style.display = "none"


navBar.addEventListener("click", event => {
    if (event.target.className === "workouts") {
        workoutDiv.style.display = ""
        homePage.style.display = "none"
        exercisesDiv.style.display = "none"
        statsDiv.style.display = "none"
    } else if (event.target.className === "home") {
        homePage.style.display = ""
        workoutDiv.style.display = "none"
        exercisesDiv.style.display = "none"
        statsDiv.style.display = "none"
    }
})
workoutDiv.addEventListener("click", event => {
    if (event.target.nextElementSibling.style.display === "none") {
        event.target.nextElementSibling.style.display = ""
    } else {
        event.target.nextElementSibling.style.display = "none"
    }
})

const renderWorkout = workout => {
    const woDiv = document.createElement("div")
    woDiv.dataset.id = workout.id 
    const h2 = document.createElement("h2")
    h2.textContent = workout.title 
    const exerciseUl = document.createElement("ul")
    exerciseUl.dataset.id = workout.id 
    exerciseUl.style.display = "none"
    workout.exercises.forEach(ex => {
        const li = document.createElement("li")
        li.textContent = ex.name
        exerciseUl.append(li)
    })
    woDiv.append(h2, exerciseUl)
    workoutDiv.append(woDiv)
}


const fetchWorkoutsGet = () => {
    return fetch(`${BASE_URL}workouts`)
    .then(response => response.json())
    .then(workouts => workouts.forEach(workout => renderWorkout(workout)))
}
fetchWorkoutsGet()












// read - fetch workouts

// create workouts

//delete workout

//update workout