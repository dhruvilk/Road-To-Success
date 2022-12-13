// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <CalendarView {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import CalendarView from './CalendarView'

export const generated = () => {
  return <CalendarView />
}

export default {
  title: 'Components/CalendarView',
  component: CalendarView,
}
