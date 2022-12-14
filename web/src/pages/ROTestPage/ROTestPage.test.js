import { render } from '@redwoodjs/testing/web'

import RoTestPage from './RoTestPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RoTestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RoTestPage />)
    }).not.toThrow()
  })
})
