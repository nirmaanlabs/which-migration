import { useToast } from "@/hooks/use-toast";
import { ReactNode, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { TConnectFunc, TConnectParam, TConnectSuccessResponse } from "./types";
import { authReducer, initialAuthState } from "./useAuthReducer";

// AuthProvider component to wrap your app

type AuthServiceProvider = {
  connect: TConnectFunc;
  disconnect: (connectionId: string) => Promise<unknown>;
};

type TAuthContextProvider = {
  children: ReactNode;
  authServiceProvider?: AuthServiceProvider;
};

export const AuthContextProvider = (props: TAuthContextProvider) => {
  const { toast } = useToast();

  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  const { authServiceProvider } = props;

  const connect = async (params: TConnectParam) => {
    const { database: databaseName, dbpassword, dbuser, port, host } = params;

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
        database: databaseName,
        dbpassword,
        dbuser,
        port,
        host,
      })) as unknown as TConnectSuccessResponse;

      const { connectionId, dbtoken, database } = connection;

      dispatch({ type: "DB_CONNECT_SUCCESS", connectionId, dbtoken, database });

      return Promise.resolve(connection);
    } catch (e) {
      dispatch({ type: "DB_CONNECT_FAIL" });
      console.error(e);
      return Promise.reject(e);
    }
  };

  const disconnect = async (connectionId: string) => {
    dispatch({ type: "DB_CONNECT_DISCONNECT", connectionId });
  };

  return (
    <AuthContext.Provider value={{ ...authState, connect, disconnect }}>
      {props.children}
    </AuthContext.Provider>
  );
};
