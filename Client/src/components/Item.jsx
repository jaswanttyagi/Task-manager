import React from 'react'
import { useState } from 'react';

export const Item = ({ title, year, month, day }) => {
  const [newTitle, setNewTitle] = useState(title);
  const changeHandler = () => {
    setNewTitle("Jaswant");
  }
  return (
    <div>
      <div className='bg-gray-600 h-[25vh] w-[35vw] flex justify-between gap-4 items-center text-white rounded-lg mt-5'>

        <div className='flex justify-between'>
          <div className='flex gap-4 justify-between items-center'>
            <p>{year} - {month} - {day}</p>
            <button onClick={changeHandler} className='mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add to cart</button>
          </div>
        </div>
        <h1 className='text-xl font-bold text-white'>{newTitle}</h1>

      </div>

    </div>
  )
}