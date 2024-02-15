"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner"

function LoginForm() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  //   const inputStyle:string = "w-full bg-white";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email ..."
                  className="input-field-style"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your very Secure password ..."
                  className="input-field-style"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"default"} className="button-style w-full" type="submit">
          Login
        </Button>
        <hr />
        <Button variant={"default"} className="button-style w-full" type="button" onClick={() => signIn("google")}>
          Login with google
        </Button>

        <div className="flex justify-between">
          <p className="text-myColors-primary-text_white">
            Don’t have an account ?{" "}
            <Link href={"/register"} className="font-bold underline">
              Create Your Account
            </Link>
          </p>

          <p className="text-myColors-primary-text_white">
            <Link href={"/reset-password"} className="font-bold underline">
              Reset Password
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
