import Navbar from "@/components/Navbar";
import { getUserSelf } from "@/services/userService";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const user = await getUserSelf(userId);

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <h1>Onboarding</h1>
    </div>
  );
}
