import { createContext } from "react";
import { ConnectionID, DBServers, TConnectFunc } from "./types";

type TAuthContext = {
  connect: TConnectFunc;
  disconnect: (connectionId: string) => void;
  isConnected: boolean;
  dbInstances: DBServers;
  currentConnectionID: ConnectionID;
};

export const AuthContext = createContext<TAuthContext>({
  connect: async () =>
    Promise.resolve({
      dbtoken: "",
      dbuser: "",
      database: "",
      status: "",
      message: "",
      connectionId: "",
    }),
  isConnected: false,
  disconnect: () => {},
  dbInstances: {},
  currentConnectionID: "",
});
