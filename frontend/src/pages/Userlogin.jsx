import React, { useEffect } from 'react'
import UberTrafficLight from '../assets/Uber-traffic-light.jpg'
import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';


const Userlogin = () => {
  // useEffect(() => {
  //   console.log('Userlogin mounted')
  // }, [])

  return (
    <>
        <div className='w-full h-screen relative'>
          <img
            src={UberTrafficLight}
            alt="trafficLightImg"
            className='absolute inset-0 w-full h-full object-cover opacity-40'
          />

          <Link to='/' className='absolute top-4 left-4'>
            <MoveLeft size={42} color="#110e0e" />
          </Link>

          <div className='absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-20'>
            <h1 className='text-black text-6xl font-extrabold text-outline leading-tight'>WELCOME</h1>
            <h3 className='text-gray-800 font-semibold text-xl mt-3'>No Keys, No Maps, Just Taps</h3>
          </div>

          <div className='absolute top-44 left-1/2 transform -translate-x-1/2 w-full max-w-md z-20  p-6 '>
              <form className='space-y-4'>
                <div>
                  <label className='block text-gray-700 font-semibold mb-1'>Email</label>
                    <input
                      type='email'
                      placeholder='Enter your email here'
                      className='w-full px-4 py-2 rounded-md border border-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-1'>Password</label>
                    <input
                      type='password'
                      placeholder='Enter your password here'
                      className='w-full px-4 py-2 rounded-md border border-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='pt-2'>
                  <button type='submit' className='w-full bg-black text-white px-4 py-2 rounded-md font-semibold hover:opacity-90'>
                    Sign In
                  </button>
                </div>
              </form>
              <h3 className='flex font-semibold items-center justify-center align-middle'>Don't have an account?<Link className='text-blue-600' to='/singup'>Sign up.</Link></h3>
          </div>
          </div>
    </>
  )
}

export default Userlogin
