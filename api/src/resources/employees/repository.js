'use strict'

const schema = require('../companies/schema')

class EmployeeRepository {
  constructor (schema) {
    this.schema = schema
  }

  find (id) {
    return this.schema.find({ _id: id }, { employees: 1, _id: 0 })
  }

  findCompanyById (id) {
    return this.schema.findById(id)
  }

  async findByCompanyIdAndEmployeeId (id, employeeId) {
    const company = await this.findCompanyById(id)
    if (!company) {
      return null
    }
    const employee = company.employees.find(item => {
      return JSON.stringify(item._id) === JSON.stringify(employeeId)
    })
    return employee
  }

  async findByCompanyIdAndUserId (id, userId) {
    const company = await this.findCompanyById(id)
    if (!company) {
      return null
    }
    const employee = company.employees.find(item => {
      return JSON.stringify(item.user._id) === JSON.stringify(userId)
    })
    return employee
  }

  async addEmployee (id, employee) {
    let employees = await this.getEmployees(id)

    employees.push(employee)

    await this.updateEmployees(id, employees)

    return employees[employees.length - 1] // returns the employee that was created
  }

  async updateEmployee (id, employeeId, data) {
    const company = await this.schema.findById(id)

    const employees = company.employees.map(item => {
      if (JSON.stringify(item._id) === JSON.stringify(employeeId)) {
        return {
          _id: item._id,
          ...data
        }
      }
      return item
    })

    await this.updateEmployees(id, employees)
  }

  async remove (id, employeeId) {
    let employees = await this.getEmployees(id)

    employees = employees.filter(item => {
      if (JSON.stringify(item._id) !== JSON.stringify(employeeId)) {
        return item
      }
    })

    return this.updateEmployees(id, employees)
  }

  async getEmployees (companyId) {
    return (await this.schema.findById(companyId)).employees
  }

  updateEmployees (companyId, employees) {
    return this.schema.update({ _id: companyId }, { $set: { employees } })
  }
}

module.exports = {
  EmployeeRepositoryClass: EmployeeRepository,
  EmployeeRepository: new EmployeeRepository(schema)
}
