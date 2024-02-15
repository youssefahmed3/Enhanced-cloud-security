"use client";
import { useSession } from "next-auth/react";


export default function useAuth() {
  const { data: session } = useSession();
  const user = session?.user;

  return {
    user,
    session,
    isAuthenticated: !!user,
  };
}