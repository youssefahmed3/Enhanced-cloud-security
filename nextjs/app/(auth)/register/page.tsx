import Image from "next/image";
import RegisterForm from "./registerForm";
import registerImage from "@/assets/pngs/register-background.png";
import logoSvg from "@/assets/svgs/logo.svg";
export default function Page() {
  return (
    <main className="">
      <div className="bg-myColors-primary-background flex gap-5 items-center">
        <Image src={registerImage} alt="" className="h-screen aspect-auto" />
        <div className="w-[50%] px-10 py-3">
          <div className="flex flex-col gap-2 items-center">
            <Image src={logoSvg} alt="" className="w-[150px]"/>
            <p className="text-myColors-primary-text_white text-lg font-bold">Register</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
