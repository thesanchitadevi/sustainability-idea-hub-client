"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/actions/auth.action";
import { loginFormSchema } from "@/schemas/login.validation";
import { Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/context/userContext";

const LoginForm = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const {isLoading, setIsLoading} = useUser();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const fillAdminCredentials = () => {
    form.setValue("email", "ranok.admin@gmail.com");
    form.setValue("password", "123456");
  };

  const fillMemberCredentials = () => {
    form.setValue("email", "ranokraihan@gmail.com");
    form.setValue("password", "123456");
  };
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    setLoading(true)
    setError("");
    console.log("ia loading", isLoading)

    try {
      console.log("Logging in with values:", values);
      const res = await loginUser(
        values as {
          email: string;
          password: string;
        }
      );
      if (res?.success && res?.data?.accessToken) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        setError("Invalid email or password.");
      }
      // console.log("Login response:", res);
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoading(false)
    }
  }

 

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 w-full flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              <User className="h-4 w-4" />
              <span>Credentials</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={fillAdminCredentials}>
              Admin Credentials
            </DropdownMenuItem>
            <DropdownMenuItem onClick={fillMemberCredentials}>
              Member Credentials
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    type="email"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        disabled={loading}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
