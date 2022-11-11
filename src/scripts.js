import './css/styles.css';
import './images/turing-logo.png'
import './images/iceland.jpg'
import BookingsList from '../src/classes/Booking-list'
import rooms from '../src/data/rooms-data'
import Guest from '../src/classes/guest'
import CustomerList from '../src/classes/customer-list'
import bookings from '../src/data/bookings'
import RoomsList from '../src/classes/Rooms';


// Global Variables go here
let currentGuest, allBookings, allRooms, currentDate, date, day, month, year
const guest = {
  id: 1,
  name: "Leatha Ullrich"
  }
allBookings = new BookingsList(bookings)
allRooms = new RoomsList(rooms)
date = new Date()
day = date.getDate()
month = date.getMonth()+1
year = date.getFullYear()
currentDate = `${year}/${month}/${day}`
// currentDate = "2022/04/22"
console.log(currentDate)
//query selectors

const myBookingsButton = document.querySelector('.my-bookings-button')
const returnHomeButton = document.querySelector('.return-home-button')
const filterButton = document.querySelector('.filter-by-type')
const roomTypeSelect = document.querySelector('.select-room-type')
const myBookingsPage = document.querySelector('.my-bookings')
const homePage = document.querySelector('.main-section')
const bookingListContainer = document.querySelector('.booking-list-container')
const availableBookingsContainer = document.querySelector('.available-bookings-container')
const displaySpent = document.querySelector('.total-spent')
const mainHeader = document.querySelector('.main-header')
const myBookingsHeader = document.querySelector('.my-booking-header')

//events

window.addEventListener('load', function() { 
loadData(allBookings, allRooms)
})
myBookingsButton.addEventListener('click', viewMyBookings)
returnHomeButton.addEventListener('click', returnHome)
filterButton.addEventListener('click', filterByRoomType)


//event handlers

function loadData(bookingData, roomsData) {
  availableBookingsContainer.innerHTML = ''
  let availableBookings = bookingData.availableBookings(currentDate, roomsData)
  if(availableBookings.length === 25){
    roomsData.allRooms.forEach(element => {
      availableBookingsContainer.innerHTML += `
    <div class="book-room">
        <p>Date: ${currentDate}</p>
        <p>Room Number: ${element.number}</p>
        <p>Room Type: ${element.roomType}</p>
        <p>Bidet: ${element.bidet}</p>
        <p>Cost Per Night: ${element.costPerNight}</p>
        <p>Beds: ${element.numBeds}</p>
        <button class="book-now">Book Now</button>
      </div>`
    })
  } else {
    availableBookings.forEach(element => {
      availableBookingsContainer.innerHTML += `
      <div class="book-room">
        <p>Date: ${currentDate}</p>
        <p>Room Number: ${element.number}</p>
        <p>Room Type: ${element.roomType}</p>
        <p>Bidet: ${element.bidet}</p>
        <p>Cost Per Night: ${element.costPerNight}</p>
        <p>Beds: ${element.numBeds}</p>
        <button class="book-now">Book Now</button>
      </div>`
    })
  }
  getGuest()
}

function getGuest() {
  currentGuest = new Guest(guest)
}

function returnHome() {
  addHidden(myBookingsPage)
  removeHidden(homePage)
}

function viewMyBookings() {
  addHidden(homePage)
  removeHidden(myBookingsPage)
  addHidden(mainHeader)
  removeHidden(myBookingsHeader)
  let allMyBookings = currentGuest.myBookings(allBookings)
  allMyBookings.forEach(element => {
    bookingListContainer.innerHTML += `
      <div class="booking-list"
        <p>Date: ${element.date}</p>
        <p>Room Number: ${element.roomNumber}</p>
        <p>Booking ID: ${element.id}</p>
      </div>`
  })
  const allSpent = currentGuest.totalSpent(allBookings, allRooms)
  displaySpent.innerHTML = `<h3 class="filter">Total I've Spent: $${allSpent}</h3>`
}

function filterByRoomType() {
  let selectValue = roomTypeSelect.value
  const newSearch = allRooms.searchByType(selectValue)
  let newRooms = new RoomsList(newSearch)
  console.log(newRooms);
  loadData(allBookings, newRooms)
  if(selectValue === 'Select a Filter'){
    loadData(allBookings, allRooms)
  }
}

//helper functions

function addHidden (element) {
  element.classList.add('hidden')
}

function removeHidden(element) {
  element.classList.remove('hidden')
}
