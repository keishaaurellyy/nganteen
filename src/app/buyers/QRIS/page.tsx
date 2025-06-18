"use client";

import AlertBox from "@/components/input/alert-box";
import Image from "next/image";
import { useState } from "react";
import Accordion from "@/components/input/accordion";
import { Copy } from "lucide-react";

export default function QRISPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      label: "How to Pay?",
      description: (
        <ol className="list-decimal list-inside space-y-1">
          <li>Take a screenshot of the QR code above.</li>
          <li>Open your mobile banking or e-wallet app.</li>
          <li>Choose the QRIS scan payment option.</li>
          <li>
            Upload the screenshot of the QR code by selecting the image from
            your gallery.
          </li>
          <li>Enter the exact amount shown on the payment page.</li>
          <li>Enter your PIN to confirm.</li>
          <li>Payment completed.</li>
        </ol>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full max-w-md justify-self-center">
      

      <main className="bg-neutral-100 px-5 pt-5 pb-10 flex flex-col items-center">
        <div className="mt-4 bg-neutral-100 flex flex-col space-y-5">
          <AlertBox
            title="Wait for kitchen to process after payment!"
            description={
              <>
                Please do not double pay for the same order. This page will be
                directed to order detail page once the kitchen has processed
                your order.
              </>
            }
          />

          {/* Title */}
          <h2 className="text-2xl font-bold text-center">
            Scan QRIS to Pay
          </h2>

          {/* QR Code */}
          <div className="flex justify-center">
            <Image
              src="/images/qris.jpg"
              alt="QRIS"
              width={240}
              height={240}
            />
          </div>

          {/* Total Payment */}
          <div className="bg-primary-100 rounded-md px-4 py-3 text-center">
            <p className="text-sm font-semibold">Total Payment</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-2xl font-bold text-secondary-500">Rp 26.000</p>
              <Copy
                className="w-4 h-4 text-gray-600 cursor-pointer"
                onClick={() => navigator.clipboard.writeText("50011")}
              />
            </div>
          </div>

          {/* Accordion: How to Pay */}
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                label={faq.label}
                description={faq.description}
                variant="neutral"
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
