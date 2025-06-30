"use client";

import { useEffect, useState } from "react";
import { viewBuyerById } from "@/app/buyers/mutations/view";
import { Buyer } from "@/app/types/buyer";
import { SkeletonProfile } from "./skeleton";

export default function ProfileCard() {
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("buyer_id");
    if (id) {
      viewBuyerById("/api/buyers", { arg: { id } })
        .then((res: any) => {
          if (res.success) {
            setBuyer(res.data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <SkeletonProfile />;
  if (!buyer) return null;

  return (
    <div className="rounded-lg border border-neutral-400 p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm-bold text-neutral-800">Personal Info</h2>
      </div>

      <div className="grid grid-cols-2 gap-y-5 text-xs-semibold">
        <div>
          <p className="text-neutral-600">Name</p>
          <p className="text-neutral-800 text-sm-semibold truncate">
            {buyer.firstName} {buyer.lastName ?? ""}
          </p>
        </div>
        <div>
          <p className="text-neutral-600">Email</p>
          <p className="text-neutral-800 text-sm-semibold truncate">
            {buyer.universityEmail}
          </p>
        </div>
        <div>
          <p className="text-neutral-600">Student ID</p>
          <p className="text-neutral-800 text-sm-semibold truncate">
            {buyer.studentIdNumber || "-"}
          </p>
        </div>
        <div>
          <p className="text-neutral-600">Phone</p>
          <p className="text-neutral-800 text-sm-semibold truncate">
            {buyer.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
