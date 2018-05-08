import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Header, Segment, Button, Icon } from 'semantic-ui-react'

import { getDate } from '../../../utils/helpers'

const EmployeeGrid = ({
  isLoading,
  employees,
  companyId,
  handleRemove
}) => (
  <div>
    <Header as='h2' attached='top'>
      Employees List
      <Link to={`/companies/${companyId}/employees/add`}>
        <Button color='black' floated='right'>Add</Button>
      </Link>
    </Header>
    <Segment attached loading={isLoading}>
      <Table compact celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Birthdate</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell width={1} textAlign='center' />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {employees.map(item => (
            <Table.Row key={item._id}>
              <Table.Cell width={5}>
                <Link to={`/companies/${companyId}/employees/${item._id}/edit`}>{item.name}</Link>
              </Table.Cell>
              <Table.Cell width={4}>{item.user.email}</Table.Cell>
              <Table.Cell width={2}>{item.position}</Table.Cell>
              <Table.Cell width={2}>{getDate(item.birthDate)}</Table.Cell>
              <Table.Cell width={2}>{item.age === 1 ? '1 Year' : `${item.age} Years`}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Icon
                  data-js='btn-delete'
                  color='black'
                  name='trash'
                  size='large'
                  className='btn-pointer'
                  onClick={() => handleRemove(item._id)}
                  style={{ cursor: 'pointer' }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  </div>
)

EmployeeGrid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  employees: PropTypes.array.isRequired,
  companyId: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default EmployeeGrid
