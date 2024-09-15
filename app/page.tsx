'use client'
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate
} from "framer-motion";
import { useEffect } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import logo from './../assets/bango-logo-zip-file/svg/logo-no-background.svg';
export default function Home() {

  const COLORS = ["#CB6ACA", "#8A67F1", "#F26BB2"]
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 35%, ${color})`
  const buttonColor = useMotionTemplate`radial-gradient(125% 125% at 0% 0%, #020617 0%, ${color})`
  const router = useRouter();

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    })
  }, [])


  return (
    <motion.div
      className="min-h-screen relative dark:bg-slate-950 flex flex-col items-center justify-start p-4"
      style={{
        backgroundImage
      }}
    >
      <div className="header my-8">
        <Image src={logo} alt="bango Logo" height={500} width={500}></Image>
      </div>
      <div className="hero text-center flex flex-col items-center gap-y-4">
        <p className="text-base">Welcome, use Bango and experience streamlined crypto management.</p>
        <motion.button
          style={
            {
              backgroundImage: buttonColor,

            }
          }
          className="w-fit h-auto py-2 px-2 rounded-full flex justify-around items-center hover:animate-pulse text-sm"
          onClick={() => {
            router.push("/wallets")
          }}>
          Get Started
          <ArrowRight strokeWidth={1} size={15} className="ml-1" />
        </motion.button>
      </div>
    </motion.div>
  );
}
