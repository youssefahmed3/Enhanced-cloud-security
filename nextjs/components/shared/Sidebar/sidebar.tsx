"use client";
import React from "react";
import Image from "next/image";
import logoSvg from "@/assets/svgs/logo.svg";
import { Button } from "@/components/ui/button";
import {useSession, signOut} from "next-auth/react";

import { useRouter } from "next/navigation";

function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    session ? <div className="flex flex-col items-center justify-between bg-myColors-primary-blue py-5 px-4 rounded-tr-xl rounded-br-xl">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
          <Image src={logoSvg} alt="" className="w-[50px]" />
          <p className="font-bold text-myColors-primary-text_white text-sm">
          Enhanced Cloud Security
          </p>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Button className="button-style" onClick={() => router.push("/dashboard")}>Dashboard</Button>
        <Button className="button-style" onClick={() => router.push("/documents")}>Documents</Button>
        <Button className="button-style" onClick={() => router.push("watermarks")}>Watermarks</Button>
        <Button className="button-style" onClick={() => router.push("/help")}>Need Help!</Button>
      </div>
    </div>


    <div className="flex flex-col w-full gap-2">
      <Button className="button-style">Drag or Drop</Button>
      <Button className="button-style" onClick={() => router.push("/settings")}>Settings</Button>
      <Button className="button-style" onClick={()=>signOut()}>Logout</Button>
    </div>
  </div> : null
  );
}

export default Sidebar;
