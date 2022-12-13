import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('no submission with empty fields', async () => {
    const onSub = jest.fn()
    render(<LoginPage />)
    const signUpButton = screen.getByText('Sign Up')
    await waitFor(() => userEvent.click(signUpButton))
    expect(onSub).not.toHaveBeenCalled()
  })

  it('username and password entered; can submit', async () => {
    //const uName = ''
    //const pass = 'pass'

    //const onSub = jest.fn()

    render(<LoginPage />)

    const uNameField = screen.getByRole('textbox', { name: /Username/i })
    const passwordField = screen.getByLabelText(/password/i)
    const signUpButton = screen.getByText('Sign Up')

    await waitFor(() => userEvent.type(uNameField, 'Test Name'))
    await waitFor(() => userEvent.type(passwordField, 'asdflkj'))
    await waitFor(() => userEvent.click(signUpButton))

    expect(await screen.findByText('Signed in as')).toBeInTheDocument()
    //expect(onSub).toBeCalled()
  })
})
