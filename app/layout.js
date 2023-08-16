import './globals.css'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Restaurant App',
  description: 'Built by Ghosty @ Blacksla.sh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
