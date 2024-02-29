"use client";
import useAuth from "@/app/context/useAuth";
import File_Dock_Fill from "@/assets/svgs/file_dock_fill";
import Card from "@/components/shared/card/Card";
import Navbar from "@/components/shared/navbar/navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import DownloadIcon from "@/assets/svgs/download";

export default function Page() {
  const { isAuthenticated, session } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/login");
  }
  return (
    <main className="side-container-flex gap-5">
      <Navbar />

      <div className="flex flex-col gap-4 bg-myColors-primary-blue rounded-sm px-3 py-2">
        <div className="flex w-[100%] justify-between items-center">
          <p className="text-2xl font-bold">All Watermark</p>
          <Button className="button-style">Filter</Button>
        </div>

        <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <File_Dock_Fill color="#EBF9FF" />
            </TableHead>
            <TableHead className="text-myColors-primary-text_white">
              Watermark Name
            </TableHead>
            <TableHead className="text-myColors-primary-text_white">Type</TableHead>
            <TableHead className="text-myColors-primary-text_white">Uploaded At.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            className="cursor-pointer"
            onClick={() => router.push('/documents/1')}
          >
            <TableCell>
              <Avatar className="w-[30px] h-[30px]">
                <AvatarImage src={`${session?.user?.image}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>lena</TableCell>
            <TableCell>png</TableCell>
            <TableCell>Mon 12:00pm</TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
      </div>
    </main>
  );
}
