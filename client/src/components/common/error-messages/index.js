import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

import If from '../if'

const ErrorMessages = ({ errors, attached }) => (
  <If test={!!errors.length}>
    <Message attached={attached} error>
      {errors.map((err, index) => (
        <Message.Item key={index}>{err}</Message.Item>
      ))}
    </Message>
  </If>
)

ErrorMessages.propTypes = {
  errors: PropTypes.array.isRequired
}

export default ErrorMessages
