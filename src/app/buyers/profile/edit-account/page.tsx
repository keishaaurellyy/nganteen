"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";
import { EditAccount, EditAccountSchema } from "@/app/schema/account";
import { Account } from "@/app/types/account";
import { Header } from "@/components/input/header";
import { editAccount } from "@/app/accounts/mutation/edit";
import AlertBox from "@/components/input/alert-box";
import Link from "next/link";

export default function EditAccountPage({ account }: { account: Account }) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditAccount>({
    resolver: zodResolver(EditAccountSchema),
  });

  useEffect(() => {
    setMounted(true);
    if (account) {
      reset({
        bank_name: account.bankName,
        account_number: account.accountNumber,
        account_name: account.accountName,
      });
    }
  }, [reset, account]);

  const onSubmit = async (data: EditAccount) => {
    console.log("Form data:", data);
    if (!account?.accountId) return;
    try {
      await editAccount(String(account.accountId), {
        ...data,
        account_id: account.accountId,
      });
      router.push("/buyers/profile");
    } catch (err) {
      console.error("Edit Kitchen Failed:", err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full max-w-md justify-self-center">
      {/* Header */}
      <Header leftIcon rightIcon="none">
        Account Detail
      </Header>

      <main className="bg-neutral-100 px-5 pb-10 flex flex-col items-center">
        <div className="mt-4 bg-neutral-100 flex flex-col space-y-5">
          <AlertBox
            title="Double–Check Your Details!"
            description={
              <>
                Please provide the information below to process your full refund
                if there’s any cancelled order. Refunds will be processed within
                1x24 hours. If you don’t receive it,&nbsp;
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
            <Button
              type="submit"
              size="medium"
              color="tertiary"
              className="w-full"
            >
              Submit
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
