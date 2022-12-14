import React from 'react'

import userEvent from '@testing-library/user-event'

import { navigate, routes } from '@redwoodjs/router'
import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import { toast } from '@redwoodjs/web/toast'

//jest.mock('./ForgotPasswordPage')

//import {onSubmit} from '__mocks__'
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
import ForgotPasswordPageTEST from './ForgotPasswordPageTEST'

/*jest.mock('@redwoodjs/router', () => ({
  navigate() {
    return {}
  },
}))*/
//import { notif } from './ForgotPasswordPage.js'
//jest.mock(notif)

describe('ForgotPasswordPageTEST', () => {
  const onSub = jest.fn()

  beforeEach(() => {
    onSub.mockClear()
    render(<ForgotPasswordPageTEST onSubmit={onSub} />)
  })

  it('renders a submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  //const sub = require('./ForgotPasswordPage')
  it('on proper submit, toast notification displayed', async () => {
    //global.alert = jest.fn()
    //ForgotPasswordPage.onSubmit = jest.fn()
    //const spy = jest.spyOn('ForgotPasswordPage', 'onSubmit')
    //const called = sub.onSubmit()
    //const { getByTestId } = render(<ForgotPasswordPage onSubmit={onSub} />)

    //const notif = jest.fn()

    const uNameField = screen.getByRole('textbox', { name: /Username/i })
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    })
    //const butt = getByText('Submit')

    await waitFor(() => userEvent.type(uNameField, 'email@email.com'))
    await waitFor(() => userEvent.click(submitButton))
    //await waitFor(() => fireEvent.submit(getByTestId('form')))

    //expect(ForgotPasswordPage())

    //expect(await screen.getByText('IT WORKS').toBeInTheDocument)

    expect(
      await screen.findByText('A link to reset your password was sent to')
    ).toBeInTheDocument()

    //expect(screen.getByTestId('rw-toast')).toHaveBeenCalled()

    //expect(notif).toHaveBeenCalledTimes(1)

    /*await waitFor(() => {
      expect(onSub).toHaveBeenCalled()
    })*/
  })

  it('does not submit when email left blank', async () => {
    console.log = jest.fn()

    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    })

    await waitFor(() => userEvent.click(submitButton))

    expect(console.log).not.toHaveBeenCalled()
    console.log.mockClear()
  })

  it('submits when email given', async () => {
    console.log = jest.fn()

    const uNameField = screen.getByRole('textbox', { name: /Username/i })
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    })
    await waitFor(() => userEvent.type(uNameField, 'email@email.com'))
    await waitFor(() => userEvent.click(submitButton))
    expect(console.log).toHaveBeenCalledWith('submit works')
    console.log.mockClear()
  })
})
