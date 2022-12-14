import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import SignupPageTEST from './SignupPageTEST'

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

describe('SignupPage', () => {
  const onSub = jest.fn()

  beforeEach(() => {
    onSub.mockClear()
    render(<SignupPageTEST onSubmit={onSub} />)
  })

  it('on proper submit, toast notifications can be displayed', async () => {
    const uNameField = screen.getByRole('textbox', { name: /Username/i })
    const passwordField = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    })

    await waitFor(() => userEvent.type(uNameField, 'email@email.com'))
    await waitFor(() => userEvent.type(passwordField, 'password123'))
    await waitFor(() => userEvent.click(submitButton))

    expect(await screen.findByText('Welcome!')).toBeInTheDocument()
  })

  it('renders a sign up button when logged out', () => {
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument()
  })

  it('no submission with empty fields', async () => {
    console.log = jest.fn()

    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    })

    await waitFor(() => userEvent.click(submitButton))

    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
  })

  it('no Username throws error', async () => {
    console.log = jest.fn()

    const passwordField = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    })

    await waitFor(() => userEvent.type(passwordField, 'password123'))
    await waitFor(() => userEvent.click(submitButton))

    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
  })

  it('no Password throws error', async () => {
    console.log = jest.fn()

    const uNameField = screen.getByRole('textbox', { name: /Username/i })
    const submitButton = screen.getByRole('button', {
      name: /sign up/i,
    })

    await waitFor(() => userEvent.type(uNameField, 'email@email.com'))
    await waitFor(() => userEvent.click(submitButton))

    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
  })
})
