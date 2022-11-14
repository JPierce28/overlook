import './css/styles.css';
import './images/turing-logo.png'
import './images/iceland.jpg'
import BookingsList from '../src/classes/Booking-list'
import Guest from '../src/classes/guest'
import CustomerList from '../src/classes/customer-list'
import RoomsList from '../src/classes/Rooms'
import {fetchedBookings, fetchedCustomers, fetchedRooms, bookingsUrl, getApiData, postApiData, deleteApi} from './apiCalls'



// Global Variables go here
let currentGuest, allBookings, allRooms, currentDate, date, day, month, year, allCustomers

//query selectors

const myBookingsButton = document.querySelector('.my-bookings-button')
const returnHomeButton = document.querySelector('.return-home-button')
const filterButton = document.querySelector('.filter-by-type')
const calendarButton = document.querySelector('.calendar-search')
const loginButton = document.querySelector('.log-in-button')
const roomTypeSelect = document.querySelector('.select-room-type')
const defaultValue = document.querySelector('.default-value')
const calendar = document.querySelector('.calendar') 
const myBookingsPage = document.querySelector('.my-bookings')
const homePage = document.querySelector('.main-section')
const loginPage = document.querySelector('.log-in-page')
const myPastBookings = document.querySelector('.past-bookings')
const myFutureBookings = document.querySelector('.future-bookings')
const availableBookingsContainer = document.querySelector('.available-bookings-container')
const displaySpent = document.querySelector('.total-spent')
const mainHeader = document.querySelector('.main-header')
const myBookingsHeader = document.querySelector('.my-booking-header')
const displayCustomer = document.querySelector('.customer-name')
const myName = document.querySelector('.my-name')
const userNameEntry = document.querySelector('.username-entry')
const passwordEntry = document.querySelector('.password-entry')
const logInError = document.querySelector('.log-in-error-message')

//events
window.addEventListener('load', dateToday)
myBookingsButton.addEventListener('click', viewMyBookings)
returnHomeButton.addEventListener('click', returnHome)
filterButton.addEventListener('click', filterByRoomType)
calendarButton.addEventListener('click', filterByDate)
loginButton.addEventListener('click', verifyLogIn)

//event handlers


function verifyLogIn() {
  let username = userNameEntry.value
  let password = passwordEntry.value
  let userId = username[8] + username[9] 
  if(password !== 'overlook2021'){
    logInError.innerHTML = `<h1>Password is incorrect please try again! (enter: overlook2021)</h1>`
  } 
  else if(username[9] === undefined && username[8] > 0){
    return logIn(username[8])
  }
  else if(userId > 50){
    console.log("more than 50");
    logInError.innerHTML = `<h1>User Id is out of range please use a number between 1 and 50</h1>`
  }
  else if(username[8] < 1){
    logInError.innerHTML = `<h1>User Id is out of range please use a number between 1 and 50</h1>`
  }
  else if (username[8] === undefined){
    logInError.innerHTML = `<h1>User name is incorrect, make sure to type customer</h1>`
  }
  else {
    logIn(userId)
  }
}

function logIn(userId) {
  removeHidden(homePage)
  removeHidden(mainHeader)
  addHidden(loginPage)
  let singleCustomerUrl = `http://localhost:3001/api/v1/customers/${userId}`
  let fetchedSingleCustomer = getApiData(singleCustomerUrl)
  loadDate()
  getData(fetchedSingleCustomer)
}

function getData(singleUser) {
  Promise.all([fetchedCustomers, fetchedRooms, fetchedBookings, singleUser])
  .then((data) => {
    allCustomers = new CustomerList(data[0].customers)
    allRooms = new RoomsList(data[1].rooms)
    allBookings = new BookingsList(data[2].bookings)
    currentGuest = new Guest(data[3])
    loadData(allBookings, allRooms)
  })
  .catch((error) => {
    availableBookingsContainer.innerHTML = `
    <h2>Sorry, an error occured. Please refresh the page. Error: ${error}</h2>`
  }); 
}

function postBooking(addedBooking) {
  const newPost = postApiData(addedBooking)
  Promise.all([newPost])
    .then((data) => {
      console.log(data)
      return Promise.all([getApiData(bookingsUrl)])
    })
    .then((data) => {
      console.log(data)
      allBookings = new BookingsList(data[0].bookings)
      loadData(allBookings, allRooms)
    })
}

function fetchDelete(id) {
  const newDelete = deleteApi(id)
  Promise.all([newDelete])
    .then((data) => {
      console.log(data)
      return Promise.all([getApiData(bookingsUrl)])
    })
    .then((data) => {
      console.log(data)
      allBookings = new BookingsList(data[0].bookings)
      loadData(allBookings, allRooms)
      viewMyBookings()
    })
}

function loadData(bookingData, roomsData) {
  availableBookingsContainer.innerHTML = ''
  displayCustomer.innerHTML = `Signed in as: ${currentGuest.name}`
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
        <button id="${element.number}" class="book-now">Book Now</button>
      </div>`
    })
  } else if (availableBookings.length === 0) {
    availableBookingsContainer.innerHTML += `<h2>We are so sorry, we don't have any availble bookings on this day. We would still love to see you so please adjust your date and or room type filters 🙂</h2>`
    
  } else {
    availableBookings.forEach(element => {
      availableBookingsContainer.innerHTML += `
      <div class="book-room">
        <p>Date: ${currentDate}</p>
        <p id="room-number">Room Number: ${element.number}</p>
        <p>Room Type: ${element.roomType}</p>
        <p>Bidet: ${element.bidet}</p>
        <p>Cost Per Night: ${element.costPerNight}</p>
        <p>Beds: ${element.numBeds}</p>
        <button id="${element.number}" class="book-now">Book Now</button>
      </div>`
    })
  }
  const addBookingButton = document.querySelectorAll('.book-now')
  addBookingButton.forEach((button) => {
    button.addEventListener('click', addBooking)
  })
}

function viewMyBookings() {
  myPastBookings.innerHTML = ''
  myFutureBookings.innerHTML = ''
  dateToday()
  myName.innerHTML = `Signed in as: ${currentGuest.name}`
  addHidden(homePage)
  removeHidden(myBookingsPage)
  addHidden(mainHeader)
  removeHidden(myBookingsHeader)
  let allMyBookings = currentGuest.myBookings(allBookings)
  let pastBookings = allMyBookings.filter(booking => {
    return booking.date < currentDate
  })
  let futureBookings = allMyBookings.filter(booking => {
    return booking.date >= currentDate
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
        <button class="delete-booking"id="${element.id}">Cancel Booking</button>
      </div>`
  })
  const allSpent = currentGuest.totalSpent(allBookings, allRooms)
  displaySpent.innerHTML = `<h3 class="filter">Total I've Spent: $${allSpent}</h3>`
  const deleteButtons = document.querySelectorAll('.delete-booking')
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteBooking)
  })
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
        <button id="${element.number}" class="book-now">Book Now</button>
      </div>`
  })
  const addBookingButton = document.querySelectorAll('.book-now')
  addBookingButton.forEach((button) => {
    button.addEventListener('click', addBooking)
  })
}

function addBooking(event) {
  const newBooking = {'userID': currentGuest.id, date: currentDate, 'roomNumber': +event.target.id}
  postBooking(newBooking)
  roomTypeSelect.value = defaultValue.value
}

function deleteBooking(event) {
  const bookingId = event.target.id
  fetchDelete(bookingId)
}



//helper functions

function returnHome() {
  addHidden(myBookingsPage)
  removeHidden(homePage)
  removeHidden(mainHeader)
}

function dateToday() {
  date = new Date()
  day = date.getDate()
  month = date.getMonth()+1
  year = date.getFullYear()
  return currentDate = `${year}/${month}/${day}`
}

function loadDate () {
  calendar.min = `${year}-${month}-${day}`
}

function addHidden (element) {
  element.classList.add('hidden')
}

function removeHidden(element) {
  element.classList.remove('hidden')
}
