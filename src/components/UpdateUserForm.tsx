'use client';

import { IUser } from "@/models/User";
import z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useCallback } from "react";
import { useApi } from "@/hooks/api";
import { Skeleton } from "./ui/skeleton";
import { useCreateUser, useUpdateUser } from "@/hooks/user";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string(),
  handle: z.string()
    .min(3, { message: 'Handle must have at least 3 characters' })
    .max(15, { message: 'Handle cannot be more than 15 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, 'Handle can only contain letters, numbers, and underscores'),
  name: z.string()
    .min(3, { message: 'Name must have at least 3 characters' })
    .max(255, { message: 'Name cannot be more than 255 characters' })
});

export default function UpdateUserForm({
  user,
  onboardingEmail,
}: {
  user?: IUser,
  onboardingEmail?: string
}) {
  const api = useApi(true);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user ? user.email : onboardingEmail,
      name: '',
      handle: '',
    }
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    try {
      if (user) {
        await updateUser.mutateAsync({
          id: user._id.toString(),
          data: {
            name: values.name,
            handle: values.handle,
          }
        });
        toast.success("Account updated");
      }
      else {
        await createUser.mutateAsync({
          name: values.name,
          handle: values.handle,
        });
        toast.success("Welcom to Biflex");
        router.push('/dashboard');
      }
    }
    catch (error) {
      if (error instanceof ApiError && error.status < 500) {
        toast.error(error.message);
      }
    }
  }, [user, createUser, updateUser, router]);

  if (!api.ready) {
    return (
      <Card className="w-full max-w-sm bg-secondary-background">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-1/2 mb-2" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-2/3" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 mb-2" />
            <Skeleton className="h-10 mb-2" />
            <Skeleton className="h-10 mb-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full min-w-[320px] max-w-[400px] sm:min-w-[450px] sm:max-w-[500px] md:min-w-[500px] md:max-w-[600px] bg-secondary-background">
          <CardHeader>
            {
              user ? (
                <>
                  <CardTitle>Account Information</CardTitle>
                </>
              ) : (
                <>
                  <CardTitle>Create your account</CardTitle>
                  <CardDescription>
                    Enter your name and choose your handle
                  </CardDescription>
                </>
              )
            }
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Juan de la Cruz"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Handle</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="jdl_cruz"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={createUser.isPending || updateUser.isPending}
            >
              {createUser.isPending || updateUser.isPending
                ? <Spinner size="sm"/>
                : (user ? 'Update Account' : 'Create Account')
              }
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
