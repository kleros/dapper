import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { host } from 'storybook-host'

addDecorator(
  host({
    title: 'Kleros UI-Kit',
    align: 'center middle'
  })
)
configure(() => require('../stories/index.js'), module)
