"use client";

import useCopyToClipboard from "@/hooks/components/useCopyToClipboard";
import useCurrentDate from "@/hooks/data-fetch/useCurrentDate";
import useFormattedDate from "@/hooks/format/useFormattedDate";
import useRouterReady from "@/hooks/misc/useRouterReady";
import useTimeout from "@/hooks/misc/useTimeout";
import Image from "next/image";
import { useEffect, useState } from "react";

// import utils
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidStudentId,
} from "@/utils/validation.utils";

export default function Home() {

  // contoh penggunaan hooks useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [studentId, setStudentId] = useState("");

  // contoh penggunaan hooks useCopyToClipboard
  const { copy, icon } = useCopyToClipboard({ iconSize: "small" });
  const text = "Get Started by Editing";

  // contoh penggunaan hooks useFormattedDate
  const order_date = useFormattedDate({
    date: "2025-04-19 10:00:00",
    format: "EEEE, d MMMM yyyy",
  });

  //belum bs provide contoh penggunaan useDebounce krn belum ada input field
  //belum bs provide contoh penggunaan useAppendSearchParams krn belum ada componentnya

  //contoh penggunaan hooks useCurrentDate
  const todaysDate = useCurrentDate();

  //contoh penggunaan hooks useTimeout, gak berlaku untuk text doang
  const [timeoutText, setTimeoutText] = useState("Loading...");
  useTimeout(() => {
    setTimeoutText("Done!");
  }, 5000);

  //contoh penggunaan hooks useRouterReady
  const { router, isRouterReady } = useRouterReady();
  useEffect(() => {
    if (isRouterReady) {
      router.push("/");
    }
  }, [isRouterReady, router]);

  if (!isRouterReady) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="./logo/black-logo.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            {/* contoh penggunaan hooks useCopyToClipboard */}
            {text}
            <button onClick={() => copy(text)}>{icon}</button>
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          {/* contoh penggunaan hooks useFormattedDate */}
          <div className="flex flex-row items-center gap-2">
            <div>Formatted date:</div>
            <div>{order_date}</div>
          </div>
          {/* contoh penggunaan hooks useCurrentDate */}
          <div className="flex flex-row items-center gap-2">
            <div className="text-2xl-bold rounded-sm shadow-md text-tertiary-600">Today&apos;s date is</div>
            <div>{todaysDate?.toLocaleDateString()}</div>
          </div>
          {/* contoh penggunaan hooks useTimeout */}
          <div className="font-bold">{timeoutText}</div>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        {/* --- VALIDASI TEST FORM --- */}
        <div className="w-full max-w-sm space-y-4 mt-8 border-t pt-6">
          <div className="text-lg font-bold">Cek Validasi</div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Email:</label>
            <input
              className="border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            {!isValidEmail(email) && email.length > 0 && (
              <span className="text-red-500 text-sm">Format email tidak valid.</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Password:</label>
            <input
              className="border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            {!isValidPassword(password) && password.length > 0 && (
              <span className="text-red-500 text-sm">
                Minimal 8 karakter, mengandung huruf & angka.
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">No. HP:</label>
            <input
              className="border px-3 py-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {!isValidPhoneNumber(phone) && phone.length > 0 && (
              <span className="text-red-500 text-sm">Nomor HP tidak valid.</span>
            )}
          </div>

          {/* Student ID */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Student ID (10 digit):</label>
            <input
              className="border px-3 py-2 rounded"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            {!isValidStudentId(studentId) && studentId.length > 0 && (
              <span className="text-red-500 text-sm">Student ID harus 10 digit angka.</span>
            )}
          </div>
        </div>
      </main>


      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
