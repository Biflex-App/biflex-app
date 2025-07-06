import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function MarketingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-heading text-foreground mb-6">
              Welcome to <span className="text-main">BIFLEX</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Your personal workout companion that works everywhere
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-border bg-secondary-background p-8 shadow-shadow">
              <h2 className="text-2xl font-heading text-foreground mb-4">Get Started</h2>
              <p className="text-foreground/80 mb-6">
                Create your account to start building personalized workout routines and track your fitness journey with our comprehensive exercise database.
              </p>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-foreground/60 mb-2">Already have an account?</p>
                  <Link
                    href="/signin"
                    className="inline-block font-base text-foreground hover:text-main border-b-2 border-border hover:border-main transition-colors"
                  >
                    SIGN IN HERE
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-2 border-border bg-main p-8 shadow-shadow">
              <h2 className="text-2xl font-heading text-main-foreground mb-4">Key Features</h2>
              <ul className="space-y-3 text-main-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-main-foreground mr-3"></span>
                  Handcraft and schedule routines with supersets and alternatives.
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-main-foreground mr-3"></span>
                  Track the time and reps on the gym. Analyze your personal bests & progress over time.
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-main-foreground mr-3"></span>
                  Browse from a collection of over 800 exercises.
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-main-foreground mr-3"></span>
                  Train while offline or online on any devices.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
