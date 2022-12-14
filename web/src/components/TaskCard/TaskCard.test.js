import { render, screen } from '@redwoodjs/testing/web'

import TaskCard from './TaskCard'

describe('TaskCard', () => {
  const task1 ={
    id: 1,
    user_id: 1,
    title: "EventTitle",
    details: "EventDetails",
    status_id: 1,
    urgency: 1,
    priority: 1
  }
  const task2 ={
    id: 1,
    user_id: 1,
    title: "EventTitle",
    details: "EventDetails",
    status_id: 2,
    urgency: 2,
    priority: 1
  }
  it('renders successfully', () => {
    expect(() => {
      render(<TaskCard task={task1}/>)
    }).not.toThrow()
  })
  it('mutation db call works', () => {
    mockGraphQLMutation('UpdateTaskMutation', (variables) =>{
      return {
        updateTask: {
          id: variables.id,
          input: {
            status_id: variables.status_id,
            urgency: variables.urgency,
            priority: variables.priority
          },
        }
      }

    })
    expect(() => {
      render(<TaskCard task={task1}/>)
    }).not.toThrow()
  })
  it('Task1 Displays Correctly', () => {
    render(<TaskCard task={task1}/>)
    expect(screen.getByText("EventTitle")).toBeInTheDocument()
    expect(screen.getByText("Not Started")).toBeInTheDocument()
    expect(screen.getByText("High")).toBeInTheDocument()
  })
  it('Task2 Displays Correctly', () => {
    render(<TaskCard task={task2}/>)
    expect(screen.getByText("EventTitle")).toBeInTheDocument()
    expect(screen.getByText("Started")).toBeInTheDocument()
    expect(screen.getByText("Medium")).toBeInTheDocument()
  })

})
