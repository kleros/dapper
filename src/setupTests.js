// eslint-disable-next-line unicorn/filename-case
import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

configure({ adapter: new Adapter() })

jest.mock('./components/identicon', () => props => <div>[Blockies]</div>)
