import { useAuthContext } from "./useAuthContext";

export const useAuthConnectionId = (connectionId: string) => {
  const auth = useAuthContext();

  return {
    dbInstance: auth.dbInstances[connectionId],
  };
};
