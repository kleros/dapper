import store from '../' // eslint-disable-line unicorn/import-index
import TextInput from '../components/text-input'

import createFormGenerator from './create-form-generator'

export default createFormGenerator(
  { text: TextInput, number: TextInput },
  store
)
