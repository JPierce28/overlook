import { expect } from "chai"
import CustomerList from "../src/classes/customer-list"
import customers from "../src/data/customer-data"

describe("CustomerList", () => {
  let customers, customerList
  beforeEach(() => {
    customerList = new CustomerList(customers)
  })
  it('Should be a function', () => {
    expect(CustomerList).to.be.a("function")
  })
})