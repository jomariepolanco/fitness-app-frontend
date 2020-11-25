const BASE_URL = 'http://localhost:3000/api/'

const navBar = document.querySelector(".nav-bar")
const homePage = document.querySelector("#home-page")
const workoutDiv = document.querySelector("#workouts-container")
const exercisesDiv = document.querySelector("#exercises-container")
const showExercise = document.querySelector("#show-exercise-detail")
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
    } else if (event.target.className === "exercises") {
        homePage.style.display = "none"
        workoutDiv.style.display = "none"
        exercisesDiv.style.display = ""
        statsDiv.style.display = "none"
    }
})

/***** EXERCISES LOGIC *****/

exercisesDiv.addEventListener("click", event => {
    if (event.target.tagName === "P") {
        getExerciseDetail(event.target.dataset.id)
    }
})

const getExerciseDetail = id => {
    fetch(`${BASE_URL}exercises/${id}`)
        .then(resp => resp.json())
        .then(xData => renderExerciseShow(xData))
}

const renderExerciseShow = exerciseObj => {
    // showExercise.innerHTML = ""
    const h2 = showExercise.querySelector("h2")
    h2.textContent = exerciseObj.name 
    const p = showExercise.querySelector("p")
    p.textContent = exerciseObj.description
    const video = showExercise.querySelector("iframe")
    video.src = `http://www.youtube.com/embed/${exerciseObj.video}`
    showExercise.style.display = ""
}
const renderExercise = exercise => {
    exercisesDiv.style.display = "none"
    const legs = exercisesDiv.querySelector(".legs")
    const arms = exercisesDiv.querySelector(".arms-shoulders")
    const olympic = exercisesDiv.querySelector(".olympic-weightlifting")
    const chest = exercisesDiv.querySelector(".chest")
    const back = exercisesDiv.querySelector(".back")
    const exDiv = document.createElement("div")
    exDiv.dataset.id = exercise.id 
    const p = document.createElement("p")
    p.textContent = exercise.name  
    p.dataset.id = exercise.id 
    if (exercise.category === "Legs") {
        legs.append(exDiv, p)
    } else if (exercise.category === "Arms/Shoulders") {
        arms.append(exDiv, p)
    } else if (exercise.category === "Olympic Weightlifting") {
        olympic.append(exDiv, p)
    } else if (exercise.category === "Chest") {
        chest.append(exDiv, p)
    } else if (exercise.category === "Back") {
        back.append(exDiv, p)
    }
}

const getExercises = () => {
    fetch(`${BASE_URL}/exercises`)
        .then(r => r.json())
        .then(exercises => exercises.forEach(exercise => renderExercise(exercise)))
}
getExercises()


/***** WORKOUTS LOGIC *****/

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