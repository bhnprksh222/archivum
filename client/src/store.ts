import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';


const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
    persistConfig,
    rootReducer
);


const composeEnhancers = composeWithDevTools({});
const middleware = [thunk]
const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(...middleware),
        // other store enhancers if any
    ),
);

export default store;
export const persistor = persistStore(store);


export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch