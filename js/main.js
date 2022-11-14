//Grab DOM elements
const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movie")

populateUI()

//Variables
let ticketPrice = +movieSelect.value

//movie local storage
function setMovieData(index, value) {
   localStorage.setItem('selectedMovieIndex', index)
   localStorage.setItem('selectedMoviePrice', value)
}
//Functions
function UpdateSelectedCounts() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected")
     
    //Copy the selected seats into an array
    //Map throgh array
    //return a new array of indexes
    const seatsIndex = [...selectedSeats].map(e =>
            [...seats].indexOf(e)
    )
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

//Listen clicks on the seats

container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected")
    }

    UpdateSelectedCounts()
})

//Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex') 

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

//Listen change ont the movie select

movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    UpdateSelectedCounts()
})

//Initial count and total set
UpdateSelectedCounts()