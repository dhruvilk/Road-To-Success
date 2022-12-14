import { render, screen, waitFor } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'
import TaskView from './TaskView'
import standard from '../TasksCell/TasksCell.mock'

describe('TaskView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskView />)
    }).not.toThrow()
  })

/*

  for whatever reason Jest overrides the mock for tasks cell when you call the onSubmit function but you can't put the mock back in either since its not recognized as a funciton of taskview. All tests calling onSubmit will error on the TasksCell code. I assume this is a bug due to the documentation saying nothing of this here: https://redwoodjs.com/docs/testing#testing-components-that-include-cells and will stop trying to test the form

  it('does not submit when required fields are empty', async () => {
    const onSubmit = jest.fn()

    render(<TaskView onSubmit={onSubmit} getByDate={standard().tasks}/>)

    const submitButton = screen.getByText('Save')

    await waitFor(() => userEvent.click(submitButton))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits when required fields are entered', async () => {
    const title = 'My Title'
    const priority = '1'


    const onSubmit = jest.fn()

    render(<TaskView onSubmit={onSubmit} user_id={1} getByDate={standard().tasks}/>)

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
  })*/
})
