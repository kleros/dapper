import store from '../' // eslint-disable-line unicorn/import-index
import TextInput from '../components/text-input'

import createFormGenerator from './create-form-generator'

export const { form, wizardForm } = createFormGenerator(
  { text: TextInput, number: TextInput },
  store
)
