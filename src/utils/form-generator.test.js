import React from 'react'
import { submit as reduxFormSubmit } from 'redux-form'

import setupIntegrationTest, {
  flushPromises
} from '../bootstrap/setup-integration-test'

import formGenerator from './form-generator'
import { required, number } from './validation'

jest.mock('..', () => ({}))

let integration = {
  store: null,
  history: null,
  dispatchSpy: null,
  mountApp: null
}

beforeEach(() => {
  integration = setupIntegrationTest({ router: { location: '/' } })
})

it('Takes a schema and returns a form component with utils.', async () => {
  const formName = 'testForm'
  const { Form, isInvalid, submit } = formGenerator(formName, {
    payment: {
      type: 'number',
      placeholder: 'Payment (ETH)',
      validate: [required, number]
    },
    timeout: {
      type: 'number',
      visibleIf: 'payment',
      validate: [required, number]
    },
    partyB: {
      type: 'text',
      formValues: 'arbitratorExtraData',
      visibleIf: 'email'
    },
    arbitratorExtraData: {
      type: 'text',
      visibleIf: '!payment'
    },
    email: {
      type: 'text'
    },
    description: {
      type: 'text'
    }
  })

  integration.mountApp(
    <Form initialValues={{ payment: 'invalid', timeout: 1000 }} />
  )
  await flushPromises()
  expect(isInvalid({})).toBe(false)
  expect(submit()).toEqual(reduxFormSubmit(formName))
})
