import Validator from 'validator'
import * as cnpj from '@fnando/cnpj'

const ValidateForm = fields => {
  let errors = []

  if (Validator.isEmpty(fields.name)) {
    errors.push('Name is required')
  }

  if (!cnpj.isValid(fields.cnpj)) {
    errors.push('CNPJ is invalid')
  }
  console.log(fields.cnpj)
  return errors
}

export default ValidateForm
