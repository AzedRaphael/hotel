import React,{useState} from 'react'

const AppContext = React.createContext()

function ApiProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [hotels, setHotels] = useState([])
    const [search, setSearch] = useState("")

  return (
    <AppContext.Provider
        value={{ loading, hotels, search, setSearch}}
    >
        {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {ApiProvider, AppContext}