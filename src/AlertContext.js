import React, { createContext, useState } from 'react'

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [questionCount, setQuestionCount] = useState(0);

  return (
    <AlertContext.Provider value={{
      questionCount, setQuestionCount
    }}>
      {children}
    </AlertContext.Provider>
  );
}