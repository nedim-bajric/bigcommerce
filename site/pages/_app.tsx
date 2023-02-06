import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'

import { Head, Providers } from '@common'
import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <Providers>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  )
}
