This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Setup `.env.local` on root directory

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZGVlcC1idWxsZnJvZy04OC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=ask_for_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
MONGODB_URI=mongodb://user:pass@localhost:27017/biflex?authSource=admin&retryWrites=true&w=majority
FREE_EXERCISE_DB_LOCAL_PATH=path/to/local/free-exercise-db
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Populating the Exercise Collection

Make sure to set the following environment variables:

```
MONGODB_URI=mongodb://user:pass@localhost:27017/biflex?authSource=admin&retryWrites=true&w=majority
FREE_EXERCISE_DB_LOCAL_PATH=path/to/local/free-exercise-db
```

Run the script:

```bash
node .\src\scripts\updateExerciseDb.js
```

## Adding images to the

Make sure to set the following environment variables:

```
MONGODB_URI=mongodb://user:pass@localhost:27017/biflex?authSource=admin&retryWrites=true&w=majority
FREE_EXERCISE_DB_LOCAL_PATH=path/to/local/free-exercise-db
```

Populate the Exercise collection via the previous section.

Run the script:

```bash
node .\src\scripts\addExerciseImages.js
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
