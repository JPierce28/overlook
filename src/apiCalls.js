const customersUrl = 'http://localhost:3001/api/v1/customers'
const roomsUrl = 'http://localhost:3001/api/v1/rooms'
const bookingsUrl = 'http://localhost:3001/api/v1/bookings'
const singleCustomerUrl = 'http://localhost:3001/api/v1/customers/1'

function getApiData(url) {
  const fetchedApi = fetch(url)
    .then((response) => response.json())
    .catch(error => console.log('Error: ', error))
  return fetchedApi
}

function postApiData() {
  
}

const fetchedCustomers = getApiData(customersUrl)
const fetchedRooms = getApiData(roomsUrl)
const fetchedBookings = getApiData(bookingsUrl)
const fetchedSingleCustomer = getApiData(singleCustomerUrl)

export {customersUrl, roomsUrl, bookingsUrl, singleCustomerUrl, fetchedBookings, fetchedCustomers, fetchedRooms, fetchedSingleCustomer, getApiData}