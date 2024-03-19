"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/app/context/useAuth";
import { signIn } from "next-auth/react";

interface Props {
  img: any;
  provider: string;
}

function SocialButton(props: Props) {
    const { session } = useAuth();
  return (
    <div>
      <Avatar className="cursor-pointer" onClick={() => {signIn("google")}}>
        <AvatarImage src={props.img} />
        <AvatarFallback className="text-black text-sm">{props.provider}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default SocialButton;
