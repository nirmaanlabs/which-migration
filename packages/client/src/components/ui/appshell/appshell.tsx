import { ReactNode, CSSProperties, useState } from "react";
import { Box } from "../box";
import { AppshellContext } from "./context";
import { defaultHeaderHeight, defaultNavbarWidth } from "./constant";
import { cn } from "@/lib/utils";

export interface AppshellProps {
  header?: ReactNode;
  navbar?: ReactNode;
  children: ReactNode;
  className?: string;
  headerHeight: Pick<CSSProperties, "height">;
  navbarWidth: Pick<CSSProperties, "width">;
}

const Appshell = ({
  children,
  className,
  headerHeight,
  navbarWidth,
}: AppshellProps) => {
  const [navWidth, setNavWidth] = useState(
    () => navbarWidth ?? defaultNavbarWidth
  );

  return (
    <AppshellContext.Provider
      value={{
        headerHeight: headerHeight ?? defaultHeaderHeight,
        navbarWidth: navWidth,
        initialNavbarWidth: navbarWidth ?? defaultNavbarWidth,
        setNavbarWidth: (navbarWidth) => setNavWidth(navbarWidth),
      }}
    >
      <Box className={cn("appshell-root relative w-full h-screen", className)}>
        {children}
      </Box>
    </AppshellContext.Provider>
  );
};

Appshell.displayname = "Appshell";

export { Appshell };
