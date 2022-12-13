import { Divider, Select, toast } from '@chakra-ui/react'

import { useMutation } from '@redwoodjs/web'

import TaskCard from '../TaskCard/TaskCard'
export const QUERY = gql`
  query FindTaskQuery($date: DateTime!){
    getByDate(date: $date){
      id
      user_id
      title
      details
      status_id
      urgency
      priority
      date
    }
  }
`

// console.log(date);

// export const QUERY = gql`
//   query FindTaskQuery{
//     tasks{
//       id
//       user_id
//       title
//       details
//       status_id
//       urgency
//       priority
//       date
//     }
//   }
// `



export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No tasks found</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ getByDate }) => {

  return (
    <ul style={{ listStyleType: 'none' }}>

      {getByDate.map((item) => {
        if(item.status_id != 5) {
        return <li key={item.id}><TaskCard task={item} /></li>
        }
      })}
    </ul>
  )
}
