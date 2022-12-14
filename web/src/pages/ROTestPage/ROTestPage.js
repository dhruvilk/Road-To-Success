import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import './../../index.css'

import React, { useState } from 'react'
import ROCell from 'src/components/ROCell'

const RoTestPage = () => {
  var d = new Date("2022-12-13T03:26:27.775Z").toISOString();
  console.log('about to return from page')

  console.log('right after this is the type of d')
  console.log(typeof d)
  console.log(d instanceof Date)
  console.log(d instanceof String)
  console.log(d)

  return (
    <>
      <MetaTags title="RoTest" description="RoTest page" />
      <ROCell date={d}/>
    </>
  )
}

export default RoTestPage
