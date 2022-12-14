
import React, { useEffect, useState, useRef } from 'react'

import { Divider, Select, toast } from '@chakra-ui/react'

import { useMutation } from '@redwoodjs/web'

import TaskCard from '../TaskCard/TaskCard'

export const QUERY = gql`
  query FindTaskQuery($date: DateTime!) {
    getByDate(date: $date) {
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
const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskMutation($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      user_id
      title
      details
      status_id
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No tasks found</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ getByDate }) => {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      console.log('Task updated')
    },
  })

  const isMounted = useRef(false)
  const idDraged = useRef()
  const urgencyDraged = useRef()
  const priorityDraged = useRef()
  const statusDraged = useRef()
  let arr = [...getByDate]
  let index = 0
  while (index != arr.length) {
    if (arr[index].status_id === 5) {
      arr.splice(index, 1)
      index = index - 1
    }
    index = index + 1
  }

  arr.sort((a, b) => {
    if (a.urgency === b.urgency) {
      return a.priority - b.priority
    } else {
      return a.urgency - b.urgency
    }
  })
  const [list, setList] = useState([...arr])
  const dragItem = useRef()
  const dragOverItem = useRef()

  const dragStart = (e, position) => {
    dragItem.current = position
    //console.log(e.target.innerHTML)
  }
  const dragEnter = (e, position) => {
    dragOverItem.current = position
    //console.log(e.target.innerHTML)
  }

  const drop = () => {
    const copyListItems = [...list]
    const dragItemContent = copyListItems[dragItem.current]
    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)

    idDraged.current = list[dragItem.current].id
    statusDraged.current = list[dragItem.current].status_id
    if (list[dragOverItem.current].urgency != list[dragItem.current].urgency) {
      urgencyDraged.current = list[dragOverItem.current].urgency
      priorityDraged.current = list[dragItem.current].priority
    } else if (
      list[dragOverItem.current].priority != list[dragItem.current].priority
    ) {
      urgencyDraged.current = list[dragItem.current].urgency
      priorityDraged.current = list[dragOverItem.current].priority
    } else {
      isMounted.current = false
    }

    dragItem.current = null
    dragOverItem.current = null
    setList(copyListItems)
  }
  useEffect(() => {
    if (isMounted.current) {
      updateTask({
        variables: {
          id: idDraged.current,
          input: {
            status_id: statusDraged.current,
            urgency: urgencyDraged.current,
            priority: priorityDraged.current,
          },
        },
      })
    } else {
      isMounted.current = true
    }
  }, [list])
  return (
    <ul style={{ listStyleType: 'none' }}>

      {list &&
        list.map((item, index) => {
          if (item.status_id != 5) {
            return (
              <li
                style={{ cursor: 'move' }}
                draggable="true"
                key={item.id}
                onDragStart={(event) => dragStart(event, index)}
                onDragEnter={(event) => dragEnter(event, index)}
                onDragEnd={drop}
              >
                <TaskCard task={item} />
              </li>
            )
          }
        })}
    </ul>
  )
}
