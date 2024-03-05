import React from 'react'
import LibSidebar from '../components/sidebar/LibSidebar'
import { Outlet } from 'react-router-dom'
import { CustomComponentWithButtonAndImage } from '../main'

const LibraryLayout = () => {
  return (
    <>
    <main className='page-wrapper'>
      <LibSidebar></LibSidebar>
      <div className='content-wrapper'>
        <Outlet></Outlet>
      </div>
    </main>
    <CustomComponentWithButtonAndImage></CustomComponentWithButtonAndImage>
    </>
    
  )
}

export default LibraryLayout
