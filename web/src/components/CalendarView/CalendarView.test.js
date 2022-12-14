import { render, screen } from '@redwoodjs/testing/web'
import { standard } from './CalendarView.mock'
import CalendarView from './CalendarView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarView getEvents={standard().Events}/>)
    })
  })

  it('Shows Date', () => {
    render(<CalendarView getEvents={standard().Events}/>)
    expect(screen.getByText('today')).toBeInTheDocument()
  })
  it('Shows the different view options', () =>{
    render(<CalendarView getEvents={standard().Events}/>)
    expect(screen.getByText('day')).toBeInTheDocument()
    expect(screen.getByText('week')).toBeInTheDocument()
    expect(screen.getByText('month')).toBeInTheDocument()
  })
})
