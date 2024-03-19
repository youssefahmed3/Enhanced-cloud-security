"use client";
import { getUserById } from "@/firebase/firestore/actions/user.actions";
import { UserType } from "@/firebase/firestore/modeltypes/modelTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export  default  function useAuth() {
  const { data: session, status:SessionStatus } = useSession();
  const [user, setUser] = useState<UserType | null>(null)
  const userSession = session?.user;
  // console.log("userID", userID);

  useEffect(()  => {
  const userID = session?.user?.uid;

    async function fetchUser() {
      if (userID) {
        const fetchedUser = await getUserById(userID);
        setUser(fetchedUser);
      }
    }

    fetchUser();

  },[session?.user?.uid])

  return {
    user,
    session,
    SessionStatus,
    isAuthenticated: !!userSession,
  };
}