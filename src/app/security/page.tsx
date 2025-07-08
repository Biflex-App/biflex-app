import { UserProfile } from "@clerk/nextjs";

export default async function UpdateAccountPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <UserProfile/>
      </div>
    </div>
  );
}
