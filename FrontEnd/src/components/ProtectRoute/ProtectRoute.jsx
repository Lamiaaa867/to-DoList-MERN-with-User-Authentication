import React from 'react'
import { useEffect } from 'react'
import Style from './ProtectRoute.module.css'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectRoute(props) {
  if(localStorage.getItem("user")!==null){
return props.children 
  }
  else {
  return <Navigate to={'/login'}/>
  }
 
}
