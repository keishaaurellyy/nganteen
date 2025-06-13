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
import { Header } from "@/components/input/header";
import { registerAccount } from "../../../accounts/mutation/register";
import { editAccount } from "@/app/accounts/mutation/edit";
import { useEffect } from "react";
import { getAccountById } from "@/app/accounts/mutation/view";

function AccountWarningAlert() {
  return (
    <div className="w-full max-w-[343px] mt-4 border border-primary-500 bg-primary-100 text-yellow-800 text-sm px-4 py-3 rounded-md mb-6">
      <div className="block text-xs font-bold mb-1 text-primary-500">
        Double–Check Your Details!
      </div>
      <p className="text-2xs font-normal text-neutral-900">
        Please provide the information below to process your full refund if
        there’s any cancelled order. Refunds will be processed within 1×24
        hours. If you don’t receive it,&nbsp;
        <a
          href="mailto:nganteen@gmail.com"
          className="text-error-medium underline font-bold"
        >
          contact us
        </a>
        .
      </p>
    </div>
  );
}

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
    <div className="min-h-screen max-w-md justify-self-center w-full bg-neutral-100 px-5 pt-[44px] pb-10 flex flex-col items-center">
      <Header
        leftIcon
        onLeftIconClick={() => window.history.back()}
        rightIcon="none"
      >
        Account Detail
      </Header>

      <AccountWarningAlert />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[343px] space-y-4"
      >
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
        <Button
          type="submit"
          className="flex justify-center w-full max-w-[343px] bg-green-600 hover:bg-green-700"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
