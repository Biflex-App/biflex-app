'use client';

import { IUser } from "@/models/User";
import z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user ? user.email : onboardingEmail,
      name: '',
      handle: '',
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm bg-secondary-background">
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
            <Button type="submit" className="w-full">
              { user ? 'Update Account' : 'Create Account' }
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
