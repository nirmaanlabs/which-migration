import { DBServers, TAuthAction, TAuthState } from "./types";

export const initialAuthState: TAuthState = {
  isConnected: false,
  dbInstances: {
    abc: {
      db: "aaa",
      dbtoken: "asdfas",
    },
  },
  currentConnectionID: "",
};

export const authReducer = (
  authState: TAuthState,
  action: TAuthAction
): TAuthState => {
  switch (action.type) {
    case "DB_CONNECT_SUCCESS": {
      return {
        ...authState,
        isConnected: true,
        currentConnectionID: action.connectionId,
        dbInstances: {
          ...authState.dbInstances,
          [action.connectionId]: {
            db: action.database,
            dbtoken: action.dbtoken,
          },
        } as DBServers,
      };
    }
    case "DB_CONNECT_FAIL": {
      return {
        ...authState,
        isConnected: false,
      };
    }
    case "DB_CONNECT_DISCONNECT": {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.connectionId]: _, ...newAuthState } =
        authState.dbInstances;
      return {
        ...authState,
        isConnected: false,
        currentConnectionID: action.connectionId,
        dbInstances: newAuthState,
      };
    }

    default: {
      throw Error("Unknown action: " + (action as TAuthAction).type);
    }
  }
};
