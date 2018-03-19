import createReduxForm from 'create-redux-form'

import TextInput from '../components/text-input'

export const { form, wizardForm } = createReduxForm({ text: TextInput })
