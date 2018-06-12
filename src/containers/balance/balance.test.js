import setupIntegrationTest, {
  flushPromises
} from '../../bootstrap/setup-integration-test'

import Balance from '.'

let integration = {
  store: null,
  history: null,
  dispatchSpy: null,
  mountApp: null
}

beforeEach(() => {
  integration = setupIntegrationTest({ router: { location: '/' } })
})

it('Renders and loads balance correctly.', async () => {
  const app = integration.mountApp()
  await flushPromises(app)
  expect(app.find(Balance).text()).toBe(
    'Hello CryptoWorldWelcome [Identicon], You have 100 ETH.'
  )
})
