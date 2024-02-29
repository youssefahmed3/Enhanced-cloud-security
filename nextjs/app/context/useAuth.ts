"use client";
import { useSession } from "next-auth/react";


export default function useAuth() {
  const { data: session, status:SessionStatus } = useSession();
  const user = session?.user;

  return {
    user,
    session,
    SessionStatus,
    isAuthenticated: !!user,
  };
}