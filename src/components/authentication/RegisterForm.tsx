/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import Password from "../ui/Password";
import { useRegisterMutation } from "@/redux/auth/auth.api";
import { FaGoogle } from "react-icons/fa";

// register schema
const RegisterSchema = z
  .object({
    name: z.string().min(2, { error: "username too sort" }).max(50),
    email: z.email(),
    password: z.string().min(8, { error: "password too sort" }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

// register form component
export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // form data submit handler
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      await register(data).unwrap();
      toast.success("User created Successfully");
    } catch (error: any) {
      toast.error("Failed to create user", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* form header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email name and password below to register to your account
        </p>
      </div>
      {/* form */}
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        {/* google sign up button */}
        <Button>
          <FaGoogle className="mr-2" /> Register with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account? <Link className="text-blue-500" to="/login">Sign In</Link>
      </div>
    </div>
  );
}
