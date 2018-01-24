import React from 'react'
import { storiesOf } from '@storybook/react'

import RequiresMetaMask from '../src/components/requires-meta-mask'

storiesOf('RequiresMetaMask', module)
  .add('not found', () => <RequiresMetaMask />)
  .add('needs unlock', () => <RequiresMetaMask needsUnlock />)
