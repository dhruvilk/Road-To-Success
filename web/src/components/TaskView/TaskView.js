import React, { useState, useEffect } from 'react'
import TasksCell from 'src/components/TasksCell'
import { Box, Divider, Flex } from "@chakra-ui/react"
const TaskView = ({ user_id }) => {
  // current date state
  const color = 'rgb(255,255,255)';
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + '-' + dd + '-' + yyyy;
  const [date, setDate] = useState(today);
  useEffect(() => {
    // get current date in digits only

  }, [])

  //change date format from mm-dd-yyyy to yyyy-mm-dd for html date input
  function htmlDate(date) {
    let dateArr = date.split('-');
    let month = dateArr[0];
    let day = dateArr[1];
    let year = dateArr[2];
    return year + '-' + month + '-' + day;
  }

  function handleDateChange(increment) {
    //increment string date by 1 day by string manipulation
    const year = date.split("-")[2];
    const month = date.split("-")[0];
    const day = date.split("-")[1];
    const newDate = new Date(year, month - 1, day);
    newDate.setDate(newDate.getDate() + increment);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;
    const newDay = newDate.getDate();
    if (newMonth < 10 && newDay < 10) {
      var stringdate = "0" + newMonth + "-0" + newDay + "-" + newYear;
    }
    else if (newMonth < 10) {
      var stringdate = "0" + newMonth + "-" + newDay + "-" + newYear;
    }
    else if (newDay < 10) {
      var stringdate = newMonth + "-0" + newDay + "-" + newYear;
    }
    else {
      var stringdate = newMonth + "-" + newDay + "-" + newYear;
    }
    setDate(stringdate)
    //select dateinput and set to newDateString
    document.getElementById("dateinput").value = stringdate;

  }
  return (
    <>
      {/* alligned horizontally */}
      <div style={{ maxWidth: '30%', color: "black", float: 'right', marginTop: '20px', marginInline: '20px' }} >
        <Flex direction='column' background={color} p={12} rounded={6}>
          <Box fontSize='2xl'>
            <Flex justifyContent='space-between' >
              <h1>To Do List</h1>
              {/* input for date */}
              <div>
                <button onClick={() => handleDateChange(-1)}>&lt;</button>
                <input style={{ backgroundColor: color }} type="date" id='dateinput' value={htmlDate(date)} onChange={(e) => {
                  let newDate = e.target.value.split("-"); //split date into array
                  let newDateString = newDate[1] + "-" + newDate[2] + "-" + newDate[0]; //rearrange array into string
                  setDate(newDateString); //set date state to new date

                }} />
                <button onClick={() => handleDateChange(1)}>&gt;</button>
              </div>
            </Flex>
          </Box>
          <Divider />
          <Flex direction='row' justifyContent='space-between'>
          <h4>Status</h4>
          <h4>Name</h4>
          <h4>Urgency</h4>
          <h4>Priority</h4>

          </Flex>
          <TasksCell user_id={user_id} />
          {/* display current date */}
          <p>{date}</p>
        </Flex>

      </div>
    </>
  )
}

export default TaskView
