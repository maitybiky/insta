import React, { createContext, useState } from 'react'
export const Biky = createContext();
const UserContext = ({children}) => {
    const object = {
        name :'surajit',
        title : 'maity'
    }
    const [first, setfirst] = useState(object)
  return (
   <Biky.Provider value={{first,setfirst}}>
    {children}

   </Biky.Provider>
  )
}

export default UserContext