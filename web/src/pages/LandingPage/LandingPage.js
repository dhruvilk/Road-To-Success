
/* eslint-disable no-unused-vars */
import { Button } from '@chakra-ui/react'
import React, { useCallback } from 'react';
import { useAuth } from '@redwoodjs/auth'

import { MetaTags } from '@redwoodjs/web'
import { Helmet } from '@redwoodjs/web'

import TaskView from 'src/components/TaskView/TaskView'
import CalendarView from 'src/components/CalendarView'




import './../../styles.css'



const renderGreeting = () => {

  return (
    <div className="col-flex p-30">
      <h1 className="mb-heading">
        Manage your tasks,<br></br>our way
      </h1>
      <h3 className="sub-header">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt bibendum scelerisque. In at ante tincidunt nisi porta laoreet. Quisque hendrerit turpis quis urna volutpat eleifend. Maecenas porttitor commodo tristique. Ut sit amet dignissim lectus.
      </h3>
    </div>
  )
}
const renderAuthenticated = () => {

  return (
    <div className="mb-main">
      <div id="calendarContainer" style={{ position: "relative" }}>
        <CalendarView />
      </div>
      <div id="taskviewContainer" style={{ position: "relative" }}>
        <TaskView />
      </div>
    </div>
  )
}


const LandingPage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <header>
        <div className="navigation">
          <nav>
            <ul>
              <li>
              </li>
              <li>
                {isAuthenticated ? (
                    <>
                      <Button
                        style={{ color: 'black' }}
                        onClick={() => authorizeApp()}
                      >
                        Sync with Google 📅{' '}
                      </Button>{' '}
                      <Button style={{ color: 'black' }} onClick={logOut}>
                        Log Out 👋
                      </Button>
                    </>
                ) : (
                  <Link to={routes.login()}>
                    <Button style={{ color: 'black' }}>Log In 🖋</Button>
                  </Link>
                )}
              </li>
              {currentUser ? (
                <li
                  style={{ fontSize: '1.7rem', fontWeight: '800', color: 'white' }}
                >{`Signed in as ${currentUser.email}`}</li>
              ) : null}
              <li style={{ float: 'left', display: 'inline' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-calendar-check-fill"
                  viewBox="0 0 16 16"
                  style={{ color: 'white', marginRight: '10px' }}
                >
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                </svg>
              </li>

              <li style={{ float: 'left', display: 'inline', padding: '20px 32px', fontSize: '30px' }}>
                <Link to={routes.landingPage()} style={{ color: "white" }}>Road to Success</Link>

              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="horizontal-bar"></div>

      {!currentUser || !currentUser.gCalSyncEnabled ? (

        <div className="heading">
          <div className="particles">
            <Particles options={particlesOptions} init={particlesInit} />
          </div>
          <h1>
            {' '}
            Manage <span id="your">your</span> tasks,<br></br>{' '}
            <span id="your">your</span> way
          </h1>
        </div>
      ) : (
        <div></div>
      )}
      {isAuthenticated && currentUser && currentUser.gCalSyncEnabled ? (
        <div className="main">
          <div className="particles">
            <Particles options={particlesOptions} init={particlesInit} />
          </div>
          <div style={{ height: '100vh' }}>
            {/* <AppointmentsCell
            start={'2021-11-01T12:00:00Z'}
            end={'2023-11-01T12:00:00Z'}
          /> */}
            {/* <TaskCell user_id={currentUser.id} /> */}
            <CalendarCell start={'2021-11-01T12:00:00Z'} end={'2024-11-01T12:00:00Z'}/>
            <TaskView user_id={currentUser.id} />
          </div>
        </div>
      ) : (
        <div></div>
      )}



    </>
  )
}

export default LandingPage


