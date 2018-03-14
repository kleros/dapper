import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '@dump247/storybook-state'

import TextInput from '../src/components/text-input'

const render = store => (
  <TextInput
    {...store.state}
    input={{
      ...store.state.input,
      onChange: event =>
        store.set({
          input: { value: event.currentTarget.value, onChange: null }
        })
    }}
  />
)

storiesOf('Text Input', module)
  .add(
    'default',
    withState(
      {
        input: { value: '', onChange: null },
        meta: { valid: undefined, touched: undefined, error: undefined },
        placeholder: 'EMAIL'
      },
      render
    )
  )
  .add(
    'touched',
    withState(
      {
        input: { value: '', onChange: null },
        meta: { valid: undefined, touched: true, error: undefined },
        placeholder: 'EMAIL'
      },
      render
    )
  )
  .add(
    'valid',
    withState(
      {
        input: { value: '', onChange: null },
        meta: { valid: true, touched: undefined, error: undefined },
        placeholder: 'EMAIL'
      },
      render
    )
  )
  .add(
    'error',
    withState(
      {
        input: { value: '', onChange: null },
        meta: {
          valid: undefined,
          touched: undefined,
          error: 'Please enter a valid email.'
        },
        placeholder: 'EMAIL'
      },
      render
    )
  )
