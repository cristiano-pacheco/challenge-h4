import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Grid, Header } from 'semantic-ui-react'

import './style.css'
import ErrorMessages from '../../common/error-messages'

const LoginForm = ({
  email,
  password,
  isLoading,
  errors,
  handleChange,
  handleSubmit
}) => (
  <div className='login-form'>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log-in to your account
        </Header>
        <Form className='attached segment fluid' size='large' loading={isLoading} autocomplete='off'>
          <Form.Input
            fluid
            name='email'
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
            onChange={handleChange}
          />
          <Form.Input
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={handleChange}
          />
          <Button
            fluid
            color='teal'
            size='large'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Login
          </Button>
        </Form>
        <ErrorMessages attached='bottom' errors={errors} />
      </Grid.Column>
    </Grid>
  </div>
)

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
