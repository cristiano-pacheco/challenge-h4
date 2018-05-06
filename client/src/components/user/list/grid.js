import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Header, Segment, Button, Icon } from 'semantic-ui-react'

const UserGrid = ({ isLoading, users, handleRemove }) => (
  <div>
    <Header as='h2' attached='top'>
      Users List
      <Link to='/users/add'>
        <Button primary floated='right'>Add</Button>
      </Link>
    </Header>
    <Segment attached loading={isLoading}>
      <Table compact celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell width={1} textAlign='center' />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(item => (
            <Table.Row key={item._id}>
              <Table.Cell>
                <Link to={`/edit/${item._id}`}>{item.email}</Link>
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Icon
                  data-js='btn-delete'
                  color='red'
                  size='large'
                  name='trash'
                  className='btn-pointer'
                  onClick={() => handleRemove(item.id)}
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

UserGrid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default UserGrid
