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
import { db } from "@/firebase/config";
import { useState, useEffect } from "react";
import {
  addDoc,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { WatermarkType } from "@/firebase/firestore/modeltypes/modelTypes";

import { ScrollArea } from "@/components/ui/scroll-area";
export default function Page() {
  const { isAuthenticated, session, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/login");
  }

  const [watermarks, setWatermarks] = useState<WatermarkType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const watermarksCollection = collection(
          db,
          "users",
          user?.id as string,
          "watermarks"
        );
        const watermarksSnapshot = await getDocs(watermarksCollection);
        const watermarksData = watermarksSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as any)
        );
        setWatermarks(watermarksData);
        // console.log(watermarksData);
      }
    };

    fetchData();
  }, [user]);

  return (
    <main className="side-container-flex gap-5">
      <Navbar />

      <div className="flex flex-col gap-4 bg-myColors-primary-blue rounded-sm px-3 py-2">
        <div className="flex w-[100%] justify-between items-center">
          <p className="text-2xl font-bold">All Watermark</p>
          <Button className="button-style">Filter</Button>
        </div>

        <ScrollArea className="h-[550px] rounded-md border p-4">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <File_Dock_Fill color="#EBF9FF" />
                </TableHead>
                <TableHead className="text-myColors-primary-text_white">
                  Watermark Name
                </TableHead>
                <TableHead className="text-myColors-primary-text_white">
                  Type
                </TableHead>
                <TableHead className="text-myColors-primary-text_white">
                  Uploaded At.
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watermarks.map((watermark) => (
                <TableRow key={watermark.id}>
                  <TableCell className="w-[100px]">
                    <Avatar>
                      <AvatarImage src={watermark.watermarkUrl} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <p>{watermark.name}</p>
                  </TableCell>
                  <TableCell>
                    <p>Image</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {new Date(
                        watermark.createdAt.toDate()
                      ).toLocaleDateString()}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </main>
  );
}
