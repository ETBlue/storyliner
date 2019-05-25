import React from 'react'

const LabelColorContext = React.createContext()

const LabelColorContextProvider = (props) => {
  return (
    <LabelColorContext.Provider value={props.value}>
      {props.children}
    </LabelColorContext.Provider>
  )
}

export {LabelColorContext, LabelColorContextProvider}
