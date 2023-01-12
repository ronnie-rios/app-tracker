import React from 'react'

const ErrorMsg = () => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Invalid Login</strong>
        <span class="block sm:inline">Enter correct credentials.</span>
    </div>
  )
}

export default ErrorMsg