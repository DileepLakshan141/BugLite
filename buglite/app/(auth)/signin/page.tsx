"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { signin } from "@/functions/signin";
import { useRouter } from "next/navigation";
import useUserStore from "@/utils/zustand/store";
import Image from "next/image";
import Link from "next/link";

const SigninPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUserStore();
  const router = useRouter();

  const signinForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInSubmission = async (values: z.infer<typeof signInSchema>) => {
    try {
      const response = await signin({
        email: values.email,
        password: values.password,
      });
      if (response.success) {
        toast.success(response.message || "Login successful!");
        setUser({
          id: response.data?.user.id,
          username: response.data?.user.name,
          email: response.data?.user.email,
          image: response.data?.user.image,
        });
        router.push("/dashboard/home");
      } else {
        toast.error(
          response.message || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Login process failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative">
      {/* video container */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full absolute top-0 left-0 object-cover"
      >
        <source className="w-full" src="/buglite_back1.mp4" type="video/mp4" />
      </video>
      {/* signins form */}
      <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center">
        <Card className="w-full min-h-[500px] p-4 mx-4 md:max-w-[450px] flex flex-col justify-start items-center">
          <Image
            src="/buglite.png"
            width={90}
            height={10}
            alt="buglite logo"
            className="absolute"
          />
          <CardTitle className="text-xl mt-9">Login to Your Account</CardTitle>
          <CardDescription className="w-[90%] text-center -translate-y-2">
            Welcome back to Buglite! Pick up right where you left off and keep
            squashing bugs like a pro. Let’s get you signed in and rolling
            again.
          </CardDescription>
          <CardContent className="w-full">
            <Form {...signinForm}>
              <form onSubmit={signinForm.handleSubmit(signInSubmission)}>
                {/* email field */}
                <FormField
                  name="email"
                  control={signinForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="mb-4">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email Address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* password field */}
                <FormField
                  name="password"
                  control={signinForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="my-4">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button disabled={loading} className="w-full mt-3">
                  {loading ? "Processing..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <Separator />
          <p className="text-muted-foreground text-sm text-center">
            Do not have an account yet?{" "}
            <Link href="/signup" className="text-semibold underline">
              Create Account
            </Link>{" "}
            <br /> Developed & Maintained by Dileep Lakshan &#169;2025
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SigninPage;
