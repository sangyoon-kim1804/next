import '@/styles/global.css'

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import NextNProgress from 'nextjs-progressbar'
//import { Noto_Sans_KR, Noto_Sans, Cabin, Montserrat } from "@next/font/google"
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <NextNProgress
        color="#000000"
        startPosition={0.3}
        stopDelayMs={2000}
        height={1}
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </Provider>
  );
}
