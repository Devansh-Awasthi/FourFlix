import React from 'react'
import LeftNav from '../Partials/LeftNav'
import RestHome from '../Partials/RestHome'
import TopNav from '../Partials/TopNav'
import Header from '../Partials/Header'

function Home() {
    document.title='Movie App|Home'
  return (
    <div className='flex h-screen w-full'>
      <LeftNav></LeftNav>
      <div className='w-[80%] h-full flex flex-col'>
       
      <TopNav></TopNav>
      <Header></Header>
      </div>
    </div>
  )
}

export default Home