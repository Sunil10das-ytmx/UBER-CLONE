import React from 'react'
import { createContext } from 'react-router-dom'

export const UserDataContext = createContext()

const UserContext = ({children}) => {
  return (
    <div>
        <UserDataContext.Provider>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
