import React from 'react'

export const Card = ({name, location, date, organizer}) => {
  return (
    <div className="w-56 h-56 rounded-md bg-gray-200 flex-col flex justify-center items-center">
    <div className="w-11/12 bg-black h-20 rounded-md">

    </div>
    <div className="flex justify-between px-2">
        <p>{name}</p>
        <p> {location}</p>
        
    </div>
    <p>{date}</p>
    <p>{organizer}</p>
    </div>
  )
}
