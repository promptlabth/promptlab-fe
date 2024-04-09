import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
interface TextContextType {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with an undefined default value
const TextContext = createContext<TextContextType | undefined>(undefined);

interface TextProviderProps {
  children: ReactNode; // This line explicitly types the 'children' prop
}

// Create a provider component with typed props
export const TextProvider: React.FC<TextProviderProps> = ({ children }) => {
  const [text, setText] = useState('');

  return <TextContext.Provider value={{ text, setText }}>{children}</TextContext.Provider>;
};

// Custom hook to use the context
export const useText = () => {
  const context = useContext(TextContext);
  if (context === undefined) {
    throw new Error('useText must be used within a TextProvider');
  }
  return context;
};
