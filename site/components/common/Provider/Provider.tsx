import { FC, ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { store } from 'redux/store'

const Providers: FC<{ children?: ReactNode }> = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider>{children}</ThemeProvider>
  </Provider>
)
export default Providers
