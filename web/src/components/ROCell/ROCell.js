
import { useMutation } from '@redwoodjs/web'

console.log('cell opened')
console.log('hi')
export const QUERY = gql`
  query rollTasksOver($date: DateTime!) {
    rollTasksOver(date: $date) {
      id
      title
    }
  }
`
console.log(' outta here ')
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'orange' }}>Error: {error?.message}</div>
)

export const Success = ({ rollTasksOver }) => {
  //console.log('aaa')
  //return <div>WOW!</div>

  return (
    <ul>
      {rollTasksOver.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )

}
