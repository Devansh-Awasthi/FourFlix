import React from 'react'
import LeftNav from '../Partials/LeftNav'
import RestHome from '../Partials/RestHome'
import TopNav from '../Partials/TopNav'

function Home() {
    document.title='Movie App|Home'
  return (
    <div className='flex h-screen w-full'>
    <LeftNav></LeftNav>
    
      <TopNav></TopNav>
    </div>
  )
}

export default Home