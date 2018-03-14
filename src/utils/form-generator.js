import createReduxForm from 'create-redux-form'

import store from '../' // eslint-disable-line unicorn/import-index
import TextInput from '../components/text-input'

export const { form, wizardForm } = createReduxForm(
  { text: TextInput, number: TextInput },
  store
)
