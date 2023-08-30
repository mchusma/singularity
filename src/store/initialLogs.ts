import { LogsState } from './logSlice';

export const initialLogs: LogsState = {
  logs: [
    {
      id: 1, 
      message: 'Welcome to the game!'
    },
    {
      id: 2, 
      message: 'Welcome to the game my friend!'
    },
    {
      id: 3, 
      message: 'Tap the log to expand it.'
    }
  ]
};