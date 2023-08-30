import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import unitsReducer from './unitSlice';
import resourcesReducer from './resourceSlice';
import logsReducer from './logSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  units: unitsReducer,
  resources: resourcesReducer,
  logs: logsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger), // Add logger middleware here
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;