import React from 'react'

export default function LoadingScreen({ children }: any) {
  return (
    <>
      <p>Loading...</p>
      {children}
    </>
  )
}
