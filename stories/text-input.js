import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TextInput from '../src/components/text-input'

storiesOf('TextInput', module).add('default', () => (
  <TextInput
    placeholder="Enter something"
    input={{ value: undefined, onChange: action('onChange') }}
    meta={{}}
  />
))
