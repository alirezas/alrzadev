import Image from "next/image";
import { BlinkingText } from "./components/BlinkingText";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col gap-4 font-proto-mono max-w-2xl">
        <h1 className="">Alireza Sarabchi</h1>
        <BlinkingText
          className="font-light"
          text="I am a multidisciplinary designer and front-end developer with over 15 years of experience. During my career, I've worked in various fields of web development, including back-end development, UI/UX, research, management, and business development."
        />
      </div>
    </div>
  );
}
