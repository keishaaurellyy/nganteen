"use client";

import Link from "next/link";
import { Header } from "@/components/input/header";
import PolicySection from "@/components/kitchens/contract-policy";

export default function ContractPolicyPage() {
  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      {/* Header */}
      <Header leftIcon rightIcon="none">
        Contract Policy
      </Header>

      <main className="bg-neutral-100 px-5 pb-10 mt-4 flex flex-col items-center">
        {/* Contract Policy */}
        <div className="w-full space-y-5">
          <PolicySection
            title="Welcome to Nganteen!"
            content={
              <>
                <p>
                  Thank you for joining Nganteen as one of our valued kitchen
                  partners. Nganteen connects customers with their favorite
                  meals through a seamless ordering experience, and your role as
                  a kitchen partner is essential in delivering that service.
                </p>
                <p>
                  To support smooth operations and mutual understanding, we
                  kindly ask you to read this <b>Contract Policy</b> carefully.
                </p>
                <p>
                  By partnering with Nganteen, you agree to follow the terms and
                  guidelines outlined below. These policies are designed to
                  ensure fairness, consistency, and a great experience for both
                  kitchens and customers alike.
                </p>
              </>
            }
          />
          <PolicySection
            title="Join as a Kitchen Partner"
            content={
              <>
                <p>
                  To start partnering with Nganteen, simply send an email
                  to&nbsp;
                  <Link
                    href="mailto:nganteen@gmail.com"
                    className="text-primary-500 underline"
                  >
                    nganteen@gmail.com
                  </Link>
                  &nbsp; with your&nbsp;
                  <b>kitchen name, kitchen address,</b> and&nbsp;
                  <b>proof of transfer</b>. for the monthly platform fee. Once
                  verified, your kitchen will be activated and ready to serve!
                </p>
              </>
            }
          />

          <PolicySection
            title="Monthly Platform Fee & Penalty Policy"
            content={
              <>
                <div className="space-y-3">
                  <p>
                    The platform charges a fixed fee of <b>Rp100.000/month</b>.
                    Payments are made to the admin’s bank account.
                  </p>
                  <p>
                    Please complete your payment by the&nbsp;
                    <b>1st to the 10th of each month</b>. If payment is not
                    received by the 10th, your kitchen account will be&nbsp;
                    <b>temporarily deactivated</b> until the payment is made.
                  </p>
                </div>
              </>
            }
          />

          <PolicySection
            title="Stop Partnering with Nganteen"
            content={
              <>
                <div className="space-y-3">
                  <p>
                    To terminate your partnership, send an email to&nbsp;
                    <Link
                      href="mailto:nganteen@gmail.com"
                      className="text-primary-500 underline"
                    >
                      nganteen@gmail.com
                    </Link>
                    &nbsp;with your&nbsp;
                    <b>kitchen name</b> and <b>kitchen address</b>. After that,
                    simply stop making further payments — your account will
                    automatically deactivate after the current billing cycle
                    ends.
                  </p>
                  <p>
                    You are still free to operate until the end of the paid
                    month. If you did prefer to stop earlier, you can manually
                    set your kitchen status to <b>closed</b> from the app.
                  </p>
                </div>
              </>
            }
          />

          <PolicySection
            title="Earning Profit & Covering Platform Fee"
            content={
              <>
                <div className="space-y-3">
                  <p>
                    You’re allowed to&nbsp;
                    <b>mark up prices</b> for your menu items to cover the
                    platform fee or earn more profit. However, we encourage you
                    to keep prices <b>reasonable</b> — overly high prices may
                    discourage customers from ordering.
                  </p>
                  <p>
                    To update prices, go to <b>Home &gt; Set your MENU</b>,
                    click the&nbsp;
                    <b>pencil icon</b>, input your selling price on each item,
                    and press <b>Modify</b> to save.
                  </p>
                </div>
              </>
            }
          />

          <PolicySection
            title="Penalty for Frequent Cancellations"
            content={
              <>
                <div className="space-y-3">
                  <p>
                    Canceling more than <b>3 orders</b> within a billing cycle
                    may result in a penalty — your kitchen account could
                    be&nbsp;
                    <b>suspended from receiving new orders</b> until the end of
                    the month.
                  </p>
                  <p>
                    To avoid cancellations, we highly recommend&nbsp;
                    <b>updating your stock daily</b>. You can do this via&nbsp;
                    <b>Home &gt; Set your MENU</b>, click the <b>pencil icon</b>
                    , adjust the stock level on each item, then press&nbsp;
                    <b>Modify</b> to save.
                  </p>
                </div>
              </>
            }
          />

          <PolicySection
            title="Refund Policy"
            content={
              <>
                <div className="space-y-3">
                  <p>
                    If a kitchen-initiated cancellation occurs, you are required
                    to <b>refund the full order amount</b> to the admin’s bank
                    account within <b>24 hours</b>.
                  </p>
                  <p>
                    Failure to refund within this timeframe will lead to
                    a&nbsp;
                    <b>
                      deactivation of your account
                    </b>
                    .
                  </p>
                  <p>
                    This rule exists to ensure fairness and maintain trust with
                    customers — so please cancel only when truly necessary and
                    always keep your stock updated.
                  </p>
                </div>
              </>
            }
          />
        </div>
      </main>
    </div>
  );
}
