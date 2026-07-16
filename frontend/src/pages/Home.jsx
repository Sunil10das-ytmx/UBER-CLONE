import React, { useState,useRef } from 'react'
import UberLogo from '../assets/Uber-logo.png'
import ubermap from '../assets/uber-map.gif'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Component/LocationSearchPanel'
import VehiclePanel from '../Component/VehiclePanel'

const Home = () => {
  const[pickup,setPickup]=useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloeRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false)

  const submitHandler=((e)=>{
    e.preventDefault()
    setPickup('')
    setDestination('')
  })

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%'
      })
      gsap.to(panelCloeRef.current,{
        opacity:'1'
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%'
      })
      gsap.to(panelCloeRef.current,{
        opacity:'0'
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current,{
        transform:'translate(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translate(100%)'
      })
    }
  },[vehiclePanelOpen])
  
  return (
    <>
      <div className='h-screen relative overflow-hidden'>
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

        <div className=' flex flex-col justify-end absolute h-screen top-0  w-full'>
          <div className='h-[30%] p-6 bg-white relative'>
            <h5 
            ref={panelCloeRef}
            onClick={()=>{
            setpanelOpen(false)
          }}
            className='absolute top-6 opacity-0 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
            </h5>

            <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e)=>{
              submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 bottom-[17%] -translate-y-1/2 left-9 bg-gray-700 rounded-full"></div>
            <input 
            onClick={()=>{
              setpanelOpen(true)
            }}
            value={pickup}
            onChange={(e)=>{
              setPickup(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4 mb-4' type='text' placeholder='Add a pick up location'/>

            <input 
            onClick={()=>{
              setpanelOpen(true)
            }}
            value={destination}
            onChange={(e)=>{
              setDestination(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full ' type='text' placeholder='Enetr your destination'/>
          </form>
          </div>
          <div ref={panelRef} className=' bg-gray-200  h-0'>
              <LocationSearchPanel setpanelOpen={setpanelOpen}  setvehiclePanelOpen={setvehiclePanelOpen}/>
          </div>
        </div>

          <div ref={vehiclePanelRef} className='fixed bottom-0 left-0 right-0 z-10 flex flex-col translate-x-full gap-3 bg-white p-3'>
              <VehiclePanel  setvehiclePanelOpen={setvehiclePanelOpen}/>
          </div>
      </div>
    </>
  )
}

export default Home
