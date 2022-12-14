
import React, { useCallback, useState, useEffect } from 'react';
import { Toaster } from '@redwoodjs/web/toast'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { Button } from '@chakra-ui/react'

import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";

import './../../styles.css'

const BannerLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const particlesInit = useCallback(main => {
    loadFull(main);
  }, [])

  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    }
    else {
      setTheme('light')
    }
  }
  useEffect(() => {
    document.body.className = theme
  }, [theme])
  const authorizeApp = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https://www.googleapis.com/auth/calendar.events&include_granted_scopes=true&response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}`
  }

  return <>
    <div className="particles">
      <Particles options={particlesOptions} init={particlesInit} />
    </div>
    <Toaster />

    <header style={{ position: "relative" }}>
      <nav className="mb-nav">
        <div className="mb-nav-logo">
          <button onClick={toggleTheme} style={{ float: 'left', display: 'inline', border:"0px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-calendar-check-fill" viewBox="0 0 16 16" >
              <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
            </svg>
          </button>
          <Link to={routes.landingPage()}>
            <div style={{ float: 'left', display: 'inline', paddingLeft: "20px", fontSize: '30px' }}>
              <h1>Road to Success</h1>
            </div>
          </Link>
        </div>
        <div className="mb-nav-link-container">
          {isAuthenticated
            ? currentUser.gCalSyncEnabled
              ?
              <>

                <div style={{ float: 'right', display: 'inline' }}>
                  <Button onClick={() => { toast('✌️ see you later', { duration: 2000 }); logOut(); }}>Log Out</Button>
                </div>
                <div className='mb-nav-logo' style={{ float: 'right', display: 'inline', paddingRight: "20px", fontSize: '30px' }}>
                  <Link to={routes.profilePage()}> {currentUser.email}</Link>
                </div>

              </>
              : <><Button onClick={() => authorizeApp()}>Sync with Google</Button><Button onClick={() => { toast('✌️ see you later', { duration: 2000 }); logOut(); }}>Log Out</Button></>
            : <><Link to={routes.login()}><Button>Log In</Button></Link><Link to={routes.signup()}><Button>Sign up</Button></Link></>
          }
        </div>
      </nav>
    </header>
    <main>{children}</main>
  </>

}

export default BannerLayout
