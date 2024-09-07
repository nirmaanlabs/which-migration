import { ReactNode, useState } from "react";
import { AuthContext, TConnectParam } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

// AuthProvider component to wrap your app
type TAuthState = {
  isConnected: boolean;
  token: string | null;
  database: string | null;
  dbuser: string | null;
};

type PromiseConnectResponse = {
  database: string;
  dbuser: string;
  token: string;
};

type AuthServiceProvider = {
  connect: (params: TConnectParam) => Promise<unknown>;
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
      })) as unknown as PromiseConnectResponse;

      setAuthState({
        isConnected: true,
        token: "",
        dbuser: connection.dbuser,
        database: connection.database,
      });

      return Promise.resolve(true);
    } catch (e) {
      setAuthState({
        isConnected: false,
        token: null,
        dbuser: null,
        database: null,
      });
      console.error(e);
      return Promise.reject(false);
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
