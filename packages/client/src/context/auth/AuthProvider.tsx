import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { TConnectFunc, TConnectParam, TConnectSuccessResponse } from "./types";

// AuthProvider component to wrap your app
type TAuthState = {
  isConnected: boolean;
  token: string | null;
  database: string | null;
  dbuser: string | null;
};

type AuthServiceProvider = {
  connect: TConnectFunc;
  disconnect: () => Promise<unknown>;
};

type TAuthContextProvider = {
  children: ReactNode;
  authServiceProvider?: AuthServiceProvider;
};

export const AuthContextProvider = (props: TAuthContextProvider) => {
  const { toast } = useToast();
  const [authState, setAuthState] = useState<TAuthState>({
    isConnected: false,
    token: null,
    dbuser: null,
    database: null,
  });

  const { authServiceProvider } = props;
  const connect = async (params: TConnectParam) => {
    const { database, dbpassword, dbuser, port, host } = params;

    try {
      if (
        !authServiceProvider ||
        Object.keys(authServiceProvider).length === 0
      ) {
        toast({
          title: "Please provide Auth Service Provider",
          variant: "default",
        });
        return Promise.reject(false);
      }

      const connection = (await authServiceProvider.connect({
        database,
        dbpassword,
        dbuser,
        port,
        host,
      })) as unknown as TConnectSuccessResponse;

      setAuthState({
        isConnected: true,
        token: "",
        dbuser: connection.dbuser,
        database: connection.database,
      });

      return Promise.resolve(connection);
    } catch (e) {
      setAuthState({
        isConnected: false,
        token: null,
        dbuser: null,
        database: null,
      });
      console.error(e);
      return Promise.reject(e);
    }
  };

  const disconnect = () => {
    setAuthState({
      isConnected: false,
      token: null,
      dbuser: null,
      database: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, connect, disconnect }}>
      {props.children}
    </AuthContext.Provider>
  );
};
