import React from "react";
import { SizeUp } from "@/assets/svgs/size_up";
import File_Dock_Fill from "@/assets/svgs/file_dock_fill";
import { useRouter } from "next/navigation";
import Card from "@/components/shared/card/Card";
interface Props {
  routeName: string;
  to: string;
}

export default function RouteView(props: Props) {
    const router = useRouter();
  return (
    <div className="flex flex-col bg-myColors-primary-blue px-5 py-3 rounded-sm gap-3">
      <div className="flex items-center justify-between font-bold">
        {props.routeName}
        <div className="cursor-pointer" onClick={() => router.push(`${props.to}`)}>
          <SizeUp color={"#EBF9FF"} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 px-2">
        <File_Dock_Fill color="#EBF9FF" />
        <p>{props.routeName === "Documents" ? "Document" : "Watermark"} Name</p>
        <p>Uploaded At</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <Card name={"document name"} uploadedAt={"Mon 12:00PM"} to="/documents/1" />
        <Card to="#" />
      </div>
    </div>
  );
}
