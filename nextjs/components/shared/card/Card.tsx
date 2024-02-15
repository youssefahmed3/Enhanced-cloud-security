"use client";
import useAuth from "@/app/context/useAuth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DownloadIcon from "@/assets/svgs/download";

interface Props {
  to: string;
  name?: string;
  type?: string;
  cardImage?: string;
  watermarkedUsed?: string;
  uploadedAt?: string;
  downloadLink?: string;
}

export default function Card(props: Props) {
  const { isAuthenticated, session } = useAuth();
  const router = useRouter();
  return (
    <div
      className="flex justify-evenly items-center gap-5 bg-myColors-accent-blue2 text-myColors-primary-background px-5 py-1 rounded-sm text-bold cursor-pointer"
      onClick={() => router.push(`${props.to}`)}
    >
      <Avatar className="w-[30px] h-[30px]">
        <AvatarImage src={`${session?.user?.image}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {props.name ? <p>{props.name}</p> : null}
      {props.type ? <p>{props.type}</p> : null}
      {props.watermarkedUsed ? <p>{props.watermarkedUsed}</p> : null}
      {props.uploadedAt ? <p>{props.uploadedAt}</p> : null}
      {props.downloadLink ? <Link href={""} className="cursor-pointer"><DownloadIcon color="#001924"/></Link> : null}
    </div>
  );
}
