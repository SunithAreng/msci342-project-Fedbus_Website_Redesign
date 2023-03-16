import { configureStore } from '@reduxjs/toolkit';
import url from '../features/url'

export default configureStore({
    reducer: {
        serverURL: url,
    },
});