import { render, screen, waitFor } from '@redwoodjs/testing/web'

import AuthCallbackPage from './AuthCallbackPage'

describe('AuthCallbackPahe', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthCallbackPage />)
    }).not.toThrow()
  })

  it('Checks Auth successfully', async () => {
    mockCurrentUser({id: 1, email: 'test@test.test', gCalSynceEnable: true})
    expect(() => {
      render(<AuthCallbackPage />)
    }).not.toThrow()
  })
})
