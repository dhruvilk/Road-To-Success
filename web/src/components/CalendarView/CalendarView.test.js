import { render } from '@redwoodjs/testing/web'

import CalendarView from './CalendarView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarView />)
    }).not.toThrow()
  })
})
