import { ReactNode } from "react";
import { BaseHeader } from "./BaseHeader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-3xl mx-auto w-full h-full flex flex-col items-center justify-center p-2">
      <BaseHeader />
      <main className="w-full">{children}</main>
    </div>
  );
}
