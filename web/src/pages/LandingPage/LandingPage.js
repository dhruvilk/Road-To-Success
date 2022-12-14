/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'

import { Button } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'

import CalendarView from 'src/components/CalendarView'
import TaskView from 'src/components/TaskView/TaskView'

import './../../styles.css'

const renderGreeting = () => {
  return (
    <div className="col-flex p-30">
      <h1 className="mb-heading">
        Manage your tasks,<br></br>our way
      </h1>
      <h3 className="sub-header">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt
        bibendum scelerisque. In at ante tincidunt nisi porta laoreet. Quisque
        hendrerit turpis quis urna volutpat eleifend. Maecenas porttitor commodo
        tristique. Ut sit amet dignissim lectus.
      </h3>
    </div>
  )
}
const renderAuthenticated = () => {
  return (
    <div className="mb-main">
      <div id="calendarContainer" style={{ position: 'relative' }}>
        <CalendarView />
      </div>
      <div id="taskviewContainer" style={{ position: 'relative' }}>
        <TaskView />
      </div>
    </div>
  )
}

const LandingPage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return <>{isAuthenticated ? renderAuthenticated() : renderGreeting()}</>
}

export default LandingPage
