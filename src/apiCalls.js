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

function postApiData(addBooking) {
  let postData = fetch(bookingsUrl, {
    method: 'POST',
    body: JSON.stringify(addBooking),
    headers: {'content-type': 'application/json'}
  })
  .then(response => {
    if(response.ok){
      console.log('response: ', response)
      return response.json()
    } else {   
      throw new Error("Sorry, an error occured. Please refresh the page.")
    }
  })
  .catch(error => console.log('Post error:', error))
  return postData
}



const fetchedCustomers = getApiData(customersUrl)
const fetchedRooms = getApiData(roomsUrl)
const fetchedBookings = getApiData(bookingsUrl)
const fetchedSingleCustomer = getApiData(singleCustomerUrl)

export {customersUrl, roomsUrl, bookingsUrl, singleCustomerUrl, fetchedBookings, fetchedCustomers, fetchedRooms, fetchedSingleCustomer, getApiData, postApiData}