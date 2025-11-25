"use client";

import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { NavbarButton } from "@/features/navigation/components/navbar";

function NavbarThemeMenu() {
  // theme destructure
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <NavbarButton>
                {theme === "light" && <SunIcon className="size-4" />}
                {theme === "dark" && <MoonIcon className="size-4" />}
                {theme === "system" && <ComputerIcon className="size-4" />}
              </NavbarButton>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="capitalize">change theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { NavbarThemeMenu };
