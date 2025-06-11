import type { ReactNode } from "react";

interface ShowProps {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export default function Show({ when, children, fallback = null }: ShowProps) {
  return <>{when ? children : fallback}</>;
}
