"use client";
import useAuth from "@/app/context/useAuth";
import Navbar from "@/components/shared/navbar/navbar";
import { Button } from "@/components/ui/button";
import { addUser } from "@/firebase/firestore/actions/user.actions";
import { addWatermark } from "@/firebase/firestore/actions/watermark.actions";
import RouteView from "./routeView";

export default function Page() {
  const { isAuthenticated, session } = useAuth();
  
  return (
    <main className="side-container-flex gap-5">
      <Navbar />

      <div className="flex justify-between">
        <RouteView routeName="Documents" to="/documents"/>
        <RouteView routeName="Watermarks" to="/watermarks"/>
      </div>
    </main>
  );
}
