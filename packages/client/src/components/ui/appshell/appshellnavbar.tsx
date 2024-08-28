import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Box } from "../box";

interface IAppshellNavbarProps {
  className?: string;
  children?: ReactNode;
}

export const AppshellNavbar = ({
  children,
  className,
}: IAppshellNavbarProps) => {
  return (
    <Box
      as="nav"
      className={cn(
        `absolute h-full pt-4 border-solid border-r border-b-gray-300 transition-all duration-100
                ease-out`,
        className
      )}
    >
      {children}
    </Box>
  );
};
