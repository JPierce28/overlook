class BookingsList {
  constructor(allBookings) {
    this.allBookings = allBookings
  }
  searchByDate(dateChoosen) {
    let filteredBookings = this.allBookings.filter(day => {
      if(day.date.includes(dateChoosen)){
        return day
      }  
    })
    if(filteredBookings.length === 0){
      return "No bookings"
    } else {
      return filteredBookings
    }
  }
  searchByUser(id) {
    let filteredUser = this.allBookings.filter(booking => {
      return booking.userID === id
    })
    if(filteredUser.length === 0) {
      return "Hmm we cant seem to find any bookings for that user."
    } else {
      return filteredUser
    }
  }
  searchByRoom(roomNum) {
    let filteredRoom = this.allBookings.filter(room => {
      return room.roomNumber === roomNum
    })
    if(filteredRoom.length === 0) {
      return "Hmm we cant seem to find that room number. Try searching a different room number."
    } else {
      return filteredRoom
    }
  }
  availableBookings(dateChoosen, rooms) {
    let today = this.searchByDate(dateChoosen)
    if(today === "No bookings"){
      return rooms.allRooms
    } else {
    let bookingRoom = today.map(booking => {
      return booking.roomNumber
    })
    let allRoom = rooms.allRooms.filter(room => {
      return !bookingRoom.includes(room.number)
    })
    return allRoom
    }
  }
}

export default BookingsList