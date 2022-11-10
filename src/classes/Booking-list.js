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
      return "Hmm we dont see any bookings available on that date. Search a different day please."
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
}

export default BookingsList