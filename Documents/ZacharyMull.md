## Nov 2
added ZacharyMull.md
added and configured a test workflow for master branch
## Dec 2
Made Tests for Appointment Item
## Dec 4
Started Tests for Appointment Lists Cell, Ran into Typing Issue with the Mock. Works in when run but didn't work with the tests. Tried finding information but the documentation had very little on writing mock data. Working with other QA testers to try and figure it out
## Dec 9
Made Tests for Task Card, Might have a lead on the mock data errors. the mock data provided doesn't seem to match the current DB schema, Ran out of time will test tomorrow
## Dec 10
Updated Mock data still getting type errors, back to square 0, also worked on Tasks Cell Tests
## Dec 11
Met with QA team to try and figure Out Appointment lists cell problem, think it might be the component itself, Started Tests for TaskView
Commited changes So far [commit](https://github.com/dhruvilk/Road-To-Success/commit/889a9b15b8a7df805bbeb3eead0e41ffd1de7898)
## Dec 12
Resolving merge conflicts involving test for deprecated components
### Code for deprectated AppointmentItem.test.js for my reference:
  /* eslint-disable prettier/prettier */
  import { render, screen } from '@redwoodjs/testing/web'

  import AppointmentItem from './AppointmentItem'

  describe('AppointmentItem', () => {
    const appointment = { id: 1, title: 'Title', startTime: '1:00PM', duration: '1 Hour'}
    it('renders successfully', () => {
      expect(() => {
        render(<AppointmentItem />)
      }).not.toThrow()
    })
    it('Displays info in monthly View', () => {
      render(
        <AppointmentItem
          id={appointment.id}
          title={appointment.title}
          startTime={appointment.startTime}
          duration={appointment.duration}
          viewType={'monthly'}
        />
      )
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('1:00PM')).toBeInTheDocument()
      expect(screen.getByText('1 Hour')).toBeInTheDocument()
    })
    it('Displays info in weekly View', () => {
      render(
        <AppointmentItem
          id={appointment.id}
          title={appointment.title}
          startTime={appointment.startTime}
          duration={appointment.duration}
          viewType={'weekly'}
        />
      )
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('1:00PM')).toBeInTheDocument()
      expect(screen.getByText('1 Hour')).toBeInTheDocument()
    })
    it('Displays info in Daily View', () => {
      render(
        <AppointmentItem
          id={appointment.id}
          title={appointment.title}
          startTime={appointment.startTime}
          duration={appointment.duration}
          viewType={'daily'}
        />
      )
      expect(screen.queryByText('1')).not.toBeInTheDocument()
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('1:00PM')).toBeInTheDocument()
      expect(screen.getByText('1 Hour')).toBeInTheDocument()
    })
    it('Renders View Error Correctly', () => {
      render(
        <AppointmentItem
          id={appointment.id}
          title={appointment.title}
          startTime={appointment.startTime}
          duration={appointment.duration}
          viewType={''}
        />
      )
      expect(screen.queryByText('1')).not.toBeInTheDocument()
      expect(screen.queryByText('Title')).not.toBeInTheDocument()
      expect(screen.queryByText('1:00PM')).not.toBeInTheDocument()
      expect(screen.queryByText('1 Hour')).not.toBeInTheDocument()
      expect(screen.getByText('ViewType missing')).toBeInTheDocument()
    })
  })
