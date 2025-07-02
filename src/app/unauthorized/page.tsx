"use client";

import { Button } from "@/components/input/button";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-error-medium font-medium">
        You don&apos;t have permission to access this page.
      </p>
      <Link href={"/"} className="pt-3">
        <Button variant="outline" color="neutral">
          Go to Home
        </Button>
      </Link>
    </div>
  );
}
