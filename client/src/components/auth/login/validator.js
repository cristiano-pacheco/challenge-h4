import Validator from 'validator'

const ValidateForm = fields => {
  let errors = []

  if (!Validator.isEmail(fields.email)) {
    errors.push('Invalid Email')
  }

  if (Validator.isEmpty(fields.password)) {
    errors.push('Password is required')
  }

  return errors
}

export default ValidateForm
