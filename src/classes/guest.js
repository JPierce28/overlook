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
      return room.roomNumber
    })
    let roomNumber = rooms.allRooms.filter(num => {
      return myRooms.includes(num.number)
    })
    let amount = roomNumber.reduce((acc, nextRoom) => {
      return acc += nextRoom.costPerNight
    },0)
    return amount
  }
}





export default Guest