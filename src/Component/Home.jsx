import React from 'react'
import LeftNav from '../Partials/LeftNav'
import RestHome from '../Partials/RestHome'

function Home() {
    document.title='Movie App|Home'
  return (
    <div className='flex h-screen'>
    <LeftNav></LeftNav>
    <RestHome></RestHome>
    </div>
  )
}

export default Home