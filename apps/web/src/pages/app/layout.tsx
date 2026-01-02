import { RedirectToSignIn } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Outlet } from "react-router-dom";
import { AppShell } from "@/components/app-shell";

function AuthenticatedApp() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export default function AppLayout() {
  return (
    <>
      <AuthLoading>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </AuthLoading>
      <Authenticated>
        <AuthenticatedApp />
      </Authenticated>
      <Unauthenticated>
        <RedirectToSignIn />
      </Unauthenticated>
    </>
  );
}
