'use client';

import ButtonList from "@/components/ButtonList";
import { useAuth } from "@clerk/clerk-react";
import { LogOut, Settings, ShieldUser } from "lucide-react";

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
          type: 'link',
          label: 'Security Settings',
          icon: <ShieldUser />,
          href: '/dashboard/account/security',
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
