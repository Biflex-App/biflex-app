'use client';

import ButtonList from "@/components/ButtonList";
import { useAuth } from "@clerk/clerk-react";
import { LogOut, Settings } from "lucide-react";

export default function AccountPage() {
  const { signOut } = useAuth();
  return (
    <ButtonList
      items={[
        {
          type: 'link',
          label: 'Update Account Info',
          icon: <Settings/>,
          href: '/dashboard/account/update',
        },
        {
          type: 'action',
          label: 'Sign Out',
          icon: <LogOut/>,
          onClick: async () => {
            await signOut();
          }
        }
      ]}
    />
  );
}
