import { createContext } from "react";

// Create AuthContext
export type TConnectParam = {
  dbuser: string;
  database: string;
  dbpassword: string;
  host: string;
  port: number;
};

type TAuthContext = {
  connect: (params: TConnectParam) => Promise<boolean>;
  disconnect: () => void;
  isConnected: boolean;
};

export const AuthContext = createContext<TAuthContext>({
  connect: () => Promise.resolve(true),
  isConnected: false,
  disconnect: () => {},
});
