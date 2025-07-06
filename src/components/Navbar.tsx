import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-secondary-background shadow-shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-heading text-foreground hover:text-main transition-colors"
            >
              BIFLEX
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <Link href="/signin">
                <Button
                  className="font-base text-foreground hover:bg-background hover:text-foreground border-2 border-border shadow-shadow hover:shadow-[2px_2px_0px_0px_var(--border)] transition-all"
                >
                  SIGN IN
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="font-base text-foreground hover:bg-background hover:text-foreground border-2 border-border shadow-shadow hover:shadow-[2px_2px_0px_0px_var(--border)] transition-all"
                >
                  SIGN UP
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                SIGN OUT
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
