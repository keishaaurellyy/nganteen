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
              label="How do I organize my menu?"
              description={
                <p>
                  Go to <b>Home &gt; Set your MENU</b>, click the &nbsp;
                  <b>pencil icon</b>. You can <b>add or edit</b> &nbsp; items by
                  changing the name, description, price, and stock.
                </p>
              }
              variant="primary"
            />

            <Accordion
              label="How do I update my kitchen info?"
              description={
                <div className="space-y-3">
                  <p>
                    Go to <b>Home &gt; Set up MENU</b>, then click the &nbsp;
                    <b>pencil icon</b>. You can update your &nbsp;
                    <b>kitchen status (open/closed)</b>, set &nbsp;
                    <b>operational hours</b>, and adjust your <b>price range</b>
                    .
                  </p>
                  <p>
                    If you need to change the kitchen name or kitchen address,
                    please <b>contact the admin —</b> these details can’t be
                    edited manually. .
                  </p>
                </div>
              }
              variant="primary"
            />

            <Accordion
              label="How do I view ongoing orders?"
              description={
                <p>
                  Go to <b>Home</b>, click &nbsp;
                  <b>On-going Order</b> to check your current active orders.
                </p>
              }
              variant="primary"
            />

            <Accordion
              label="How do I cancel an order?"
              description={
                <div className="space-y-3">
                  <p>
                    You
                    <b> can cancel</b> orders, but please make sure it’s the
                    right decision. Always <b>double-check your stock</b> before
                    confirming an order to avoid cancellations.
                  </p>
                  <p>
                    To cancel, go to
                    <b> Home &gt; On-going Order</b>, then on the order card,
                    tap the <b>red (X) button</b> Once canceled, you are
                    required to refund the customer.
                  </p>
                  <p>
                    For more info on this, please visit the &nbsp;
                    <b>
                      Contract Policy &gt; Penalty for Frequent Cancellations
                    </b>
                    , and <b>Refund Policy.</b>
                  </p>
                </div>
              }
              variant="primary"
            />

            <Accordion
              label="How do I refund a customer’s order?"
              description={
                <div className="space-y-3">
                  <p>
                    You must <b>transfer the refund amount</b> to the &nbsp;
                    <b>admin’s account </b>
                    within <b>24 hours</b>.
                  </p>
                  <p>
                    To check the refund amount: Go to &nbsp;
                    <b>Home &gt; Balance &gt; Balance tab</b>.
                  </p>
                  <p>
                    In the <b>History</b> section, look for items labeled &nbsp;
                    <b>Refund</b> to view the refund amount per order. The
                    &nbsp;
                    <b>Refund Total</b> section shows the &nbsp;
                    <b>total amount you need to transfer</b> for all pending
                    refunds.
                  </p>
                </div>
              }
              variant="primary"
            />

            <Accordion
              label="How do I view my earnings balance?"
              description={
                <p>
                  Your earnings balance is displayed at the &nbsp;
                  <b>top of the Home</b> &nbsp; page. For a monthly breakdown,
                  go to &nbsp;
                  <b>Home &gt; Balance &gt; Balance tab</b>.
                </p>
              }
              variant="primary"
            />

            <Accordion
              label="Where can I check my platform fee information?"
              description={
                <div className="space-y-3">
                  <p>
                    Go to <b>Home &gt; Balance &gt; Platform Fee tab</b>. Here
                    you’ll find your payment status, last payment date, and
                    admin bank info.
                  </p>
                  <p>
                    For more info about terms and rules, check &nbsp;
                    <b>
                      Contract Policy &gt; Monthly Platform Fee & Penalty Policy
                    </b>
                    .
                  </p>
                </div>
              }
              variant="primary"
            />

            <Accordion
              label="How do I view my order history?"
              description={
                <p>
                  To review past orders, go to <b>Home &gt; Order history</b>.
                </p>
              }
              variant="primary"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
