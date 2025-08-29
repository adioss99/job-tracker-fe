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

import { useRegister } from "@/hooks/use-auth";
import { useTitle } from "@/stores/use-utils";
import {
  registerSchema,
  type RegisterFormData,
} from "@/validation/auth-validation";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();

  const setTitle = useTitle((state) => state.setTitle);
  useEffect(() => {
    setTitle("Register");
  }, [setTitle]);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const res = await mutateAsync(data);
    if (res.success) {
      toast.success(
        "Register successful! \nPlease login with your credentials."
      );
      navigate("/login");
    } else {
      toast.error("Login failed. \nPlease check your credentials.");
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="min-h-15">
                <FormLabel className="ml-1">Name</FormLabel>
                <FormControl>
                  <Input placeholder="insert your name" {...field} />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="min-h-15">
                <FormLabel className="ml-1">Email</FormLabel>
                <FormControl>
                  <Input placeholder="insert your email" {...field} />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="min-h-15">
                <FormLabel className="ml-1">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Insert your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="ml-1" />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-0.5 mt-2">
            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>{" "}
            <div className="overflow-x-hidden">
              <div className="flex flex-row justify-center items-center gap-2">
                <Separator />
                <span className="text-center text-xs font-extralight">or</span>
                <Separator className="w-fit" />
              </div>
            </div>
            <Link to={"/login"}>
              <Button className="w-full" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
