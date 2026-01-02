import { RedirectToSignIn } from '@clerk/clerk-react'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { Outlet } from 'react-router-dom'
import { AppShell } from '@/components/app-shell'

export default function AppLayout() {
  return (
    <>
      <AuthLoading>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </AuthLoading>
      <Authenticated>
        <AppShell>
          <Outlet />
        </AppShell>
      </Authenticated>
      <Unauthenticated>
        <RedirectToSignIn />
      </Unauthenticated>
    </>
  )
}
