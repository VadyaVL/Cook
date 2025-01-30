import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { accountSlice } from './slices/account';
import { userDetailsSlice } from './slices/user-details';
import { userListSlice } from './slices/user-list';

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        userList: userListSlice.reducer,
        userDetails: userDetailsSlice.reducer,
    }
});

export const useAppSelector = useSelector.withTypes <ReturnType<typeof store.getState>>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
