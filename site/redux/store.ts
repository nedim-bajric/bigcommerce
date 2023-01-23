import { configureStore } from '@reduxjs/toolkit'
import sampleReducer from './Slices/SampleSlice'
import uiReducer from './Slices/UISlice'
export const store = configureStore({
  reducer: {
    sample: sampleReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
