import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import ResetPasswordPageTEST from './ResetPasswordPageTEST'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('ResetPasswordPageTEST', () => {
  const onSub = jest.fn()

  beforeEach(() => {
    onSub.mockClear()
    render(<ResetPasswordPageTEST onSubmit={onSub} />)
  })

  it('on proper submit, toast notifications can be displayed', async () => {
    const passwordField = screen.getByLabelText(/New Password/i)
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    })

    await waitFor(() => userEvent.type(passwordField, 'password123'))
    await waitFor(() => userEvent.click(submitButton))

    expect(await screen.findByText('Password changed!')).toBeInTheDocument()
  })

  it('With new password, properly submits', async () => {
    console.log = jest.fn()
    const passwordField = screen.getByLabelText(/New Password/i)
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    })

    await waitFor(() => userEvent.type(passwordField, 'password123'))
    await waitFor(() => userEvent.click(submitButton))

    expect(console.log).toHaveBeenCalledWith('submit works')
    console.log.mockClear()
  })

  it('renders a submit button', () => {
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('no Password throws error', async () => {
    console.log = jest.fn()

    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    })

    await waitFor(() => userEvent.click(submitButton))

    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
  })
})
