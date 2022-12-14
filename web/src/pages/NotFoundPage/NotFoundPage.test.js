import { render, screen } from '@redwoodjs/testing/web'

import NotFoundPage from './NotFoundPage'

describe('NotFoundPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotFoundPage />)
    }).not.toThrow()
  })
  it('shows not found error', () => {
    render(<NotFoundPage />)
    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument()
  })
})
