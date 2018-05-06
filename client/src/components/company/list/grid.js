import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Header, Segment, Button, Icon } from 'semantic-ui-react'

const CompanyGrid = ({ isLoading, companies, handleRemove }) => (
  <div>
    <Header as='h2' attached='top'>
      Companies List
      <Link to='/companies/add'>
        <Button primary floated='right'>Add</Button>
      </Link>
    </Header>
    <Segment attached loading={isLoading}>
      <Table compact celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Cnpj</Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>Total Employees</Table.HeaderCell>
            <Table.HeaderCell width={1} textAlign='center' />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {companies.map(item => (
            <Table.Row key={item._id}>
              <Table.Cell width={10}>
                <Link to={`/companies/${item._id}/edit`}>{item.name}</Link>
              </Table.Cell>
              <Table.Cell width={3}>{item.cnpj}</Table.Cell>
              <Table.Cell width={2} textAlign='center'>{item.employees.length}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Icon
                  data-js='btn-delete'
                  color='red'
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

CompanyGrid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  companies: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default CompanyGrid
