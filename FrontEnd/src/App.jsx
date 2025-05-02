import React from 'react'
import { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import Layout from './components/Layout/Layout'

 import LogIn from './components/LogIn/LogIn'
 import SignUp from './components/SignUp/SignUp'
 import Notfound from './components/Notfound/Notfound'
import './App.css'
 import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashborad/Dashborad'
import AddTaskForm from './components/AddTaskForm/AddTaskForm'
import DisplayUserData from './components/DisplayUserData/DisplayUserData'
import UpdateUserData from './components/UpdateuserData/UpdateuserData'
import { UserContextProvider } from './Context/UserContext'
import { Navigate } from 'react-router-dom'
import ProtectRoute from './components/ProtectRoute/ProtectRoute'


 const router = createBrowserRouter ([
  {path:'',element:<Layout/>,children:[
  
    {path:'/', element: <ProtectRoute> <Dashboard/></ProtectRoute>},
    {path:'create-task', element:   <ProtectRoute><AddTaskForm/></ProtectRoute> },
    {path:'profile', element:  <ProtectRoute> <DisplayUserData/></ProtectRoute>},
    {path:'update-user-data', element: <ProtectRoute> <UpdateUserData/></ProtectRoute>},
    {path:'login', element:<LogIn/>},
    {path:'signup', element:<SignUp/>},
  
    {
      path: '*',
      element: <Navigate to="/notfound" state={{ is404: true }} replace />,
    },
    {
      path: '/notfound',
      element: <Notfound />,
    }
  ]
  }
 ])
function App() {
  const [count, setCount] = useState(0)

  return (

<UserContextProvider>
<ToastContainer />
<RouterProvider router={router} />
</UserContextProvider>
 

 
  )
}

export default App
