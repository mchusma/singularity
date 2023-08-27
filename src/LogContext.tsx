// LogContext.tsx
import React, { useState } from 'react';


// Define an interface for the context state
interface LogContextType {
  messages: string[];
  addLogMessage: (message: string) => void;
}

// Use this interface to create the context
export const LogContext = createContext<LogContextType>({
  messages: [],
  addLogMessage: (message: string) => {}
});

export const useLog = () => {
  return useContext(LogContext);
};

type LogProviderProps = {
    children: React.ReactNode;
};

export const LogProvider: React.FC<LogProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState(["Welcome to Singularity!", "This is another log message", "a", "n", "d", "a", "n", "o", "t", "h", "e", "r", "o", "n", "e", "!", "This is a long log message that will wrap to the next line. This is a long log message that will wrap to the next line. This is a long log message that will wrap to the next line."]);
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  const addLogMessage = (logMessage: string) => {
    setCurrentTypingMessage(logMessage);
    // ... rest of the logic
  };

  return (
    <LogContext.Provider value={{ messages, addLogMessage }}>
      {children}
    </LogContext.Provider>
  );
};

