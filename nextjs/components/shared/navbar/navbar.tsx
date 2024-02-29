import React from 'react'
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/app/context/useAuth";

export default function Navbar() {
    const { isAuthenticated, session } = useAuth();
  return (
    <>
        <div className=" col-span-2 flex items-center justify-between">
        <Input
          placeholder="Search..."
          className="input-field-style w-[60%]"
          type="text"
        />

        {isAuthenticated && (
          <div className="flex justify-between items-center gap-2  bg-myColors-accent-blue2 text-myColors-primary-background p-2 rounded-md">
            <Avatar className="w-[30px] h-[30px]">
              <AvatarImage src={`${session?.user?.image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {session?.user?.email}
          </div>
        )}
      </div>
    </>
  )
}
