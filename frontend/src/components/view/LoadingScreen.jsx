import React from 'react'
import BackButton from './BackButton';

export default function LoadingScreen({ children }) {
  return (
    <>
      <p>Loading...</p>
      {children}
    </>
  )
}
