'use client';

import { useCurrentUser } from "@/hooks/user";
import { UserDto } from "@/services/userService";
import { useAuth } from "@clerk/nextjs";
import { createContext } from "react";

export interface IUserContext {
  isAuthLoaded: boolean
  isSignedIn?: boolean
  authId?: string | null
  isUserLoaded: boolean
  user?: UserDto | null
  isUserFetching?: boolean
  refetchUser?: () => Promise<void>
}

export const UserContext = createContext<IUserContext>({
  isAuthLoaded: false,
  isUserLoaded: false
});

export default function UserProvider ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, isSignedIn, userId: authId } = useAuth();
  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refetchUser,
    isFetching: isUserFetching
  } = useCurrentUser(isLoaded && isSignedIn)

  const contextValue: IUserContext = {
    isAuthLoaded: isLoaded,
    isSignedIn,
    authId,
    isUserLoaded: !isUserLoading,
    user,
    isUserFetching: isUserLoading ? undefined : isUserFetching,
    refetchUser: isUserLoading ? undefined : async () => {
      await refetchUser();
    },
  };

  return (
    <UserContext value={contextValue}>
      {children}
    </UserContext>
  );
}
