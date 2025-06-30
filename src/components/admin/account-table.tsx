"use client";

import { Account } from "@/app/types/account";

interface AccountTableProps {
  accounts: Account[];
}

export default function AccountTable({ accounts }: AccountTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-300 text-sm">
      <table className="min-w-full table-fixed">
        <thead className="bg-neutral-100 text-neutral-700 font-semibold">
          <tr>
            <th className="px-3 py-2 text-left">Buyer Id</th>
            <th className="px-3 py-2 text-left">Bank / E-Wallet</th>
            <th className="px-3 py-2 text-left">Account Number</th>
            <th className="px-3 py-2 text-left">Account Name</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountId} className="border-t border-neutral-200">
              <td className="p-3 text-neutral-800">{account.id}</td>
              <td className="p-3">
                <div className="font-medium text-neutral-900">
                  {account.bankName}
                </div>
              </td>

              <td className="p-3 text-neutral-800">{account.accountNumber}</td>
              <td className="p-3 text-neutral-800">{account.accountName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
