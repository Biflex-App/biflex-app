import UpdateUserForm from "@/components/UpdateUserForm";
import { getUserSelf } from "@/services/userService";
import { auth } from "@clerk/nextjs/server";

export default async function UpdateAccountPage() {
  const { userId } = await auth();
  const user = await getUserSelf(userId!);

  return (
    <div className="p-4 w-full flex justify-center">
      <UpdateUserForm user={user!}/>
    </div>
  );
}
