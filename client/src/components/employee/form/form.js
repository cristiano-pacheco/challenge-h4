import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  Form,
  Header,
  Segment,
  Button,
  Icon
} from 'semantic-ui-react'

import If from '../../common/if'
import ErrorMessage from '../../common/error-messages'
import SuccessMessage from '../../common/success-message'

const positions = [
  { value: 'DEVELOPER', text: 'DEVELOPER' },
  { value: 'ANALYST', text: 'ANALYST' },
  { value: 'DIRECTOR', text: 'DIRECTOR' }
]

const EmployeeForm = ({
  users,
  user,
  name,
  position,
  birthDate,
  companyId,
  errors,
  successMessage,
  handleSubmit,
  isLoading,
  handleInputChange,
  handleSelectChange
}) => (
  <div>
    <Header as='h2' attached='top'>
      Employee Form
      <Link to={`/companies/${companyId}/employees`}>
        <Button primary floated='right'>List</Button>
      </Link>
    </Header>
    <Segment attached>
      <Form
        onSubmit={handleSubmit}
        loading={isLoading}
        autoComplete='off'
      >
        <Form.Select
          fluid
          label='Email'
          name='user'
          options={users}
          placeholder='Email'
          value={user}
          onChange={handleSelectChange}
        />
        <Form.Group>
          <Form.Input
            name='name'
            label='Name'
            width={10}
            onChange={handleInputChange}
            value={name}
          />
          <Form.Input
            label='Birth Date'
            type='date'
            name='birthDate'
            onChange={handleInputChange}
            value={birthDate}
          />
          <Form.Select
            fluid
            search
            label='Position'
            name='position'
            width={3}
            options={positions}
            placeholder='Position'
            value={position}
            onChange={handleSelectChange}
          />
        </Form.Group>
        <Button type='submit' disabled={isLoading} primary icon>
          <Icon name='save' /> Save
        </Button>
      </Form>
      <If test={!!errors.length}>
        <ErrorMessage errors={errors} />
      </If>
      <If test={!!successMessage.length}>
        <SuccessMessage message={successMessage} />
      </If>
    </Segment>
  </div>
)

EmployeeForm.propTypes = {
  users: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  companyId: PropTypes.string,
  errors: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired
}

export default EmployeeForm
