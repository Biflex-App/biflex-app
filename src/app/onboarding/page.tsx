import UpdateUserForm from "@/components/UpdateUserForm";
import { getUserSelf } from "@/services/userService";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const user = await getUserSelf(userId);

  if (user) {
    redirect('/dashboard');
    return;
  }

  const clerkUser = await currentUser();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <UpdateUserForm
          onboardingEmail={clerkUser?.emailAddresses[0].emailAddress}
        />
      </div>
    </div>
  );
}
