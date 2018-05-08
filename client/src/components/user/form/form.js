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

const UserForm = ({
  email,
  password,
  errors,
  successMessage,
  handleSubmit,
  isLoading,
  handleInputChange
}) => (
  <div>
    <Header as='h2' attached='top'>
      User Form
      <Link to='/users'>
        <Button color='black' floated='right'>List</Button>
      </Link>
    </Header>
    <Segment attached>
      <Form
        onSubmit={handleSubmit}
        loading={isLoading}
        autoComplete='off'
      >
        <Form.Input
          name='email'
          label='Email'
          width={16}
          onChange={handleInputChange}
          value={email}
        />
        <Form.Input
          type='password'
          name='password'
          label='Password'
          width={16}
          onChange={handleInputChange}
          value={password}
        />
        <Button type='submit' disabled={isLoading} color='black' icon>
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

UserForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired
}

export default UserForm
