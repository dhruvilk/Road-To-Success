import { render, screen, waitFor } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'

import TaskView from './TaskView'

describe('TaskView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskView />)
    }).not.toThrow()
  })

  it('does not submit when required fields are empty', async () => {
    const onSubmit = jest.fn()

    render(<TaskView onSubmit={onSubmit} />)

    const submitButton = screen.getByText('Save')

    await waitFor(() => userEvent.click(submitButton))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  /*it('submits when required fields are entered', async () => {
    const title = 'My Title'
    const priority = 'priority'


    const onSubmit = jest.fn()

    render(<TaskView onSubmit={onSubmit} user_id={1}/>)

    const titleField = screen.getByPlaceholderText('Title')
    const priorityField = screen.getByPlaceholderText('Priority')
    const submitButton = screen.getByText('Save')

    await waitFor(() => userEvent.type(titleField, title))
    await waitFor(() => userEvent.type(priorityField, priority))
    await waitFor(() => userEvent.click(submitButton))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledWith(
      { title, priority},
      expect.objectContaining({
        _reactName: 'onSubmit',
        type: 'submit',
      })
    )
  }) ###TODO Will finish test when Form Is more set in stone. too many missing fields*/
})
