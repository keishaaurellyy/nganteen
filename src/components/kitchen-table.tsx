"use client";

import { Kitchen } from "@/app/types/kitchen";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import Show from "./input/show";

interface KitchenTableProps {
  kitchens: Kitchen[];
}

export default function KitchenTable({ kitchens }: KitchenTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-300 text-sm">
      <table className="min-w-full table-fixed">
        <thead className="bg-neutral-100 text-neutral-700 font-semibold">
          <tr>
            <th className="w-10 px-3 py-2 text-left">&emsp;</th>
            <th className="px-3 py-2 text-left">Nama Kitchen</th>
            <th className="px-3 py-2 text-left">Nama Admin</th>
            <th className="px-3 py-2 text-left">Nomor Admin</th>
            <th className="px-3 py-2 text-left">Email Kitchen</th>
            <th className="px-3 py-2 text-left">Lokasi</th>
            <th className="px-3 py-2 text-left">Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          {kitchens.map((kitchen) => (
            <tr key={kitchen.kitchenId} className="border-t border-neutral-200">
              <td className="px-3 py-3">
                <button
                  onClick={() =>
                    router.push(`/admin/edit-kitchen/${kitchen.kitchenId}`)
                  }
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <Pencil size={16} />
                </button>
              </td>

              <td className="p-3">
                <div className="font-medium text-neutral-900">
                  {kitchen.kitchenName}
                </div>
              </td>

              <td className="p-3 text-neutral-800">{kitchen.adminName}</td>
              <td className="p-3 text-neutral-800">{kitchen.adminPhone}</td>
              <td className="p-3 text-neutral-800">{kitchen.kitchenEmail}</td>
              <Show
                when={!!kitchen.location}
                fallback={<td className="text-center items-center">---</td>}
              >
                <td className="p-3 text-neutral-800">{kitchen.location}</td>
              </Show>
              <Show
                when={!!kitchen.kitchenDescription}
                fallback={<td className="text-center items-center">---</td>}
              >
                <td className="p-3 text-neutral-800">
                  {kitchen.kitchenDescription}
                </td>
              </Show>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
