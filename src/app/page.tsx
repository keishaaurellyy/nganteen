"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/button";
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
import {
  Check,
  GraduationCap,
  Loader2Icon,
  MessageCircleQuestion,
  Plus,
  Store,
  Trash2Icon,
  TriangleAlert,
} from "lucide-react";
import { Badge } from "@/components/badge";
import { Header } from "@/components/header";
import KitchenStatus from "@/components/toggle";
import { TextField } from "@/components/text-field";
import { NotebookIcon } from "lucide-react";
import Accordion from "@/components/accordion";
import Searchbar from "@/components/searchbar";
import { FAB } from "@/components/fab";
import MonthDropdown from "@/components/dropdown";
import Tooltip from "@/components/tooltip";
import { Dialog } from "@/components/dialog";

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

  //contoh penggunaan Dialog component
  const [showDialog, setShowDialog] = useState(false);

  const handleOrder = () => {
    // Lakukan proses order
    console.log("");
  };

  //contoh penggunaan dropdown
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const [showInput, setShowInput] = useState(false);

  //contoh penggunaan hooks useRouterReady
  const { router, isRouterReady } = useRouterReady();
  useEffect(() => {
    if (isRouterReady) {
      router.push("/");
    }
  }, [isRouterReady, router]);

  if (!isRouterReady) return null;

  return (
    <div className="max-w-sm min-h-screen justify-self-center">
      {/*  contoh penggunaan Header */}

      {/*  Dengan kedua icon */}
      <Header leftIcon rightIcon="sidebar">
        Order Page
      </Header>

      {/* Tanpa icon kanan */}
      <Header leftIcon rightIcon="none">
        Pilih kitchen
      </Header>

      {/* Tanpa icon kiri */}
      <Header leftIcon={false} variant="logo" rightIcon="sidebar" />

      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> */}
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"> */}
      <main className="p-5 flex flex-col gap-16 items-center sm:items-start">
        {/* contoh penggunaan Tooltip */}
        <Tooltip message="This is a tooltip" position="top" />
        <Tooltip message="This is a tooltip" position="bottom" />
        <Tooltip message="This is a tooltip" position="left" trigger="hover" />
        <Tooltip message="This is a tooltip" position="right" trigger="hover" />

        {/* With long text (will wrap at 300px max width) */}
        <Tooltip
          message="This is a very long tooltip message that will automatically wrap when it reaches the maximum width of 300 pixels while maintaining proper spacing and readability"
          position="top"
        />

        {/* contoh penggunaan Searchbar */}
        <Searchbar />

        {/* contoh penggunaan Dropdown */}
        <MonthDropdown selected={selectedMonth} onSelect={setSelectedMonth} />

        {/* contoh penggunaan Button */}
        <KitchenStatus />

        {/* {showDialog && (
          <Dialog
            color="success"
            icon={<MessageCircleQuestion />}
            title="Order Confirmation"
            description="Are you sure you want to proceed your order? 🤔"
            buttonLabel="Process Order"
            onConfirm={handleOrder}
            onClose={() => setShowDialog(false)}
          />
        )} */}


{showDialog && (
  <Dialog
    color="success"
    icon={<MessageCircleQuestion />}
    title="Order Confirmation"
    description="Are you sure you want to proceed your order? 🤔"
    buttonLabel="Process Order"
    onConfirm={handleOrder}
    onClose={() => setShowDialog(false)}
  />
)}
        <Image
          src="./logo/black-logo.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {/* contoh penggunaan FAB */}
        <div className="w-full">
          <div className="grid grid-cols-4 gap-4 w-full my-4">
            <FAB
              onClick={() => setShowDialog(true)}
              size="medium"
              variant="solid"
              color="warning"
              icon={<Plus />}
            />
            <FAB size="medium" variant="solid" color="error" icon={<Plus />} />
            <FAB
              size="medium"
              variant="solid"
              color="success"
              icon={<Plus />}
            />
          </div>
          <div className="grid grid-cols-4 gap-4 w-full">
            <FAB
              size="medium"
              variant="outline"
              color="warning"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="outline"
              color="error"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="outline"
              color="success"
              icon={<Plus />}
            />
          </div>

          <div className="grid grid-cols-4 gap-4 w-full my-4">
            <FAB
              size="medium"
              variant="solid"
              color="primary"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="solid"
              color="secondary"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="solid"
              color="tertiary"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="solid"
              color="neutral"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="outline"
              color="primary"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="outline"
              color="secondary"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="outline"
              color="tertiary"
              icon={<Plus />}
            />
            <FAB
              size="medium"
              variant="outline"
              color="neutral"
              icon={<Plus />}
            />
          </div>

          <div className="grid grid-cols-4 gap-4 w-full my-4">
            <FAB size="large" variant="solid" color="warning" icon={<Plus />} />
            <FAB size="large" variant="solid" color="error" icon={<Plus />} />
            <FAB size="large" variant="solid" color="success" icon={<Plus />} />
          </div>
          <div className="grid grid-cols-4 gap-4 w-full">
            <FAB
              size="large"
              variant="outline"
              color="warning"
              icon={<Plus />}
            />
            <FAB size="large" variant="outline" color="error" icon={<Plus />} />
            <FAB
              size="large"
              variant="outline"
              color="success"
              icon={<Plus />}
            />
          </div>

          <div className="grid grid-cols-4 gap-4 w-full my-4">
            <FAB size="large" variant="solid" color="primary" icon={<Plus />} />
            <FAB
              size="large"
              variant="solid"
              color="secondary"
              icon={<Plus />}
            />
            <FAB
              size="large"
              variant="solid"
              color="tertiary"
              icon={<Plus />}
            />
            <FAB size="large" variant="solid" color="neutral" icon={<Plus />} />
            <FAB
              size="large"
              variant="outline"
              color="primary"
              icon={<Plus />}
            />
            <FAB
              size="large"
              variant="outline"
              color="secondary"
              icon={<Plus />}
            />
            <FAB
              size="large"
              variant="outline"
              color="tertiary"
              icon={<Plus />}
            />
            <FAB
              size="large"
              variant="outline"
              color="neutral"
              icon={<Plus />}
            />
          </div>
        </div>

        {/* contoh penggunaan Button */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            variant="solid"
            size="small"
            color="primary"
            leftIcon={<Loader2Icon />}
            className="w-fit"
          >
            Small
          </Button>
          <Button
            variant="solid"
            size="small"
            color="warning"
            leftIcon={<TriangleAlert />}
            className="w-fit"
          >
            Warning
          </Button>
          <Button
            variant="solid"
            size="medium"
            color="secondary"
            leftIcon={<Loader2Icon />}
            className="w-fit"
            onClick={() => setShowInput(true)}
          >
            Medium
          </Button>

          {showInput && <TextField placeholder="tes aja" />}
          <Button
            variant="solid"
            size="medium"
            color="error"
            leftIcon={<Trash2Icon />}
            className="w-fit"
          >
            Error
          </Button>
          <Button
            variant="solid"
            size="large"
            color="tertiary"
            leftIcon={<Loader2Icon />}
            className="w-fit"
          >
            Large
          </Button>
          <Button
            variant="solid"
            size="large"
            color="success"
            leftIcon={<Check />}
            className="w-fit"
          >
            Success
          </Button>

          <Button
            variant="solid"
            size="medium"
            color="neutral"
            leftIcon={<GraduationCap />}
            className="w-fit"
          >
            Neutral
          </Button>
          <Button
            variant="outline"
            size="medium"
            color="neutral"
            leftIcon={<Store />}
            className="w-fit"
          >
            Outline
          </Button>

          <Button
            variant="outline"
            size="small"
            color="primary"
            leftIcon={<Loader2Icon />}
            className="w-fit"
          >
            Small
          </Button>
          <Button
            variant="outline"
            size="small"
            color="warning"
            leftIcon={<TriangleAlert />}
            className="w-fit"
          >
            Warning
          </Button>
          <Button
            variant="outline"
            size="medium"
            color="secondary"
            leftIcon={<Loader2Icon />}
            className="w-fit"
          >
            Medium
          </Button>
          <Button
            variant="outline"
            size="medium"
            color="error"
            leftIcon={<Trash2Icon />}
            className="w-fit"
          >
            Error
          </Button>
          <Button
            variant="outline"
            size="large"
            color="tertiary"
            leftIcon={<Loader2Icon />}
            className="w-fit"
          >
            Large
          </Button>
          <Button
            variant="outline"
            size="large"
            color="success"
            leftIcon={<Check />}
            className="w-fit"
          >
            Success
          </Button>
          <Button
            variant="solid"
            size="large"
            color="form"
            className="w-full col-span-2"
          >
            Continue
          </Button>
          <Button
            variant="solid"
            size="large"
            color="form"
            className="w-full col-span-2"
          >
            Register
          </Button>
          <Button
            variant="solid"
            size="large"
            color="form"
            className="w-full col-span-2"
          >
            Login
          </Button>
        </div>

        <div className="space-y-5">
          <Accordion
            label="How to Pay"
            description={
              <ol className="list-decimal list-inside space-y-1 break-words whitespace-normal">
                <li>Screenshot the QR code above.</li>
                <li>Open m-banking / e-wallet apps.</li>
                <li>Pilih pembayaran melalui scan qris.</li>
                <li>Masukan screenshot qr code dengan memilih gambar.</li>
                <li>
                  Input nominal sesuai total harga yang tertera pada halaman
                  payment.
                </li>
                <li>Masukan PIN.</li>
                <li>Pembayaran selesai.</li>
              </ol>
            }
            variant="primary"
          />
          <Accordion
            label="How to Pay"
            description={
              <ol className="list-decimal list-inside space-y-1 break-words whitespace-normal">
                <li>Screenshot the QR code above.</li>
                <li>Open m-banking / e-wallet apps.</li>
                <li>Pilih pembayaran melalui scan qris.</li>
                <li>Masukan screenshot qr code dengan memilih gambar.</li>
                <li>
                  Input nominal sesuai total harga yang tertera pada halaman
                  payment.
                </li>
                <li>Masukan PIN.</li>
                <li>Pembayaran selesai.</li>
              </ol>
            }
            variant="neutral"
          />
        </div>

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
            <div className="text-2xl-bold rounded-sm shadow-md text-primary-500">
              Today&apos;s date is
            </div>
            <div>{todaysDate?.toLocaleDateString()}</div>
          </div>
          {/* contoh penggunaan hooks useTimeout */}
          <div className="font-bold">{timeoutText}</div>

          {/* contoh penggunaan Badge */}
          <Badge>Kitchen</Badge>

          {/* contoh penggunaan Spinner */}
          <div className="flex justify-center items-center min-h-screen">
            <Spinner size="extraLarge" />
          </div>
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

          {/* Contoh penggunaan TextField, kalau mau lebar masukin props multiline aja,
          cmn ini belum bs required nya bingung*/}
          <TextField label="Tag" placeholder="e.g. Dessert" />
          <TextField
            label="Notes"
            placeholder="Input your order notes"
            endAdornment={<NotebookIcon className="w-5 h-5" />}
            withAsterisk
            // readOnly
          />
          <TextField placeholder="First Name" required withAsterisk />
          <TextField
            multiline
            label="Description"
            placeholder="Input description"
          />

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
              <span className="text-red-500 text-sm">
                Format email tidak valid.
              </span>
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
              <span className="text-red-500 text-sm">
                Nomor HP tidak valid.
              </span>
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
              <span className="text-red-500 text-sm">
                Student ID harus 10 digit angka.
              </span>
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
