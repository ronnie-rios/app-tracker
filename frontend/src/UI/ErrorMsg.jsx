import React from 'react'

const ErrorMsg = (props) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">{props.errTitle}: </strong>
        <span className="block sm:inline">{props.errMessage}</span>
    </div>
  )
}

export default ErrorMsg