/* Sample Form Creation */
import { formGenerator } from '../components'

export const {
  Form: CreateForm,
  isInvalid: getCreateIsInvalid,
  submit: submitCreate
} = formGenerator('createFormKey', {
  payment: {
    type: 'number',
    placeholder: 'Payment (ETH)'
  },
  timeout: {
    type: 'number'
  },
  partyB: {
    type: 'text'
  },
  arbitratorExtraData: {
    type: 'text'
  },
  email: {
    type: 'text'
  },
  description: {
    type: 'text'
  }
})
