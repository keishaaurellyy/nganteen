"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Store } from "lucide-react";
import { Button } from "@/components/input/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-primary-300 px-5 pt-[44px] pb-10 flex flex-col items-center">
      {/* Logo */}
      <div className="w-full flex justify-center mb-8">
        <Image
          src="/logo/white-logo.svg"
          alt="Nganteen Logo"
          width={48}
          height={36}
          priority
        />
      </div>

      {/* Headline */}
      <div className="w-full max-w-[343px] text-left mb-4">
        <h1 className="text-4xl font-bold leading-tight text-black">
          Ngantin, <br />
          but make it <br />
          <span className="text-tertiary-600">easy</span> with <br />
          Nganteen.
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-base text-neutral-900/80 max-w-[343px] mb-6">
        Skip the wait — just quick bites with Nganteen!
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mb-8 justify-start w-full max-w-[343px]">
        <Link href="/buyers/login">
          <Button
            variant="solid"
            size="medium"
            color="neutral"
            leftIcon={<GraduationCap />}
            className="w-fit"
          >
            Customer
          </Button>
        </Link>
        <Link href="/kitchens/login">
          <Button
            variant="outline"
            size="medium"
            color="neutral"
            leftIcon={<Store />}
            className="w-fit"
          >
            Kitchen
          </Button>
        </Link>
      </div>

      {/* Image preview */}
      <div className="w-full max-w-[343px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/images/mockup.svg"
          alt="App Preview"
          width={343}
          height={343}
          layout="responsive"
        />
      </div>
    </main>
  );
}
