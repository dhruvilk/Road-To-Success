import React, { useState, useEffect } from 'react'

import { Box, Divider, Flex } from '@chakra-ui/react'

import {
  FieldError,
  Form,
  Label,
  InputField,
  TextField,
  TextAreaField,
  SelectField,
  Submit,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import TasksCell from 'src/components/TasksCell'
import { QUERY as tasksQuery } from 'src/components/TasksCell'

const CREATE_TASK = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

const TaskView = ({ user_id }) => {
  const formMethods = useForm()

  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      //toast.Success("Task Created")
      formMethods.reset()
    },
    refetchQueries: [{ query: tasksQuery, variables: { user_id } }],
  })

  const onSubmit = (data) => {
    const now = new Date()
    createTask({
      variables: { input: { user_id: user_id, date: now, ...data } },
    })
    //TODO: task date (type dateTime) should be date of listed in component
    //TODO: remove user_id from query when api team updates function signature
  }

  // current date state
  const color = 'rgb(255,255,255)'
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  let yyyy = today.getFullYear()
  today = mm + '-' + dd + '-' + yyyy
  const [date, setDate] = useState(today)
  useEffect(() => {
    // get current date in digits only
  }, [])

  //change date format from mm-dd-yyyy to yyyy-mm-dd for html date input
  function htmlDate(date) {
    let dateArr = date.split('-')
    let month = dateArr[0]
    let day = dateArr[1]
    let year = dateArr[2]
    return year + '-' + month + '-' + day
  }

  function handleDateChange(increment) {
    //increment string date by 1 day by string manipulation
    const year = date.split('-')[2]
    const month = date.split('-')[0]
    const day = date.split('-')[1]
    const newDate = new Date(year, month - 1, day)
    newDate.setDate(newDate.getDate() + increment)
    const newYear = newDate.getFullYear()
    const newMonth = newDate.getMonth() + 1
    const newDay = newDate.getDate()
    if (newMonth < 10 && newDay < 10) {
      var stringdate = '0' + newMonth + '-0' + newDay + '-' + newYear
    } else if (newMonth < 10) {
      var stringdate = '0' + newMonth + '-' + newDay + '-' + newYear
    } else if (newDay < 10) {
      var stringdate = newMonth + '-0' + newDay + '-' + newYear
    } else {
      var stringdate = newMonth + '-' + newDay + '-' + newYear
    }
    setDate(stringdate)
    //select dateinput and set to newDateString
    document.getElementById('dateinput').value = stringdate
  }
  return (
    <>
      {/* alligned horizontally */}
      <div className="TaskView">
        <Flex direction="column" background={color} rounded={6} p={3}>
          <Box fontSize="2xl">
            <Flex justifyContent="space-between">
              <h1 style={{ margin: '0px 60px 0px 0px' }}>To Do List</h1>
              {/* input for date */}
              {/* TODO: remove date change code from this component - rely on calendar date range */}
              <div>
                <button onClick={() => handleDateChange(-1)}>&lt;</button>
                <input
                  style={{ backgroundColor: color }}
                  type="date"
                  id="dateinput"
                  value={htmlDate(date)}
                  onChange={(e) => {
                    let newDate = e.target.value.split('-') //split date into array
                    let newDateString =
                      newDate[1] + '-' + newDate[2] + '-' + newDate[0] //rearrange array into string
                    setDate(newDateString) //set date state to new date
                  }}
                />
                <button onClick={() => handleDateChange(1)}>&gt;</button>
              </div>
            </Flex>
          </Box>
          <Divider />
          <Flex
            style={{ display: 'none' }}
            direction="row"
            justifyContent="space-between"
          >
            <h4>Status</h4>
            <h4>Name</h4>
            <h4>Urgency</h4>
            <h4>Priority</h4>
          </Flex>

          <TasksCell user_id={user_id} />

          <Divider m={1} />
          <p style={{ fontSize: '1.4rem' }}>Add task:</p>
          <Form
            formMethods={formMethods}
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={onSubmit}
          >
            <div className="formGroup">
              <Label>Status</Label>
              <SelectField
                name="status_id"
                validation={{ valueAsNumber: true }}
              >
                <option value={1}>Not Started</option>
                <option value={2}>Started</option>
                <option value={3}>Completed</option>
                <option value={4}>Rolled Over</option>
              </SelectField>
            </div>

            <div className="formGroup">
              <Label>Title</Label>
              <TextField name="title" placeholder="Title" />
            </div>

            <div className="formGroup">
              <Label>Urgency</Label>
              <SelectField name="urgency" validation={{ valueAsNumber: true }}>
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </SelectField>
            </div>

            <div className="formGroup">
              <Label>Priority</Label>
              <TextField type="number" name="priority" placeholder="Priority" />
            </div>

            <Submit className="button">Save</Submit>
          </Form>

          <p className="hidden">{date}</p>
        </Flex>
      </div>
    </>
  )
}

export default TaskView
