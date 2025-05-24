import React from 'react'

const Error = ({message}:{message:string}) => {
  return (
    <div className='text-xs text-red-300 ml-1'>{message}</div>
  )
}

export default Error