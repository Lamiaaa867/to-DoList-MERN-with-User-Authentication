import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import bgImage from '../../assets/todolist.jpg';

export default function Layout() {
  const location = useLocation();

  const hideLayoutRoutes = ['/login', '/signup'  ,'/notfound'];
  const is404 = location.state?.is404;

  const isAuthRoute = hideLayoutRoutes.includes(location.pathname)||is404;

  return (
    <div className="flex min-h-screen">
    
      {!isAuthRoute && <SideBar />}

{/*     
      <div className="flex-1 flex flex-col ">
      
      //  {!isAuthRoute && <NavBar />} */}

        <main
  className={`flex-1 ${isAuthRoute ? 'bg-cover bg-center' : ''}`}
  style={
    isAuthRoute
      ? { backgroundImage: `url(${bgImage})` }
      : {}
  }
>
          <Outlet />
        </main>
      </div>
  //  </div>
  );
}
