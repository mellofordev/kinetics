import { Outlet } from '@tanstack/react-router'
import { Header } from '../components/header'
export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header/>
      <Outlet />
    </div>
  )
}