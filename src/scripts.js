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
let currentGuest, allBookings, allRooms
const guest = {
  id: 1,
  name: "Leatha Ullrich"
  }
allBookings = new BookingsList(bookings)
allRooms = new RoomsList(rooms)

//query selectors

const myBookingsButton = document.querySelector('.my-bookings-button')
const returnHomeButton = document.querySelector('.return-home-button')
const myBookingsPage = document.querySelector('.my-bookings')
const homePage = document.querySelector('.main-section')
const bookingListContainer = document.querySelector('.booking-list-container')
const displaySpent = document.querySelector('.total-spent')
const mainHeader = document.querySelector('.main-header')
const myBookingsHeader = document.querySelector('.my-booking-header')
//events

window.addEventListener('load', getGuest)
myBookingsButton.addEventListener('click', viewMyBookings)
returnHomeButton.addEventListener('click', returnHome)


//event handlers

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


//helper functions

function addHidden (element) {
  element.classList.add('hidden')
}

function removeHidden(element) {
  element.classList.remove('hidden')
}
