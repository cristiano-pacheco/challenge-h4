import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
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
import { cnpjMask } from '../../../utils/masks'

const CompanyForm = ({
  name,
  cnpj,
  errors,
  successMessage,
  handleSubmit,
  isLoading,
  handleInputChange
}) => (
  <div>
    <Header as='h2' attached='top'>
      Company Form
      <Link to='/companies'>
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
          name='name'
          label='Name'
          width={16}
          onChange={handleInputChange}
          value={name}
        />
        <Form.Input
          label='CNPJ'
          children={
            <MaskedInput
              mask={cnpjMask()}
              placeholder='00.000.000/0000-00'
              name='cnpj'
              onChange={handleInputChange}
              value={cnpj}
            />
          }
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

CompanyForm.propTypes = {
  name: PropTypes.string.isRequired,
  cnpj: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired
}

export default CompanyForm
