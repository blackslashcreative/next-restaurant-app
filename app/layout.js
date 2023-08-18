import { AppContextProvider } from './context/appContext'
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/navigation'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Restaurant App</title>
        <meta name='description' content='Built by Ghosty @ Blacksla.sh' />
      </head>
      <body className={inter.className}>
        <AppContextProvider>
          <Navigation/>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}