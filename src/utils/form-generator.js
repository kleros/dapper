import createFormGenerator from './create-form-generator'
import store from '..'
import TextInput from '../components/text-input'

export default createFormGenerator(
  { text: TextInput, number: TextInput },
  store
)
