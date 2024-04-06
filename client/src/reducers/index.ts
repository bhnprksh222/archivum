// reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';
import contractReducer from './contractReducer';
import providerReducer from './providerReducer';

const rootReducer = combineReducers({
    account: accountReducer,
    contract: contractReducer,
    provider: providerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;