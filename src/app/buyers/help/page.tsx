"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/input/button";
import { Header } from "@/components/input/header";
import Accordion from "@/components/input/accordion";

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const faqs = [
    {
      label: "How do I place an order?",
      description: (
        <>
          <p>
            Click <b>Sidebar Menu &gt; Explore Kitchen</b>, then choose any available kitchen.
          </p>
          <p>
            You can also tap the <b>Find Your Food</b> card or scroll sideways through the{" "}
            <b>All The Kitchen</b> section on Home page.
          </p>
          <p>
            Select your desired items, tap the <b>cart button</b> below, then click the{" "}
            <b>Order button</b> on the preview order page.
          </p>
          <p>
            A confirmation pop-up will appear — tap <b>Process Order</b> to proceed with{" "}
            <b>QRIS payment</b>. Once completed, your order will be successfully placed.
          </p>
        </>
      ),
    },
    {
      label: "How can I check my order status?",
      description: (
        <p>
          You can check your order status at the <b>bottom of the Home page</b>. Tap on it to view{" "}
          <b>order details</b>.
        </p>
      ),
    },
    {
      label: "Can I cancel my order after payment?",
      description: (
        <p>
          No, once your order is paid, it <b>can’t be canceled</b> by you. However, the{" "}
          <b>kitchen</b> may cancel it if there’s an issue — for example, <b>out-of-stock items</b>.
        </p>
      ),
    },
    {
      label: "Where do I pick up my food?",
      description: (
        <p>
          Once the food is ready, you can pick it up <b>at the canteen</b>. To find the kitchen’s
          location, check their <b>unit number</b> in the <b>order details</b> page.
        </p>
      ),
    },
    {
      label: "How do I update my profile info?",
      description: (
        <p>
          Go to your <b>Sidebar Menu &gt; Your Name</b> to access your Profile page. Tap the{" "}
          <b>pencil icon</b> to edit your account information.
        </p>
      ),
    },
    {
      label: "Can I add custom notes to my order?",
      description: (
        <>
          <p>
            Yes. On the <b>Preview Order</b> page, type your request in the <b>Order Notes</b>{" "}
            section.
          </p>
          <p>
            Make sure to <b>double-check your notes</b> before confirming — once submitted,{" "}
            <b>notes can’t be edited</b>.
          </p>
        </>
      ),
    },
    {
      label: "How do I get a refund if my order is canceled?",
      description: (
        <>
          <p>
            If your order is <b>canceled by the kitchen</b>, a <b>refund form</b> will appear on
            your screen automatically.
          </p>
          <p>
            Fill in your <b>bank or e-wallet details</b>. Refunds will be processed within{" "}
            <b>24 hours</b> after submission.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      <Header leftIcon rightIcon="sidebar">Help</Header>

      <main className="bg-neutral-100 px-5 pb-10 flex flex-col items-center">
        <div className="w-full bg-primary-500 text-neutral-900 rounded-lg p-4 flex justify-between items-center mt-4 mb-8">
          <div>
            <p className="font-base font-bold">Something’s not right?</p>
            <p className="text-xs font-normal">No worries! Just drop us an email.</p>
          </div>
          <Link href="mailto:nganteen.binus@gmail.com">
            <Button variant="solid" size="small" color="neutral" className="w-fit">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="w-full">
          <h2 className="flex justify-center text-lg-bold mb-4">
            Frequently Asked Question
          </h2>
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                label={faq.label}
                description={faq.description}
                variant="primary"
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