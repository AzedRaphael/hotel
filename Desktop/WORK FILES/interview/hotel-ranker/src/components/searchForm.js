import React from 'react'
import HotelList from './HotelList';

function searchForm() {
  const [input, setInput] = React.useState("");

  const handleChange = (e)=>{
    console.log(e.target.value)
    let lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase)
  }
  return (
    <>
      <div className='flex justify-center align-center gap-3 mt-5'>
        <input 
              type="text"
              value={input} 
              placeholder="Search for names, groups and address" 
              className="w-1/2 outline-blue-200 bg-gray-100 text-black-700 border border-black-700 rounded py-3 px-4 leading-tight hover:outline outline-2 hover:outline-gray-900"
              onChange={handleChange}
            />
      </div>

      {/* <HotelList input={input}/> */}
    </>
  )
}

export default searchForm