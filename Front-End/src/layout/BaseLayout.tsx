import React from 'react'
import Sidebar  from '../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { CustomComponentWithButtonAndImage } from '../main'

const BaseLayout = () => {
  return (
    <>
    <main className='page-wrapper'>
      <Sidebar></Sidebar>
      <div className='content-wrapper'>
        <Outlet></Outlet>
      </div>
    </main>
    <CustomComponentWithButtonAndImage></CustomComponentWithButtonAndImage>
    </>
    
  )
}

export default BaseLayout
