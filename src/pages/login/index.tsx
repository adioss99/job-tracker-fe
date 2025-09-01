import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";

import { useLogin } from "@/hooks/use-auth";
import { useTitle } from "@/stores/use-utils";
import { loginSchema, type LoginFormData } from "@/validation/auth-validation";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();
  const setTitle = useTitle((state) => state.setTitle);
  useEffect(() => {
    setTitle("Login");
  }, [setTitle]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await mutateAsync(data);
    if (res.success) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Login failed. \nPlease check your credentials.");
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form autoComplete="on" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="min-h-15">
                <FormLabel className="ml-1 mb-1">Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage className="ml-1 text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="min-h-15">
                <FormLabel className="ml-1 mb-1">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Insert your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="ml-1 text-end" />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-0.5 mt-2">
            <Button className="w-full" disabled={isPending} type="submit">
              {isPending ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <div className="overflow-x-hidden">
              <div className="flex flex-row justify-center items-center gap-2">
                <Separator />
                <span className="text-center text-xs font-extralight">or</span>
                <Separator className="w-fit" />
              </div>
            </div>
            <Link to={"/register"}>
              <Button className="w-full" variant="outline">
                Register
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
