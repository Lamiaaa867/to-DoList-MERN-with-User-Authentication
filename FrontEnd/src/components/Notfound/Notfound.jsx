import React, { useEffect, useState } from 'react';
import notfound from '../../assets/notfound.jpg';

export default function Notfound() {

  useEffect(() => {
   
  }, []);
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${notfound})` }}
    >
      <h1 className="text-4xl text-white font-bold bg-black bg-opacity-50 px-6 py-3 rounded-lg">
        404 - Page Not Found
      </h1>
    </div>
  );
}