import React, {useState, createContext, useContext, ReactNode} from 'react';

interface CalculatorContextData {
  variablesNumber: string;
  restrictionsNumber: string;
  setVariablesNumber: React.Dispatch<React.SetStateAction<string>>;
  setRestrictionsNumber: React.Dispatch<React.SetStateAction<string>>;
}

const CalculatorContext = createContext({} as CalculatorContextData);

interface CalculatorProviderProps {
  children: ReactNode;
}

export function CalculatorProvider({children}: CalculatorProviderProps) {
  const [variablesNumber, setVariablesNumber] = useState('');
  const [restrictionsNumber, setRestrictionsNumber] = useState('');

  return (
    <CalculatorContext.Provider value={{
      variablesNumber,
      setVariablesNumber,
      restrictionsNumber,
      setRestrictionsNumber,
    }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  return useContext(CalculatorContext);
}
