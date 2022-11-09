import { expect } from "chai"
import CustomerList from "../src/classes/customer-list"
import customers from"../src/data/customer-data"

describe("CustomerList", () => {
  let customerList
  beforeEach(() => {
    customerList = new CustomerList(customers)
  })
  it('Should be a function', () => {
    expect(CustomerList).to.be.a("function")
  })
  it('Should be able to take in multiple customers', () => {
    expect(customerList.customers).to.deep.equal(customers)
  })
  it('Should be able to filter by name', () => {
    let customer = customerList.filterByName("Rocio Schuster")
    expect(customer).to.equal(customers[1])
  })
  it('Should let you know if that name does not exist', () => {
    let customer = customerList.filterByName("Ricky Bobby")
    expect(customer).to.equal('Sorry we could not find that customer, try another name!')
  })
  it('Should be able to filter by id', () => {
    let customer = customerList.filterById(3)
    expect(customer).to.equal(customers[2])
  })
  it('Should let you know if that id does not exist', () => {
    let customer = customerList.filterById('51')
    expect(customer).to.equal('Sorry we could not find that customer, try another id!')
  })
})