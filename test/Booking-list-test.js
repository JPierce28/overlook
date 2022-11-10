import { expect } from "chai"
import BookingsList from "../src/classes/Booking-list"
import bookings from"../src/data/bookings"

describe("BookingsList", () => {
  let bookingList, newDate, dateBookings, userBookings, userRooms
  beforeEach(() => {
    bookingList = new BookingsList(bookings)
    newDate = "2022/04/22"
    dateBookings = [
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 9,
        date: '2022/04/22',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl8dq',
        userID: 36,
        date: '2022/04/22',
        roomNumber: 23
      }
    ]
    userBookings = [
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 9,
        date: '2022/04/22',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6vu',
        userID: 9,
        date: '2022/01/16',
        roomNumber: 23
      },
      {
        id: '5fwrgu4i7k55hl6wn',
        userID: 9,
        date: '2022/01/30',
        roomNumber: 25
      },
      {
        id: '5fwrgu4i7k55hl6x4',
        userID: 9,
        date: '2022/01/27',
        roomNumber: 6
      },
      {
        id: '5fwrgu4i7k55hl6xk',
        userID: 9,
        date: '2022/01/31',
        roomNumber: 11
      },
      {
        id: '5fwrgu4i7k55hl6xt',
        userID: 9,
        date: '2022/01/27',
        roomNumber: 7
      },
      {
        id: '5fwrgu4i7k55hl6xz',
        userID: 9,
        date: '2022/02/03',
        roomNumber: 11
      },
      {
        id: '5fwrgu4i7k55hl6zh',
        userID: 9,
        date: '2022/02/16',
        roomNumber: 23
      },
      {
        id: '5fwrgu4i7k55hl6zz',
        userID: 9,
        date: '2022/01/13',
        roomNumber: 6
      },
      {
        id: '5fwrgu4i7k55hl70i',
        userID: 9,
        date: '2022/02/22',
        roomNumber: 10
      },
      {
        id: '5fwrgu4i7k55hl719',
        userID: 9,
        date: '2022/02/23',
        roomNumber: 7
      },
      {
        id: '5fwrgu4i7k55hl75k',
        userID: 9,
        date: '2022/01/22',
        roomNumber: 10
      },
      {
        id: '5fwrgu4i7k55hl75u',
        userID: 9,
        date: '2022/01/15',
        roomNumber: 8
      },
      {
        id: '5fwrgu4i7k55hl77a',
        userID: 9,
        date: '2022/01/27',
        roomNumber: 19
      },
      {
        id: '5fwrgu4i7k55hl78a',
        userID: 9,
        date: '2022/02/11',
        roomNumber: 25
      },
      {
        id: '5fwrgu4i7k55hl792',
        userID: 9,
        date: '2022/01/10',
        roomNumber: 19
      },
      {
        id: '5fwrgu4i7k55hl7bs',
        userID: 9,
        date: '2023/11/24',
        roomNumber: 16
      },
      {
        id: '5fwrgu4i7k55hl7cy',
        userID: 9,
        date: '2023/12/10',
        roomNumber: 11
      },
      {
        id: '5fwrgu4i7k55hl7fn',
        userID: 9,
        date: '2022/01/29',
        roomNumber: 8
      },
      {
        id: '5fwrgu4i7k55hl7i9',
        userID: 9,
        date: '2022/01/30',
        roomNumber: 6
      },
      {
        id: '5fwrgu4i7k55hl7q2',
        userID: 9,
        date: '2022/01/24',
        roomNumber: 10
      },
      {
        id: '5fwrgu4i7k55hl7u1',
        userID: 9,
        date: '2022/01/31',
        roomNumber: 22
      },
      {
        id: '5fwrgu4i7k55hl7u2',
        userID: 9,
        date: '2022/02/18',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7ux',
        userID: 9,
        date: '2022/02/07',
        roomNumber: 13
      }
    ]
    userRooms = [
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 9,
        date: '2022/04/22',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6th',
        userID: 19,
        date: '2022/02/26',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6v1',
        userID: 25,
        date: '2022/02/08',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6vm',
        userID: 32,
        date: '2022/01/16',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6w2',
        userID: 14,
        date: '2023/11/26',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6wi',
        userID: 47,
        date: '2022/02/20',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6wj',
        userID: 11,
        date: '2022/01/12',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6xr',
        userID: 15,
        date: '2023/12/09',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6yy',
        userID: 31,
        date: '2022/02/25',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl6zo',
        userID: 5,
        date: '2022/02/19',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl70l',
        userID: 43,
        date: '2022/02/01',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl72h',
        userID: 1,
        date: '2023/12/22',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl732',
        userID: 1,
        date: '2022/01/18',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl734',
        userID: 37,
        date: '2022/01/11',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl73e',
        userID: 30,
        date: '2022/02/02',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl73r',
        userID: 28,
        date: '2022/02/21',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl748',
        userID: 6,
        date: '2022/01/09',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl74i',
        userID: 3,
        date: '2023/01/13',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl74u',
        userID: 43,
        date: '2022/01/15',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl76b',
        userID: 41,
        date: '2023/12/15',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl78b',
        userID: 46,
        date: '2022/02/06',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7b6',
        userID: 18,
        date: '2022/01/19',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7bk',
        userID: 23,
        date: '2022/01/27',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7cl',
        userID: 19,
        date: '2022/01/28',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7e5',
        userID: 6,
        date: '2023/11/29',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7if',
        userID: 41,
        date: '2022/01/25',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7jo',
        userID: 4,
        date: '2022/01/17',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7m0',
        userID: 17,
        date: '2022/02/03',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7n1',
        userID: 12,
        date: '2023/11/14',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7u2',
        userID: 9,
        date: '2022/02/18',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7vs',
        userID: 39,
        date: '2022/01/20',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7x0',
        userID: 26,
        date: '2022/02/05',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl7yw',
        userID: 4,
        date: '2022/02/24',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl805',
        userID: 23,
        date: '2022/01/10',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl831',
        userID: 15,
        date: '2022/01/08',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl867',
        userID: 19,
        date: '2022/01/23',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl8ah',
        userID: 25,
        date: '2022/02/07',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl8bn',
        userID: 28,
        date: '2022/02/14',
        roomNumber: 15
      },
      {
        id: '5fwrgu4i7k55hl8ch',
        userID: 27,
        date: '2022/02/13',
        roomNumber: 15
      }
    ]
    
    
  })
  it('Should be a function', () => {
    expect(BookingsList).to.be.a("function")
  })
  it('Should hold an array of all bookings', () => {
    expect(bookingList.allBookings).to.deep.equal(bookings)
  })
  it('Should be able to filter bookings by date', () => {
    let filterDate = bookingList.searchByDate(newDate)
    expect(filterDate).to.deep.equal(dateBookings)
  })
  it('Should let you know if there are no bookings that day', () => {
    let filterDate = bookingList.searchByDate("2055/04/22")
    expect(filterDate).to.equal("Hmm we dont see any bookings available on that date. Search a different day please.")
  })
  it('Should be able to filter bookings by user ID', () => {
    let filterUser = bookingList.searchByUser(9)
    expect(filterUser).to.deep.equal(userBookings)
  })
  it('Should let you know if there are no bookings with that user ID', () => {
    let filterUser = bookingList.searchByUser(100)
    expect(filterUser).to.equal("Hmm we cant seem to find any bookings for that user.")
  })
  it('Should be able to filter bookings by room number', () => {
    let filterRoom = bookingList.searchByRoom(15)
    expect(filterRoom).to.deep.equal(userRooms)
  })
  it('Should let you know if there are no bookings with that room number', () => {
    let filterRoom = bookingList.searchByRoom(1000)
    expect(filterRoom).to.equal("Hmm we cant seem to find that room number. Try searching a different room number.")
  })
})