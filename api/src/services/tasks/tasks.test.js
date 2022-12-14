import { tasks, task, createTask, updateTask, deleteTask } from './tasks'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tasks', () => {
  scenario('returns all tasks', async (scenario) => {
    const result = await tasks()

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('returns a single task', async (scenario) => {
    const result = await task({ id: scenario.task.one.id })

    expect(result).toEqual(scenario.task.one)
  })

  scenario('creates a task', async () => {
    const result = await createTask({
      input: {
        status_id: 6862518,
        urgency: 7477314,
        priority: 6181117,
        date: '2022-11-16T19:53:37.647Z',
      },
    })

    expect(result.status_id).toEqual(6862518)
    expect(result.urgency).toEqual(7477314)
    expect(result.priority).toEqual(6181117)
    expect(result.date).toEqual(new Date('2022-11-16T19:53:37.647Z'))
  })

  scenario('updates a task', async (scenario) => {
    const original = await task({ id: scenario.task.one.id })
    const result = await updateTask({
      id: original.id,
      input: { status_id: 5867767 },
    })

    expect(result.status_id).toEqual(5867767)
  })

  scenario('deletes a task', async (scenario) => {
    const original = await deleteTask({ id: scenario.task.one.id })
    const result = await task({ id: original.id })

    expect(result).toEqual(null)
  })

  scenario('attempts to rollover', async (scenario) => {})
})
