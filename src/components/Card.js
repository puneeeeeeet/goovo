import React from 'react'
import Goovo from './../assets/images/goovo.jpeg'
export const Card = ({name, location, date, organizer}) => {
  return (
    <div className="w-72 h-64 rounded-md bg-gray-200 flex-col flex justify-center items-center">
    <div className="w-11/12 bg-black h-28 rounded-md">
      <img src={Goovo} alt="goovo" className="w-full h-full" />
    </div>
    <div className=" justify-between px-2 justify-items-center">
        <p className="font-bold">{name}</p>
        <p>{location}</p>
        
    </div>
    <p>{date}</p>
    <p>{organizer}</p>
    </div>
  )
}
