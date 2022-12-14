import { render, screen, waitFor } from '@redwoodjs/testing/web'

import FatalErrorPage from './FatalErrorPage'

describe('FatalErrorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FatalErrorPage />)
    }).not.toThrow()
  })
  it('renders "Something went wrong"', async () => {
    render(<FatalErrorPage />)
    await waitFor(() => {
      expect(screen.queryByText('Something went wrong')).toBeInTheDocument()
    })
  })
})
