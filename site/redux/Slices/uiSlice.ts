import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  displaySidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  sidebarView: string
  modalView: string
}

export type MODAL_VIEWS =
  | 'SIGNUP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGOT_VIEW'
  | 'NEW_SHIPPING_ADDRESS'
  | 'NEW_PAYMENT_METHOD'

export type SIDEBAR_VIEWS =
  | 'CART_VIEW'
  | 'CHECKOUT_VIEW'
  | 'PAYMENT_METHOD_VIEW'
  | 'MOBILE_MENU_VIEW'
  | 'SHIPPING_VIEW'
  | 'PAYMENT_VIEW'

const initialState: UIState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  sidebarView: 'CART_VIEW',
}

export const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.displaySidebar = true
    },
    closeSidebar: (state) => {
      state.displaySidebar = false
    },
    toggleSidebar: (state) => {
      state.displaySidebar = !state.displaySidebar
    },
    closeSidebarIfPresent: (state) => {
      state.displaySidebar = state.displaySidebar && false
    },
    openDropdown: (state) => {
      state.displayDropdown = true
    },
    closeDropdown: (state) => {
      state.displayDropdown = false
    },
    openModal: (state) => {
      state.displayModal = true
    },
    closeModal: (state) => {
      state.displayModal = false
    },
    setModalView: (state, action: PayloadAction<MODAL_VIEWS>) => {
      state.modalView = action.payload
    },
    setSidebarView: (state, action: PayloadAction<SIDEBAR_VIEWS>) => {
      state.sidebarView = action.payload
    },
  },
})

export const {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  closeSidebarIfPresent,
  openDropdown,
  closeDropdown,
  openModal,
  closeModal,
  setModalView,
  setSidebarView,
} = uiSlice.actions

export default uiSlice.reducer
