import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../src/components/button'

storiesOf('Button', module)
  .add('primary', () => <Button onClick={action('onClick')}>CLICK ME</Button>)
  .add('with lots of text', () => (
    <Button onClick={action('onClick')}>CLICK ME, CLICK ME, CLICK ME</Button>
  ))
