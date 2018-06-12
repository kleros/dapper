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
    type: 'text',
    placeholder: 'Payment (ETH)',
    validate: [required, number],
    props: {
      type: 'number'
    }
  },
  timeout: {
    type: 'text',
    visibleIf: 'payment',
    validate: [required, number],
    props: {
      type: 'number'
    }
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
    type: 'text',
    placeholder: 'Payment (ETH)',
    props: {
      type: 'number'
    }
  },
  timeout2: {
    type: 'text',
    visibleIf: 'payment',
    props: {
      type: 'number'
    }
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
    type: 'text',
    placeholder: 'Payment (ETH)',
    props: {
      type: 'number'
    }
  },
  timeout3: {
    type: 'text',
    visibleIf: 'payment',
    props: {
      type: 'number'
    }
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
    expect(isInvalid({})).toBe(false)
    expect(submit()).toEqual(reduxFormSubmit(formName))

    // Mount form
    const app = integration.mountApp(
      <Form initialValues={{ payment: 'invalid', timeout: 1000 }} />
    )
    await flushPromises(app)
  }))

describe('wizardForm', () =>
  it('Takes a nested schema and returns a wizard form component with utils.', async () => {
    const formName = 'testWizardForm'
    const { Form, isInvalid, submit } = wizardForm(formName, {
      step1: schema,
      step2: schema2,
      step3: schema3
    })
    expect(isInvalid({})).toBe(false)
    expect(submit()).toEqual(reduxFormSubmit(formName))

    // Handlers
    let backHandlerRef
    const getBackHandlerRef = func => (backHandlerRef = func)
    const onPageChange = jest.fn()
    const handleSubmit = jest.fn()

    // Mount wizard form
    const app = integration.mountApp(
      <Form
        initialValues={{ payment: 10, timeout: 1000 }}
        backHandlerRef={getBackHandlerRef} // eslint-disable-line react/jsx-no-bind
        onPageChange={onPageChange}
        onSubmit={handleSubmit}
      />
    )
    await flushPromises(app)
    expect(onPageChange).toHaveBeenCalledTimes(1)

    // Go to the next page
    integration.store.dispatch(submit())
    expect(onPageChange).toHaveBeenCalledTimes(2)

    // Go back to the previous page
    backHandlerRef()
    expect(onPageChange).toHaveBeenCalledTimes(3)

    // Go to the next page
    integration.store.dispatch(submit())
    expect(onPageChange).toHaveBeenCalledTimes(4)

    // Go to the next page
    integration.store.dispatch(submit())
    expect(onPageChange).toHaveBeenCalledTimes(5)

    // Submit the form
    integration.store.dispatch(submit())
    expect(onPageChange).toHaveBeenCalledTimes(5)
    expect(handleSubmit).toHaveBeenCalledTimes(1)

    // destroy() form
    app.unmount()
  }))
