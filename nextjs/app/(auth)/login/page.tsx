import Image from "next/image";
import loginImage from "@/assets/pngs/login-background.png";
import logoSvg from "@/assets/svgs/logo.svg";
import LoginForm from "./signinForm";
export default function Page() {
  return (
    <main className="">
      <div className="bg-myColors-primary-background flex gap-5 items-center">
        <Image src={loginImage} alt="" className="h-screen aspect-auto" />
        <div className="w-[50%] px-10 py-3">
          <div className="flex flex-col gap-2 items-center">
            <Image src={logoSvg} alt="" className="w-[150px]"/>
            <p className="text-myColors-primary-text_white text-lg font-bold">Login</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
