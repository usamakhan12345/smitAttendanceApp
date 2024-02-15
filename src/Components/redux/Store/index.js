import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authReducer from "../Slices/authSlice"

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const rootReducer = combineReducers({
//     auth : authReducer
//   })

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const persistor = persistStore(store);




export default configureStore({
        reducer : {
          auth : authReducer
        }
    //  persistedReducer,
// middleware: () => getDefaultMiddleware(),
});
