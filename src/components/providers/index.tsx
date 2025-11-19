"use client";

import { ReactNode, useEffect, useState } from "react";

import { ThemeProvider, useTheme } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

function Providers({ children }: { children: ReactNode }) {
  // states
  const [mounted, setMounted] = useState<boolean>(false);

  // effects
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // render
  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="dark" disableTransitionOnChange>
      {children}
      <ToasterProvider />
    </ThemeProvider>
  );
}

export { Providers };

function ToasterProvider() {
  const { resolvedTheme } = useTheme();

  return <Toaster position="bottom-right" theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}
