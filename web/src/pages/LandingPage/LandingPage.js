/* eslint-disable no-unused-vars */
import { Button } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Helmet } from '@redwoodjs/web'

import AppointmentsCell from 'src/components/AppointmentsCell'

const authorizeApp = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https://www.googleapis.com/auth/calendar.events&include_granted_scopes=true&response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}`
}

const LandingPage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <Helmet bodyAttributes={{ style: 'background-color: #717891' }} />
      <header>
        <div className="navigation">
          <nav>
            <ul>
              <li>
                <i className="bi bi-calendar-check-fill"></i>
              </li>
              <li>
                <Link to={routes.landingPage()}>Home</Link>
              </li>
              <li>
                {isAuthenticated ? (
                  currentUser && !currentUser.gCalSyncEnabled ? (
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
                    <Button style={{ color: 'black' }} onClick={logOut}>
                      Log Out 👋
                    </Button>
                  )
                ) : (
                  <Link to={routes.login()}>
                    <Button style={{ color: 'black' }}>Log In 🖋</Button>
                  </Link>
                )}
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-calendar-check-fill"
                viewBox="0 0 16 16"
              >
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
              </svg>
              {currentUser ? (
                <li
                  style={{ fontSize: '1.7rem', fontWeight: '800' }}
                >{`Signed in as ${currentUser.email}`}</li>
              ) : null}
            </ul>
          </nav>
        </div>
      </header>
      <div className="horizontal-bar"></div>
      {!currentUser || !currentUser.gCalSyncEnabled ? (
        <div className="heading">
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
        <AppointmentsCell
          start={'2021-11-01T12:00:00Z'}
          end={'2023-11-01T12:00:00Z'}
        />
      ) : (
        <div></div>
      )}
    </>
  )
}

export default LandingPage
