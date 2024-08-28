import { createContext, useContext } from "react";
import { defaultHeaderHeight, defaultNavbarWidth } from "./constant";
import { Dispatcher } from "@/types";

type TAppShellContextValue = {
  headerHeight: Pick<React.CSSProperties, "height">;
  navbarWidth: Pick<React.CSSProperties, "width">;
  initialNavbarWidth: Pick<React.CSSProperties, "width">;
  setNavbarWidth: Dispatcher<Pick<React.CSSProperties, "width">>;
};

export const AppshellContext = createContext<TAppShellContextValue>({
  headerHeight: { height: defaultHeaderHeight.height },
  navbarWidth: { width: defaultNavbarWidth.width },
  initialNavbarWidth: { width: defaultNavbarWidth.width },
  setNavbarWidth: () => {},
});

export const useAppshellContext = () => useContext(AppshellContext);
