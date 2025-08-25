import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import Password from "@/components/ui/Password";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/auth/auth.api";
import { FaGoogle } from "react-icons/fa";

// login schema
export const LoginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" }),
});

// loginfrom component
export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [login] = useLoginMutation();

  // form data validation
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // form data submit
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      console.log("Login successful ekhane:", data);
      await login(data).unwrap();
      toast.success("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* form header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      {/* form */}
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} type="email" />
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
                    This is your password
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
        {/* google login button */}
        <Button>
          <FaGoogle className="mr-2" />
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don't have an account? <Link to="/register" className="text-blue-700">Sign up</Link>
      </div>
    </div>
  );
}
