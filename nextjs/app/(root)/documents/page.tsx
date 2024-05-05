"use client";
import useAuth from "@/app/context/useAuth";
import File_Dock_Fill from "@/assets/svgs/file_dock_fill";
import Card from "@/components/shared/card/Card";
import Navbar from "@/components/shared/navbar/navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import {
  addDoc,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
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

import { ScrollArea } from "@/components/ui/scroll-area"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import DownloadIcon from "@/assets/svgs/download";
import { WatermarkedImageType } from "@/firebase/firestore/modeltypes/modelTypes";

export default function Page() {
  const { isAuthenticated, session, user } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/login");
  }

  const [watermarkedImages, setWatermarkedImages] = useState<
    WatermarkedImageType[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const watermarkedimageCollection = collection(
          db,
          "users",
          user?.id as string,
          "watermarkedImages"
        );
        const watermarkedImagesSnapshot = await getDocs(
          watermarkedimageCollection
        );
        const watermarkedImagesData = watermarkedImagesSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as any)
        );
        setWatermarkedImages(watermarkedImagesData);
        console.log(watermarkedImagesData);
      }
    };

    fetchData();
  }, [user]);
  return (
    <main className="side-container-flex gap-5">
      <Navbar />

      <div className="flex flex-col gap-4 bg-myColors-primary-blue rounded-sm px-3 py-2">
        <div className="flex w-[100%] justify-between items-center">
          <p className="text-2xl font-bold">All Watermarked Documents</p>
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
                Documents Name
              </TableHead>
              <TableHead className="text-myColors-primary-text_white">
                Type
              </TableHead>
              <TableHead className="text-myColors-primary-text_white">
                Watermarked Used
              </TableHead>
              <TableHead className="text-myColors-primary-text_white">
                Uploaded At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watermarkedImages.map((watermarkedImage) => (
              <TableRow key={watermarkedImage.id} onClick={() => router.push(`/documents/${watermarkedImage.id}`)}>
                <TableCell className="w-[100px]">
                  <Avatar>
                    <AvatarImage src={watermarkedImage.watermarkedUrl} />
                  </Avatar>
                </TableCell>

                <TableCell className="text-myColors-primary-text_white">
                  {watermarkedImage.name}
                </TableCell>
                <TableCell>
                  <p className="text-myColors-primary-text_white">{"Image"}</p>
                </TableCell>

                <TableCell className="text-myColors-primary-text_white">
                  <Avatar>
                    <AvatarImage src={watermarkedImage.watermarkUrl} />
                  </Avatar>
                </TableCell>

                <TableCell className="text-myColors-primary-text_white">
                  <p>
                    {new Date(
                      watermarkedImage?.createdAt?.toDate()
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
