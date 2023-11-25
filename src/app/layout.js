"use client"
import StateProvider from './StateProvider'
import Navbar from './components/Navbar/Navbar'
import './globals.css'
import { usePathname } from 'next/navigation'


export default function RootLayout({ children }) {
  const pathName = usePathname()
  return (
    <html lang="en">
      {/* <head>
        <script src="https://cdn.jsdelivr.net/npm/vega@5" async></script>
        <script src="https://cdn.jsdelivr.net/npm/vega-lite@5" async></script>
        <script src="https://cdn.jsdelivr.net/npm/vega-embed@6" async></script>
      </head> */}
      <body>
        <StateProvider>
          {
            pathName !== '/Screen3' &&
            <Navbar />
          }
          {children}
        </StateProvider>
      </body>
    </html>
  )
}
