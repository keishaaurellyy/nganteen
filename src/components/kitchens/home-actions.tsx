'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FileText, HelpCircle, LogOut } from 'lucide-react';

const actions = [
  {
    label: 'Contract Policy',
    icon: <FileText size={24} />,
    href: '/kitchens/contract-policy',
    className: 'bg-primary-500',
  },
  {
    label: 'Help Center',
    icon: <HelpCircle size={24} />,
    href: '/kitchens/help',
    className: 'bg-primary-500',
  },
  {
    label: 'Logout',
    icon: <LogOut size={24} />,
    onClick: () => signOut({ callbackUrl: '/' }),
    className: 'bg-error-medium',
  },
];

export default function KitchenActions() {
  const router = useRouter();

  return (
    <div className="border border-neutral-400 px-3 py-5 rounded-xl grid grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <button
            className={`text-neutral-100 w-10 h-10 rounded-xl flex items-center justify-center ${action.className}`}
            onClick={() =>
              action.onClick ? action.onClick() : router.push(action.href)
            }
          >
            {action.icon}
          </button>
          <span className="text-xs font-semibold text-center">{action.label}</span>
        </div>
      ))}
    </div>
  );
}
