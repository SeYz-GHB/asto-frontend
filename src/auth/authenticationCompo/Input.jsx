import React from 'react'

const Input = ({icon :Icon,...props}) => {
  return (
    <div className='relative mb-4'>
        <div className='absolute inset-y-0 left-0 flex 0 items-center pl-3 '>

          <Icon className= "size-5 text-black"/>
        </div>
        <input {...props}  className="w-full pl-10 pr-3 py-2  bg-opacity-50 rounded-lg border border-black focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
/>
    </div>
  )
}

export default Input
