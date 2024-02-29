"use client"
import { useRouter } from "next/navigation";
import useAuth from "./context/useAuth";

export default function Home() {
  const { isAuthenticated, session } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Enhanced Cloud Security
    </main>
  );
}
  