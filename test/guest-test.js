import { expect } from "chai"
import BookingsList from "../src/classes/Booking-list"
import RoomsList from "../src/classes/Rooms"
import Guest from "../src/classes/guest"
import bookings from"../src/data/bookings"
import rooms from "../src/data/rooms-data"

describe("Guest", () => {
  let currentGuest, guest, allBookings, user1Bookings, allRooms
  beforeEach(() => {
    guest = {
      id: 1,
      name: "Leatha Ullrich"
      }
    allRooms = new RoomsList(rooms)
    currentGuest = new Guest(guest)
    allBookings = new BookingsList(bookings)
    user1Bookings = [
      {
        id: '5fwrgu4i7k55hl6t8',
        userID: 1,
        date: '2022/02/05',
        roomNumber: 12
      },
      {
        id: '5fwrgu4i7k55hl6x8',
        userID: 1,
        date: '2023/01/11',
        roomNumber: 20
      },
      {
        id: '5fwrgu4i7k55hl727',
        userID: 1,
        date: '2022/11/06',
        roomNumber: 22
      },
      {
        id: '5fwrgu4i7k55hl72h',
        userID: 1,
        date: '2023/12/22',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl72q',
        userID: 1,
        date: '2022/01/19',
        roomNumber: 19
      },
      {
        id: '5fwrgu4i7k55hl732',
        userID: 1,
        date: '2022/01/18',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl73g',
        userID: 1,
        date: '2022/01/26',
        roomNumber: 23
      },
      {
        id: '5fwrgu4i7k55hl75s',
        userID: 1,
        date: '2023/02/12',
        roomNumber: 13
      },
      {
        id: '5fwrgu4i7k55hl76z',
        userID: 1,
        date: '2022/02/15',
        roomNumber: 4
      },
      {
        id: '5fwrgu4i7k55hl77c',
        userID: 1,
        date: '2022/01/27',
        roomNumber: 9
      },
      {
        id: '5fwrgu4i7k55hl77i',
        userID: 1,
        date: '2022/01/22',
        roomNumber: 17
      },
      {
        id: '5fwrgu4i7k55hl77j',
        userID: 1,
        date: '2022/02/27',
        roomNumber: 24
      },
      {
        id: '5fwrgu4i7k55hl7ak',
        userID: 1,
        date: '2022/02/16',
        roomNumber: 11
      },
      {
        id: '5fwrgu4i7k55hl7bh',
        userID: 1,
        date: '2022/02/24',
        roomNumber: 6
      },
      {
        id: '5fwrgu4i7k55hl7cu',
        userID: 1,
        date: '2022/01/09',
        roomNumber: 5
      },
      {
        id: '5fwrgu4i7k55hl7fa',
        userID: 1,
        date: '2022/01/22',
        roomNumber: 23
      },
      {
        id: '5fwrgu4i7k55hl7jd',
        userID: 1,
        date: '2022/02/13',
        roomNumber: 21
      },
      {
        id: '5fwrgu4i7k55hl7ju',
        userID: 1,
        date: '2022/01/14',
        roomNumber: 14
      },
      {
        id: '5fwrgu4i7k55hl7l5',
        userID: 1,
        date: '2022/02/20',
        roomNumber: 3
      },
      {
        id: '5fwrgu4i7k55hl7st',
        userID: 1,
        date: '2022/02/19',
        roomNumber: 20
      },
      {
        id: '5fwrgu4i7k55hl7xx',
        userID: 1,
        date: '2022/02/03',
        roomNumber: 3
      },
      {
        id: '5fwrgu4i7k55hl87i',
        userID: 1,
        date: '2022/01/26',
        roomNumber: 9
      },
      {
        id: '5fwrgu4i7k55hl8bi',
        userID: 1,
        date: '2022/04/18',
        roomNumber: 3
      },
      {
        id: '5fwrgu4i7k55hl8bj',
        userID: 1,
        date: '2022/04/19',
        roomNumber: 5
      },
      {
        id: '5fwrgu4i7k55hl8dc',
        userID: 1,
        date: '2022/01/08',
        roomNumber: 17
      },
      {
        id: '5fwrgu4i7k55hl8ea',
        userID: 1,
        date: '2021/09/23',
        roomNumber: 6
      }
    ]
  })
  it("Should be a function", () => {
    expect(Guest).to.be.a("function")
  })
  it("Should have a name", () => {
    expect(currentGuest.name).to.equal(guest.name) 
  })
  it("Should have an ID", () => {
    expect(currentGuest.id).to.equal(guest.id)
  })
  it("Should have a method to show all my bookings", () => {
    expect(currentGuest.myBookings(allBookings)).to.deep.equal(user1Bookings)
  })
  it("Should have a method to show how much I've spent", () => {
    expect(currentGuest.totalSpent(allBookings, allRooms)).to.equal(5743.849999999999)
  })
})