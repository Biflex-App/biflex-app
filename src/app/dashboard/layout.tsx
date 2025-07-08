import { getUserSelf } from "@/services/userService";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardNavBar from "@/components/DashboardNavBar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const user = await getUserSelf(userId);

  if (!user) {
    redirect('/onboarding');
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="p-5">
        {children}
      </main>
      <DashboardNavBar />
    </div>
  );
}
