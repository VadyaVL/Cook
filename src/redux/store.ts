import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { accountSlice } from './slices/account';

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer
    }
});

export const useAppSelector = useSelector.withTypes <ReturnType<typeof store.getState>>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
