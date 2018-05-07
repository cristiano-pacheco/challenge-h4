import moment from 'moment'

export const getDate = date =>
  date ? date.toString().substr(0, 10) : null

export const getAgeFromDate = date =>
  moment(new Date()).diff(date, 'years').toString()
