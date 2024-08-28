import { Box } from "@/components/ui/box";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface AppshellHeaderProps {
  children?: ReactNode;
  className?: string | undefined;
}

export const AppshellHeader = ({
  children,
  className,
}: AppshellHeaderProps) => {
  return (
    <Box
      as="header"
      className={cn(
        `w-full border-solid border-b border-b-gray-300`,
        className
      )}
    >
      {children}
    </Box>
  );
};

AppshellHeader.displayName = "AppshellHeader";
