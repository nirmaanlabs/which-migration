import { createContext } from "react";
import { TConnectFunc } from "./types";

type TAuthContext = {
  connect: TConnectFunc;
  disconnect: () => void;
  isConnected: boolean;
};

export const AuthContext = createContext<TAuthContext>({
  connect: async () => ({ database: "", dbuser: "", token: "" }),
  isConnected: false,
  disconnect: () => {},
});
