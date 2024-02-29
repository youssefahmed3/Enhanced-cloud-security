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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { addUser } from "@/firebase/firestore/actions/user.actions";
import useAuth from "@/app/context/useAuth";

function RegisterForm() {
  const { isAuthenticated, session } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.replace("/dashboard");
  }

  const FormSchema = z
    .object({
      firstname: z.string().min(5, {
        message: "first name must be at least 5 characters.",
      }),
      lastname: z.string().min(5, {
        message: "last name must be at least 5 characters.",
      }),
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
      password: z
        .string()
        .min(8, { message: "password must be at least 8 characters." }),
      confirmPassword: z
        .string()
        .min(8, { message: "password must be at least 8 characters." }),
      username: z.string().min(5, { message: "username must be at least 5 characters." }),
      })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "passwords must match",
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    form.clearErrors();
    createUserWithEmailAndPassword(auth, values.email, values.password)
    await addUser({firstname: values.firstname, lastname: values.lastname, email: values.email, username: values.username})
    router.push("/login");
  }

  //   const inputStyle:string = "w-full bg-white";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-myColors-primary-text_white">
                  First name
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Enter Your Unique name ..."
                      className="input-field-style w-[300px]"
                      {...field}
                    />
                  </>
                </FormControl>
                {/* {form.formState.errors.username && <FormMessage />} */}
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-myColors-primary-text_white">
                  Last name
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Enter Your Unique name ..."
                      className="input-field-style w-[300px]"
                      {...field}
                    />
                  </>
                </FormControl>
                <FormMessage/>

                {/* {form.formState.errors.username && <FormMessage />} */}
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-myColors-primary-text_white">
                username
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Enter your email ..."
                    className="input-field-style"
                    type="name"
                    {...field}
                  />
                </>
              </FormControl>
              {/* {form.formState.errors.email && <FormMessage />} */}
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-myColors-primary-text_white">
                Email
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Enter your email ..."
                    className="input-field-style"
                    type="email"
                    {...field}
                  />
                </>
              </FormControl>
              {form.formState.errors.email && <FormMessage />}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-myColors-primary-text_white">
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-myColors-primary-text_white">
                Password Confirmation
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter again your very Secure password ..."
                  className="input-field-style"
                  type="password"
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
          Register
        </Button>

        <hr />
        

        <p className="text-myColors-primary-text_white">
            Already signed in ? <Link href={'/login'} className="font-bold underline">Login</Link>
        </p>
      </form>
    </Form>
  );
}

export default RegisterForm;
