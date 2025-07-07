import { getUserSelf } from "@/services/userService";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
      {children}
    </div>
  );
}
