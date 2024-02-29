"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/navbar/navbar";
import { uploadImage } from "@/firebase/storage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
function Page() {
  const [selectedBaseFileView, setSelectedBaseFileView] = useState(null);
  const [selectedWatermarkFileView, setSelectedWatermarkFileView] = useState(null);
  const [baseFile, setBaseFile] = useState(null);
  const [watermarkFile, setWatermarkFile] = useState(null);

  const [baseFileName, setBaseFileName] = useState("None");
  const [watermarkFileName, setWatermarkFileName] = useState("None");

  const FormSchema = z.object({
    base_file: z.unknown().refine(file => {
      // Check if a file is selected
      if (!(file instanceof File)) {
        return false;
      }
  
      // Check the file type
      const fileType = file.type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        return false;
      }
  
      // Check the file size (max 5MB)
      const fileSize = file.size;
      const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
      if (fileSize > maxFileSize) {
        return false;
      }
  
      return true;
    }, {
      message: 'Invalid file. Only GIF, JPEG, and PNG types are allowed and size must be less than 5MB.',
    }),
    watermark_file: z.unknown().refine(file => {
      // Check if a file is selected
      if (!(file instanceof File)) {
        return false;
      }
  
      // Check the file type
      const fileType = file.type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        return false;
      }
  
      // Check the file size (max 5MB)
      const fileSize = file.size;
      const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
      if (fileSize > maxFileSize) {
        return false;
      }
  
      return true;
    }, {
      message: 'Invalid file. Only GIF, JPEG, and PNG types are allowed and size must be less than 5MB.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      base_file: "",
      watermark_file: "",
    },
  });

  const handleFileBaseChange = (e?: any) => {
    const file = e.target.files[0];
    setBaseFile(file);
    if (file) {
      setBaseFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedBaseFileView(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileWatermarkChange = (e?: any) => {
    const file = e.target.files[0];
    setWatermarkFile(file);
    if (file) {
      setWatermarkFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedWatermarkFileView(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const base_image = await uploadImage(baseFile, baseFileName);
    const watermark_image = await uploadImage(watermarkFile, watermarkFileName);
    console.log(base_image, watermark_image);
  }

  return (
    <div className="side-container-flex gap-5">
      <Navbar />
      <div className="flex flex-col gap-4 bg-myColors-primary-blue rounded-sm px-3 py-2 w-full">
        <div className="flex w-[100%] justify-between items-center">
          <p className="text-2xl font-bold">Upload Your Files</p>
          <Button className="button-style" onClick={handleSubmit}>
            Submit
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex gap-5 items-center justify-around"
          >
            <FormField
              control={form.control}
              name="base_file"
              render={({ field }) => (
                <FormItem className="flex gap-2 flex-col">
                  <FormControl>
                    <div className="flex flex-col gap-5 ">
                      {selectedBaseFileView ? (
                        <Image
                          src={selectedBaseFileView}
                          alt="Preview"
                          layout="fixed"
                          className="rounded-md"
                          width={300}
                          height={300}
                        />
                      ) : (
                        <div className="w-[300px] h-[300px] bg-white rounded-sm text-center text-black font-bold capitalize flex items-center justify-center">
                          upload image
                        </div>
                      )}

                      <Input
                        id="base-image"
                        type="file"
                        className="hidden"
                        onChange={handleFileBaseChange}
                      />
                    </div>
                  </FormControl>
                  <FormLabel htmlFor="base-image" className="button-style p-2 rounded-md text-white cursor-pointer text-center">
                    <span className="font-bold">Choose Base File</span> |{" "}
                    {baseFileName}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="watermark_file"
              render={({ field }) => (
                <FormItem className="flex gap-2 flex-col">
                  <FormControl>
                    <div className="flex flex-col gap-5 ">
                      {selectedWatermarkFileView ? (
                        <Image
                          src={selectedWatermarkFileView}
                          alt="Preview"
                          layout="fixed"
                          className="rounded-md"
                          width={300}
                          height={300}
                        />
                      ) : (
                        <div className="w-[300px] h-[300px] bg-white rounded-sm text-center text-black font-bold capitalize flex items-center justify-center">
                          upload image
                        </div>
                      )}

                      <Input
                        id="watermark-image"
                        type="file"
                        className="hidden"
                        onChange={handleFileWatermarkChange}
                      />
                    </div>
                  </FormControl>
                  <FormLabel htmlFor="watermark-image" className="button-style p-2 rounded-md text-white cursor-pointer text-center">
                    <span className="font-bold">Choose Watermark File</span> |{" "}
                    {watermarkFileName}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;