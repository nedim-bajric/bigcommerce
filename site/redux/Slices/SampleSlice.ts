import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface SampleState {
  value: number
}

// Define the initial state using that type
const initialState: SampleState = {
  value: 0,
}

export const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = sampleSlice.actions

export default sampleSlice.reducer
