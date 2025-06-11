"use client";

import Link from "next/link";
import { Button } from "@/components/input/button";
import { Header } from "@/components/input/header";
import Accordion from "@/components/input/accordion";

export default function HelpPage() {
  return (
    <div className="min-h-screen justify-self-center">
      {/* Header */}
      <Header
        leftIcon
        onLeftIconClick={() => window.history.back()}
        rightIcon="none"
      >
        Help
      </Header>

      <main className=" w-full bg-white px-[20px] pb-10 flex flex-col items-center">
        {/* Contact Us Banner */}
        <div className="w-full  bg-primary-500 rounded-lg p-4 flex justify-between items-center mt-4 mb-8">
          <div>
            <p className="font-base font-bold text-neutral-900">
              Something’s not right?
            </p>
            <p className="text-xs font-normal text-neutral-900">
              No worries! Just drop us an email.
            </p>
          </div>
          <Link href="mailto:nganteen.binus@gmail.com">
            <Button
              variant="solid"
              size="small"
              color="neutral"
              className="w-fit"
            >
              Contact Us
            </Button>
          </Link>
        </div>

        {/* FAQ */}
        <div className="w-full">
          <h2 className="flex justify-center text-lg-bold mb-4">
            Frequently Asked Question
          </h2>

          <div className="space-y-5">
            <Accordion
              label="How do I place an order?"
              description={
                <div className="space-y-3">
                  <p>
                    Click <b>Sidebar Menu &gt; Explore Kitchen</b>, then choose
                    any available kitchen.
                  </p>
                  <p>
                    You can also tap the <b>Find Your Food</b> card or scroll
                    sideways through the <b>All The Kitchen</b> section on Home
                    page.
                  </p>
                  <p>
                    Select your desired items, tap the <b>cart button</b> below,
                    then click the <b>Order button</b> on the preview order
                    page.
                  </p>
                  <p>
                    A confirmation pop-up will appear — tap <b>Process Order</b>{" "}
                    &nbsp; to proceed with <b>QRIS payment</b>. Once completed,
                    your order will be successfully placed.
                  </p>
                </div>
              }
              variant="primary"
            />

            <Accordion
              label="How can I check my order status?"
              description={
                <p>
                  You can check your order status at the &nbsp;
                  <b>bottom of the Home page</b>. Tap on it to view &nbsp;
                  <b>order details</b>.
                </p>
              }
              variant="primary"
            />

            <Accordion
              label="Can I cancel my order after payment?"
              description={
                <p>
                  No, once your order is paid, it <b>can’t be canceled</b> by
                  you. However, the <b>kitchen</b> may cancel it if there’s an
                  issue — for example, <b>out-of-stock items</b>.
                </p>
              }
              variant="primary"
            />

            <Accordion
              label="Where do I pick up my food?"
              description={
                <p>
                  Once the food is ready, you can pick it up &nbsp;
                  <b>at the canteen</b>. To find the kitchen’s location, check
                  their <b>unit number</b> in the <b>order details</b> page.
                </p>
              }
              variant="primary"
            />

            <Accordion
              label="How do I update my profile info?"
              description={
                <p>
                  Go to your <b>Sidebar Menu &gt; Your Name</b> to access your
                  Profile page. Tap the <b>pencil icon</b> to edit your account
                  information.
                </p>
              }
              variant="primary"
            />

            <Accordion
              label="Can I add custom notes to my order?"
              description={
                <div className="space-y-3">
                  <p>
                    Yes. On the <b>Preview Order</b> page, type your request in
                    the <b>Order Notes</b> section.
                  </p>
                  <p>
                    Make sure to <b>double-check your notes</b> before
                    confirming — once submitted, <b>notes can’t be edited</b>.
                  </p>
                </div>
              }
              variant="primary"
            />

            <Accordion
              label="How do I get a refund if my order is canceled?"
              description={
                <div className="space-y-3">
                  <p>
                    If your order is <b>canceled by the kitchen</b>, a &nbsp;
                    <b>refund form</b> will appear on your screen automatically.
                  </p>
                  <p>
                    Fill in your <b>bank or e-wallet details</b>. Refunds will
                    be processed within <b>24 hours</b> after submission.
                  </p>
                </div>
              }
              variant="primary"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
