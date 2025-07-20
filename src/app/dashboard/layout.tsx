'use client';

import DashboardNavBar from "@/components/DashboardNavBar";
import { useContext, useEffect } from "react";
import { UserContext } from "@/providers/userContext";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user.isAuthLoaded) {
      if (!user.isSignedIn) {
        router.push('/');
      }

      if (user.isUserLoaded && !user.user) {
        router.push('/onboarding');
      }
    }
  }, [
    router,
    user.isAuthLoaded,
    user.isSignedIn,
    user.isUserLoaded,
    user.user,
  ]);

  if (!user.isAuthLoaded || !user.isSignedIn || !user.isUserLoaded || !user.user) {
    return <Spinner/>;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="p-5 mb-10">
        {children}
      </main>
      <DashboardNavBar />
    </div>
  );
}
