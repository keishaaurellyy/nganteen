"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";
import {
  EditAccount,
  EditAccountSchema,
  RegisterAccount,
  RegisterAccountSchema,
} from "@/app/schema/account";
import { editAccount } from "@/app/accounts/mutation/edit";
import { useEffect } from "react";
import { getAccountById } from "@/app/accounts/mutation/view";
import { registerAccount } from "@/app/accounts/mutation/register";
import AlertBox from "../input/alert-box";
import Link from "next/link";

export default function RegisterAccountPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEdit = searchParams.get("edit") === "true";
  const accountId = searchParams.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterAccount | EditAccount>({
    resolver: zodResolver(isEdit ? EditAccountSchema : RegisterAccountSchema),
  });

  useEffect(() => {
    if (isEdit && accountId) {
      getAccountById(accountId).then((data) => {
        reset({
          bank_name: data.bankName ?? "",
          account_number: data.accountNumber ?? "",
          account_name: data.accountName ?? "",
        });
      });
    }
  }, [isEdit, accountId, reset]);

  const handleCreate = async (data: RegisterAccount, buyerId: string) => {
    await registerAccount({ ...data, buyer_id: buyerId });
  };

  const handleEdit = async (accountId: string, data: EditAccount) => {
    await editAccount(accountId, data);
  };

  const onSubmit = async (data: RegisterAccount | EditAccount) => {
    const buyerId = session?.user?.buyer_id;

    if (!buyerId) {
      console.error("Buyer ID not found in session");
      return;
    }

    try {
      if (isEdit && accountId) {
        await handleEdit(accountId, data as EditAccount);
      } else {
        await handleCreate(data as RegisterAccount, buyerId);
      }

      router.push("/buyers/profile");
    } catch (err) {
      console.error("Submit Failed:", err);
    }
  };

  return (
    <div className="mt-4 bg-neutral-100 flex flex-col space-y-5">
      <AlertBox
        title="Double–Check Your Details!"
        description={
          <>
            Please provide the information below to process your full refund if
            there’s any cancelled order. Refunds will be processed within 1x24
            hours. If you don’t receive it,&nbsp;
            <Link
              href="mailto:nganteen@gmail.com"
              className="font-bold text-error-medium underline"
            >
              contact us
            </Link>
            .
          </>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          placeholder="Bank or E–Wallet"
          type="text"
          {...register("bank_name")}
          error={!!errors.bank_name}
          helperText={errors.bank_name?.message}
          withAsterisk
        />
        <TextField
          placeholder="Account Number"
          type="text"
          {...register("account_number")}
          error={!!errors.account_number}
          helperText={errors.account_number?.message}
          withAsterisk
        />
        <TextField
          placeholder="Account Name"
          type="text"
          {...register("account_name")}
          error={!!errors.account_name}
          helperText={errors.account_name?.message}
          withAsterisk
        />
        <Button type="submit" size="medium" color="tertiary" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
