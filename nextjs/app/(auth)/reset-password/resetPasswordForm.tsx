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
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import useAuth from "@/app/context/useAuth";
import { toast } from "sonner";

function ResetPasswordForm() {
  const { isAuthenticated, session } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.replace("/dashboard");
  }

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    await sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toast.success("Password reset email sent successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
              <FormLabel className="text-white">Email</FormLabel>
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

        <Button
          variant={"default"}
          className="button-style w-full"
          type="submit"
        >
          Reset With Email
        </Button>
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
