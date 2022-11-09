class RoomsList {
  constructor(allRooms) {
    this.allRooms = allRooms
  }
  searchByType(typeSearch) {
    let roomSearch = this.allRooms.filter(room => {
      return room.roomType === typeSearch
    })
    return roomSearch
  }
  searchByNumber(numberSearch) {
    let roomNumberSearch = this.allRooms.find(room => {
      return room.number === numberSearch
    })
    if(roomNumberSearch){
      return roomNumberSearch
    } else {
      return "Sorry no rooom number matches that search try to use a number between 1-25."
    }
  }
}
export default RoomsList