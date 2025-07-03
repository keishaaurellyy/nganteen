"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  RegisterAccount,
  RegisterAccountSchema,
  EditAccount,
  EditAccountSchema,
} from "@/app/schema/account";
import { registerAccount } from "@/app/accounts/mutation/register";
import { editAccount } from "@/app/accounts/mutation/edit";
import { getAccountByBuyerId } from "@/app/accounts/mutation/view";

import { TextField } from "@/components/input/text-field";
import { Button } from "@/components/input/button";
import AlertBox from "@/components/input/alert-box";

export default function AccountForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [accountId, setAccountId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterAccount | EditAccount>({
    resolver: zodResolver(isEdit ? EditAccountSchema : RegisterAccountSchema),
  });

  useEffect(() => {
    const fetchAccount = async () => {
      const buyerId = session?.user?.buyer_id;
      if (!buyerId) return;

      try {
        const account = await getAccountByBuyerId(Number(buyerId));
        if (account) {
          setAccountId(account.accountId);
          setIsEdit(true);
          reset({
            bank_name: account.bankName ?? "",
            account_number: account.accountNumber ?? "",
            account_name: account.accountName ?? "",
          });
        } else {
          setIsEdit(false);
        }
      } catch {
        console.log("No account yet, will register.");
        setIsEdit(false);
      }
    };

    fetchAccount();
  }, [session, reset]);

  const onSubmit = async (data: RegisterAccount | EditAccount) => {
    const buyerId = session?.user?.buyer_id;
    if (!buyerId) return;

    try {
      if (isEdit && accountId) {
        await editAccount(String(accountId), data as EditAccount);
      } else {
        const { bank_name, account_number, account_name } =
          data as RegisterAccount;
        await registerAccount({
          bank_name,
          account_number,
          account_name,
          buyer_id: buyerId,
        });
      }

      router.replace("/buyers/profile?from=cancelled");
    } catch (err) {
      console.error("Submit failed:", err);
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
        <Button
          type="submit"
          size="medium"
          color="tertiary"
          className="w-full"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
