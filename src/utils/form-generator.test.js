import React from 'react'
import { submit as reduxFormSubmit } from 'redux-form'

import setupIntegrationTest, {
  flushPromises
} from '../bootstrap/setup-integration-test'

import { form, wizardForm } from './form-generator'
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

const schema = {
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
}

const schema2 = {
  payment2: {
    type: 'number',
    placeholder: 'Payment (ETH)',
    validate: [required, number]
  },
  timeout2: {
    type: 'number',
    visibleIf: 'payment',
    validate: [required, number]
  },
  partyB2: {
    type: 'text',
    formValues: 'arbitratorExtraData',
    visibleIf: 'email'
  },
  arbitratorExtraData2: {
    type: 'text',
    visibleIf: '!payment'
  },
  email2: {
    type: 'text'
  },
  description2: {
    type: 'text'
  }
}

const schema3 = {
  payment3: {
    type: 'number',
    placeholder: 'Payment (ETH)',
    validate: [required, number]
  },
  timeout3: {
    type: 'number',
    visibleIf: 'payment',
    validate: [required, number]
  },
  partyB3: {
    type: 'text',
    formValues: 'arbitratorExtraData',
    visibleIf: 'email'
  },
  arbitratorExtraData3: {
    type: 'text',
    visibleIf: '!payment'
  },
  email3: {
    type: 'text'
  },
  description3: {
    type: 'text'
  }
}

describe('form', () =>
  it('Takes a schema and returns a form component with utils.', async () => {
    const formName = 'testForm'
    const { Form, isInvalid, submit } = form(formName, schema)

    integration.mountApp(
      <Form initialValues={{ payment: 'invalid', timeout: 1000 }} />
    )
    await flushPromises()
    expect(isInvalid({})).toBe(false)
    expect(submit()).toEqual(reduxFormSubmit(formName))
  }))

describe('wizardForm', () =>
  it('Takes a nested schema and returns a wizard form component with utils.', async () => {
    const formName = 'testForm'
    const { Form, isInvalid, submit } = wizardForm(formName, {
      step1: schema,
      step2: schema2,
      step3: schema3
    })

    integration.mountApp(
      <Form initialValues={{ payment: 'invalid', timeout: 1000 }} />
    )
    await flushPromises()
    expect(isInvalid({})).toBe(false)
    expect(submit()).toEqual(reduxFormSubmit(formName))
  }))
