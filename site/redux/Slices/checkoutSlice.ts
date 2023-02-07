import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CardFields } from '@commerce/types/customer/card'
import { AddressFields } from '@commerce/types/customer/address'

// Define a type for the slice state
interface checkoutState {
  cardFields: CardFields
  addressFields: AddressFields
}

// Define the initial state using that type
const initialState: checkoutState = {
  cardFields: {} as CardFields,
  addressFields: {} as AddressFields,
}

type Action =
  | {
      type: 'SET_CARD_FIELDS'
      card: CardFields
    }
  | {
      type: 'SET_ADDRESS_FIELDS'
      address: AddressFields
    }
  | {
      type: 'CLEAR_CHECKOUT_FIELDS'
    }

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCardFields: (state, action: PayloadAction<any>) => {
      state.cardFields = action.payload
    },
    setAddressFields: (state, action: PayloadAction<any>) => {
      state.addressFields = action.payload
    },
    clearCheckoutField: (state) => {
      state.cardFields = initialState.cardFields
      state.addressFields = initialState.addressFields
    },
  },
})

export const { setCardFields, setAddressFields, clearCheckoutField } =
  checkoutSlice.actions

export default checkoutSlice.reducer
