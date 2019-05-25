import React, {useState} from 'react'

const FilterContext = React.createContext()

const FilterContextProvider = (props) => {
  const [filter, setFilter] = useState('')
  const handleFilterUpdate = (character) => {
    if (filter === character) {
      setFilter('')
    } else {
      setFilter(character)
    }
  }

  return (
    <FilterContext.Provider value={{filter, setFilter: handleFilterUpdate}}>
      {props.children}
    </FilterContext.Provider>
  )
}

export {FilterContext, FilterContextProvider}
