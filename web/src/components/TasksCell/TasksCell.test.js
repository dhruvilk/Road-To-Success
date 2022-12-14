import { render, screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './TasksCell'
import { standard } from './TasksCell.mock'

describe('TasksCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success getByDate={standard().tasks} />)
    }).not.toThrow()
  })

  it('Shows Multiple tasks', async () => {
    render(<Success getByDate={standard().tasks}/>)
    expect(screen.getByText("Task 1")).toBeInTheDocument()
    expect(screen.getByText("Task 2")).toBeInTheDocument()
    expect(screen.getByText("Task 3")).toBeInTheDocument()
    expect(screen.getByText("Task 4")).toBeInTheDocument()
    expect(screen.queryByText("Task 5")).not.toBeInTheDocument()
  })

  it('Shows task Urgency', async () => {
    render(<Success getByDate={standard().tasks}/>)
    expect(screen.queryAllByText("Low").length).toEqual(1)
    expect(screen.queryAllByText("High").length).toEqual(2)
    expect(screen.queryAllByText("Medium").length).toEqual(1)
  })

  it('Shows task Complettion', async () => {
    render(<Success getByDate={standard().tasks}/>)
    expect(screen.getByText("Not Started")).toBeInTheDocument()
    expect(screen.getByText("Started")).toBeInTheDocument()
    expect(screen.getByText("Completed")).toBeInTheDocument()
    expect(screen.getByText("Rolled Over")).toBeInTheDocument()
  })
})
