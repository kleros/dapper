import React from 'react'
import { storiesOf } from '@storybook/react'

import Identicon from '../src/components/identicon'

storiesOf('Identicon', module).add('with placeholder seed', () => (
  <Identicon seed="Placeholder" />
))
