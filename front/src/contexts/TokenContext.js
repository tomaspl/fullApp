import React, {useState} from 'react'

const Context = React.createContext({})

export function TokenContextProvider ({children}) {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return <Context.Provider value={[token, setToken]}>
    {children}
  </Context.Provider>
}

export default Context