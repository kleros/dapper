import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { host } from 'storybook-host'
import { TypographyStyle, GoogleFont } from 'react-typography'
import typography from '../src/bootstrap/typography'

const TypographyDecorator = storyFn => (
  <div>
    <TypographyStyle typography={typography} />
    <GoogleFont typography={typography} />
    {storyFn()}
  </div>
)

addDecorator(TypographyDecorator)
addDecorator(
  host({
    title: 'Kleros UI-Kit',
    align: 'center middle'
  })
)
configure(() => require('../stories/index.js'), module)
