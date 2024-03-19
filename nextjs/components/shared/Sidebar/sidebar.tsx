"use client";
import React from "react";
import Image from "next/image";
import logoSvg from "@/assets/svgs/logo.svg";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import File_Dock_Fill from "@/assets/svgs/file_dock_fill";

function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isMatchingRoute = (route: string) => {
    const routeWithoutParam = route.split("/:")[0];
    return pathname.startsWith(routeWithoutParam);
  };

  return session ? (
    <div className="side-bar-style">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <Image src={logoSvg} alt="" className="w-[50px]" />
          <p className="font-bold text-myColors-primary-text_white text-sm">
            Enhanced Cloud Security
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Button
            className={`button-style ${
              isMatchingRoute("/dashboard") ? "active" : ""
            }`}
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            className={`button-style ${
              isMatchingRoute("/documents") ? "active" : ""
            }`}
            onClick={() => router.push("/documents")}
          >
            Documents
          </Button>
          <Button
            className={`button-style ${
              isMatchingRoute("/watermarks/:id") ? "active" : ""
            }`}
            onClick={() => router.push("/watermarks")}
          >
            Watermarks
          </Button>
          <Button
            className={`button-style ${pathname === "/help" ? "active" : ""}`}
            onClick={() => router.push("/help")}
          >
            Need Help!
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Button
          className={`button-style ${pathname === "/upload" ? "active" : ""}`}
          onClick={() => router.push("/upload")}
        >
          Upload
        </Button>
        <Button
          className={`button-style ${pathname === "/settings" ? "active" : ""}`}
          onClick={() => router.push("/settings")}
        >
          Settings
        </Button>
        <Button className="button-style" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </div>
  ) : null;
}

export default Sidebar;
