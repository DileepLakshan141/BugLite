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
import { signUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { signup } from "@/functions/signup";
import { toast } from "sonner";
import { useState } from "react";

const SignupPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const signupForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const signUpSubmission = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setLoading(true);
      const response = await signup({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.success) {
        toast.success(response.message);
        signupForm.reset();
        signupForm.clearErrors();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.");
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
          <CardTitle className="text-xl mt-9">Create New Account</CardTitle>
          <CardDescription className="w-[90%] text-center -translate-y-2">
            Create your Buglite account and join the squad! Whether you are
            starting fresh or gearing up for your next big feature, we’ve got
            your back.
          </CardDescription>
          <CardContent className="w-full">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(signUpSubmission)}>
                {/* username field */}
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => {
                    return (
                      <FormItem className="mb-4">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* email field */}
                <FormField
                  name="email"
                  control={signupForm.control}
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
                  control={signupForm.control}
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
                {/* confirm password field */}
                <FormField
                  name="confirm_password"
                  control={signupForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="my-4">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Re-enter your password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button disabled={loading} className="w-full mt-3">
                  {loading ? "Processing..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <Separator />
          <p className="text-muted-foreground text-sm text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-semibold underline">
              Login to Account
            </Link>{" "}
            <br /> Developed & Maintained by Dileep Lakshan &#169;2025
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
