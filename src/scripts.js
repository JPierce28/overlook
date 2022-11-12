import './css/styles.css';
import './images/turing-logo.png'
import './images/iceland.jpg'
import BookingsList from '../src/classes/Booking-list'
import Guest from '../src/classes/guest'
import CustomerList from '../src/classes/customer-list'
import RoomsList from '../src/classes/Rooms'
import {fetchedBookings, fetchedCustomers, fetchedRooms, fetchedSingleCustomer,  customersUrl, roomsUrl, bookingsUrl, singleCustomerUrl, getApiData} from './apiCalls'



// Global Variables go here
let currentGuest, allBookings, allRooms, currentDate, date, day, month, year, allCustomers

date = new Date()
day = date.getDate()
month = date.getMonth()+1
year = date.getFullYear()
currentDate = `${year}/${month}/${day}`


//query selectors

const myBookingsButton = document.querySelector('.my-bookings-button')
const returnHomeButton = document.querySelector('.return-home-button')
const filterButton = document.querySelector('.filter-by-type')
const calendarButton = document.querySelector('.calendar-search')
const roomTypeSelect = document.querySelector('.select-room-type')
const calendar = document.querySelector('.calendar') 
const myBookingsPage = document.querySelector('.my-bookings')
const homePage = document.querySelector('.main-section')
const myPastBookings = document.querySelector('.past-bookings')
const myFutureBookings = document.querySelector('.future-bookings')
const availableBookingsContainer = document.querySelector('.available-bookings-container')
const displaySpent = document.querySelector('.total-spent')
const mainHeader = document.querySelector('.main-header')
const myBookingsHeader = document.querySelector('.my-booking-header')

//events

window.addEventListener('load', function() { 
getData(),
loadDate()
})
myBookingsButton.addEventListener('click', viewMyBookings)
returnHomeButton.addEventListener('click', returnHome)
filterButton.addEventListener('click', filterByRoomType)
calendarButton.addEventListener('click', filterByDate)


//event handlers
function loadDate () {
  calendar.min = `${year}-${month}-${day}`
}

function getData() {
  Promise.all([fetchedCustomers, fetchedRooms, fetchedBookings, fetchedSingleCustomer])
  .then((data) => {
    allCustomers = new CustomerList(data[0].customers)
    allRooms = new RoomsList(data[1].rooms)
    allBookings = new BookingsList(data[2].bookings)
    currentGuest = new Guest(data[3])
    loadData(allBookings, allRooms)
  })
  .catch((error) => console.log(error))
}

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
}

function viewMyBookings() {
  addHidden(homePage)
  removeHidden(myBookingsPage)
  addHidden(mainHeader)
  removeHidden(myBookingsHeader)
  let allMyBookings = currentGuest.myBookings(allBookings)
  let pastBookings = allMyBookings.filter(booking => {
    return booking.date < currentDate
  })
  let futureBookings = allMyBookings.filter(booking => {
    return booking.date > currentDate
  })
  pastBookings.forEach(element => {
    myPastBookings.innerHTML += `
      <div class="booking-list"
        <p>Date: ${element.date}</p>
        <p>Room Number: ${element.roomNumber}</p>
        <p>Booking ID: ${element.id}</p>
      </div>`
  })
  futureBookings.forEach(element => {
    myFutureBookings.innerHTML += `
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
  loadData(allBookings, newRooms)
  if(selectValue === 'Select a Filter'){
    loadData(allBookings, allRooms)
  }
}

function filterByDate() {
  let searchDate = calendar.value
  currentDate = searchDate.replaceAll('-', '/')
  let filteredDate = allBookings.availableBookings(currentDate, allRooms)
  availableBookingsContainer.innerHTML = ''
  filteredDate.forEach(element => {
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

function returnHome() {
  addHidden(myBookingsPage)
  removeHidden(homePage)
  removeHidden(mainHeader)
}

//helper functions



function addHidden (element) {
  element.classList.add('hidden')
}

function removeHidden(element) {
  element.classList.remove('hidden')
}
