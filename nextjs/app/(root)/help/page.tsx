"use client";
import useAuth from "@/app/context/useAuth";
import Navbar from "@/components/shared/navbar/navbar";
import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
  const { isAuthenticated, session, SessionStatus } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/login");
  }

  if (SessionStatus === "loading") return <h1>Loading...</h1>;

  return (
    <main className="side-container-flex gap-5">
      <Navbar />
      <div className="bg-myColors-primary-text_white w-full h-[400px]"></div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="">
          <AccordionTrigger>FAQ#1</AccordionTrigger>
          <AccordionContent>
            Content of FAQ#1
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>FAQ#1</AccordionTrigger>
          <AccordionContent>
            Content of FAQ#1
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
