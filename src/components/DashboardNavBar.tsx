"use client"

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Home, Calendar, Dumbbell, Users, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    label: "Workouts",
    href: "/dashboard/workouts",
    icon: Dumbbell,
  },
  {
    label: "Buddies",
    href: "/dashboard/buddies",
    icon: Users,
  },
  {
    label: "Account",
    href: "/dashboard/account",
    icon: User,
  },
];

export default function DashboardNavBar() {
  const segment = useSelectedLayoutSegment();

  return (
    <NavigationMenu className="fixed bottom-0 w-full z-50 flex justify-center rounded-none border-0 border-t-2">
      <NavigationMenuList className="flex justify-center items-center w-screen">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = (href === '/dashboard' && segment === null)
            || (segment === href.split('/').pop());
          return (
            <NavigationMenuItem key={label}>
              <Link href={href} passHref>
                <NavigationMenuLink className={`flex flex-col items-center w-16 ${isActive ? 'bg-blue-100' : ''}`}>
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold tracking-wide">
                    {label}
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
