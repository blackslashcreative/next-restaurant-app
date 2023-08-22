'use client';
import { AppContextProvider } from './appContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/navigation';
import client from './client';
import { ApolloProvider } from '@apollo/client';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Nybble</title>
        <meta name='description' content='Built by Ghosty @ Blacksla.sh' />
      </head>
      <body className={inter.className}>
        <AppContextProvider>
          <ApolloProvider client={client}>
            <Navigation/>
            {children}
          </ApolloProvider>
        </AppContextProvider>
      </body>
    </html>
  )
}