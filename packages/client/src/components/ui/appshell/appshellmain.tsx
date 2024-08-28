import React, { ReactNode } from "react";
import { Box } from "../box";
import { cn } from "@/lib/utils";
import { useAppshellContext } from "./context";

interface IAppshellMainProps {
  className?: string;
  children: ReactNode;
}

export const AppshellMain = ({ children, className }: IAppshellMainProps) => {
  const { navbarWidth } = useAppshellContext();
  return (
    <Box
      as="main"
      className={cn("appshell-main ml-[--appshell-navbar-width]", className)}
      style={
        { "--appshell-navbar-width": navbarWidth.width } as React.CSSProperties
      }
    >
      {children}
    </Box>
  );
};
