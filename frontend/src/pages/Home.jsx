import React from 'react'
import UberLogo from '../assets/Uber-logo.png'
import ubermap from '../assets/uber-map.gif'

const Home = () => {
  return (
    <>
      <div className='h-screen relative'>
        <img
        className='w-20 absolute left-5 top-5 text-xl'
        src={UberLogo}
        alt='uber logo'
        />

        <div className='h-screen w-screen'>
          <img 
          className='h-full w-full object-cover'
          src={ubermap} 
          alt="ubermap" 
          />
        </div>

        <div className='bg-white absolute bottom-0 w-full p-5'>
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-2 mb-3' type='text' placeholder='Add a pick up location'/>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-3' type='text' placeholder='Enetr your destination'/>
          </form>
        </div>
      </div>
    </>
  )
}

export default Home
