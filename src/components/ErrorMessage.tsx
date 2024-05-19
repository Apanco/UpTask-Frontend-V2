import React from 'react'

type ErrorMessageProps = {
    children: React.ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <div className=' m-0 text-red-600 font-bold text-sm'>
      {children}
    </div>
  )
}
