class CustomerList {
  constructor(customers){
    this.customers = customers
  }
  filterByName(customerName) {
    let name = this.customers.find(customer => {
      return customer.name === customerName
    })
    if(name){
      return name
    } else {
    return 'Sorry we could not find that customer, try another name!'
    }
  }
  filterById(customerId) {
    let id = this.customers.find(customer => {
      return customerId === customer.id
    })
    if(id){
      return id
    } else {
      return 'Sorry we could not find that customer, try another id!'
    }
  }
}





export default CustomerList