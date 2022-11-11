class Guest{
  constructor(customer) {
    this.name = customer.name
    this.id = customer.id
  }
  myBookings(bookings) {
    return bookings.searchByUser(this.id)
  }
  totalSpent(bookings, rooms) {
    let allBookings = this.myBookings(bookings)
    let myRooms = allBookings.map(room => {
      let roomNumber = rooms.allRooms.filter(num => {
        return num.number === room.roomNumber
      })
      return roomNumber
    })
    let amount = myRooms.reduce((acc, nextRoom) => {
      return acc += nextRoom[0].costPerNight
    },0)
    return amount
  }
}





export default Guest