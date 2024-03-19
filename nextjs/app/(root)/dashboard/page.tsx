"use client";
import useAuth from "@/app/context/useAuth";
import Navbar from "@/components/shared/navbar/navbar";
import { Button } from "@/components/ui/button";
import { addUser } from "@/firebase/firestore/actions/user.actions";
import { addWatermark } from "@/firebase/firestore/actions/watermark.actions";
import RouteView from "./routeView";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Page() {
  const { isAuthenticated, session, SessionStatus } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/login");
  }

  if (SessionStatus === "loading") return <h1>Loading...</h1>;
  

  // eslint-disable-next-line react-hooks/rules-of-hooks
  /* useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []); */
  return (
    <main className="side-container-flex gap-5">
      <Navbar />
      <div className="bg-myColors-primary-text_white w-full h-[200px]"></div>
      <div className="flex justify-between">
        <RouteView routeName="Documents" to="/documents" />
        <RouteView routeName="Watermarks" to="/watermarks" />
      </div>
    </main>
  );
}
