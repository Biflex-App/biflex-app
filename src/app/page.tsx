import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedOut>
        Signed Out
        <SignIn routing="hash" />
      </SignedOut>
      <SignedIn>
        Signed In
        <UserButton showName/>
      </SignedIn>
    </div>
  );
}
