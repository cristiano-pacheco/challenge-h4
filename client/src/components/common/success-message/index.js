import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

const SuccessMessage = ({ message }) => (
  <Message icon='checkmark' positive header={message} />
)

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default SuccessMessage
