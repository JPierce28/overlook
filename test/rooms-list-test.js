import { expect } from "chai"
import RoomsList from "../src/classes/Rooms"
import rooms from"../src/data/rooms-data"

describe("RoomsList", () => {
  let roomsList, juniorSuites
  beforeEach(() => {
    roomsList = new RoomsList(rooms)
    juniorSuites = [rooms[5], rooms[7], rooms[16], rooms[17]]
  })
  it('Should be a function', () => {
    expect(RoomsList).to.be.a("function")
  })
  it('Should store all rooms data', () => {
    expect(roomsList.allRooms).to.deep.equal(rooms)
  })
  it('Should be able to filter rooms by roomType', () => {
    let availableRooms = roomsList.searchByType("junior suite")
    expect(availableRooms).to.deep.equal(juniorSuites)
  })
  it('Should be able to filter by room number', () => {
    let availableRooms = roomsList.searchByNumber(10)
    expect(availableRooms).to.equal(rooms[9])
  })
  it('Should let the user know if no rooms match that number', () => {
    let availableRooms = roomsList.searchByNumber(1000)
    expect(availableRooms).to.equal("Sorry no rooom number matches that search try to use a number between 1-25.")
  })
})