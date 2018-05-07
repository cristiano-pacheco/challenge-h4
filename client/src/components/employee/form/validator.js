import Validator from 'validator'

const ValidateForm = fields => {
  let errors = []

  if (Validator.isEmpty(fields.user)) {
    errors.push('Email is required')
  }

  if (Validator.isEmpty(fields.name)) {
    errors.push('Name is required')
  }

  if (Validator.isEmpty(fields.position)) {
    errors.push('Position is required')
  }

  if (Validator.isEmpty(fields.birthDate)) {
    errors.push('Birth Date is required')
  }

  return errors
}

export default ValidateForm
