import { render, screen, waitFor } from '@redwoodjs/testing/web'

import LandingPage from './LandingPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LandingPage', () => {
  /*const onSub = jest.fn()
  beforeEach(() => {
    onSub.mockClear()
    //render(<LandingPage />)
  })*/

  it('renders successfully', () => {
    expect(() => {
      render(<LandingPage />)
    }).not.toThrow()
  })

  it('Renders Sign In button when logged in', async () => {
    render(<LandingPage />)
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Log In 🖋' })
      ).toBeInTheDocument()
    })
  })

  it('Renders Log Out button when logged in', async () => {
    mockCurrentUser({ name: 'Michael' })
    render(<LandingPage />)

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Log Out 👋' })
      ).toBeInTheDocument()
    })
  })
})
