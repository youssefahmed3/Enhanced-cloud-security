"use client";
import File_Dock_Fill from "@/assets/svgs/file_dock_fill";
import Card from "@/components/shared/card/Card";
import Navbar from "@/components/shared/navbar/navbar";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="side-container-flex gap-5">
      <Navbar />

      <div className="flex flex-col gap-4 bg-myColors-primary-blue rounded-sm px-3 py-2">
        <div className="flex w-[100%] justify-between items-center">
          <p className="text-2xl font-bold">All Documents</p>
          <Button className="button-style">Filter</Button>
        </div>

        <div className="flex justify-evenly items-center">
          <File_Dock_Fill color="#EBF9FF" />
          <p>Document Name</p>
          <p>Type</p>
          <p>Watermark used</p>
          <p>Uploaded At</p>
        </div>

        <div className="flex flex-col gap-3">
          <Card to="#" cardImage="" name="SeaImage" type="Img" watermarkedUsed="Lena" uploadedAt="Mon 12:00PM" downloadLink="#"  />
        </div>
      </div>
    </main>
  );
}
