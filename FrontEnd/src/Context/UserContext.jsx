

import { createContext, useState } from "react";
export const UserContext= createContext(0)
export function UserContextProvider(props){
 const [userLogin , setuserLogin]=useState( JSON.parse(localStorage.getItem("user")) || null)
    return <UserContext.Provider value={{userLogin , setuserLogin}}>
  {props.children}
    </UserContext.Provider>
}