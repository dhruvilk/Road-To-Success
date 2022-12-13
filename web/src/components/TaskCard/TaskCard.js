import { Flex, Button, ButtonGroup } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useMutation } from "@redwoodjs/web"
import { toast } from '@redwoodjs/web/toast'
import { QUERY as tasksQuery } from 'src/components/TasksCell'
import React, { useEffect, useState, useRef } from 'react'

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

const TaskCard = ({ task }) => {
  const isMounted = useRef(false)

  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      console.log('Task updated')

    },
  })

  var initColor;
  if (task.status_id == 1) { //not started
    initColor = 'red.100';
  }
  else if (task.status_id == 2) { //started
    initColor = 'blue.100';
  }
  else if (task.status_id == 3) { //completed
    initColor = 'green.100';
  }
  else if (task.status_id == 4) { //rolled over
    initColor = 'yellow.100';
  }
  //hacky style testing
  const style = ["not-started-task","started-task","completed-task","rolled-over-task"]
  const [statusText, setStatusText] = useState(task.status_id);
  const [statusColor, setStatusColor] = useState(initColor);
  const [urgencyText, setUrgencyText] = useState(task.urgency);
  const [priorityText, setPriorityText] = useState(task.priority);

  useEffect(() => {
    if (isMounted.current) {
      updateTask({
        variables: {
          id: task.id,
          input: {
            status_id: statusText,
            urgency: urgencyText,
            priority: priorityText
          },
        },
        refetchQueries: [{ query: tasksQuery }],
      })
    } else {
      isMounted.current = true
    }
  }, [statusText, urgencyText, priorityText]);

  return (

    <>
      {statusText != 5 ?
        <Flex className={style[statusText-1]} background={statusColor} p={1} rounded={6} margin={1}>
          <Flex>
            <button onClick={() => {
              setStatusText(statusText == 1 ? 2 : statusText == 2 ? 3 : statusText == 3 ? 4 : 1);
              setStatusColor(statusText == 1 ? 'blue.100' : statusText == 2 ? 'green.100' : statusText == 3 ? 'yellow.100' : 'red.100');
            }}>{
                statusText == 1 ? "Not Started" : statusText == 2 ? "Started" : statusText == 3 ? "Completed" : "Rolled Over"
              }</button>
          </Flex>
          <Flex paddingTop={2}>
            {task.title}
          </Flex>
          <Flex>
            <button onClick={() => {
              setUrgencyText(urgencyText == 1 ? 2 : urgencyText == 2 ? 3 : 1)
            }}>
              {urgencyText == 1 ? "High" : urgencyText == 2 ? "Medium" : "Low"}
            </button>
          </Flex>
          <Flex>
            <button onClick={() => {
              setPriorityText(priorityText == 1 ? 2 : priorityText == 2 ? 3 : 1)
            }}>
              {priorityText}
            </button>
          </Flex>
          <Button
            onClick={() => {
              confirm('Are you sure you want to delete this task?') ? setStatusText(5) : null
            }}
            colorScheme="red"
            variant="solid"
            size="sm"
            m={1}

          >
            <DeleteIcon color="white.500"/>
          </Button>
        </Flex>
        :
        <></>
      }

    </>
  )
}

export default TaskCard
