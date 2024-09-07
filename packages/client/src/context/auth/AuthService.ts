import { httpClient } from "../../httpClient/httpClient";
import { TConnectParam } from "./AuthContext";

export const AuthService = {
  connect: async (params: TConnectParam) => {
    try {
      const { json } = await httpClient("/v1/pg/connect", {
        method: "POST",
        body: JSON.stringify(params),
      });
      if (json.databaseName) {
        localStorage.setItem("databaseName", json.databaseName);
      }
      return Promise.resolve(json);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  disconnect: async () => {
    try {
      const { json } = await httpClient("/v1/disconnect");
      localStorage.setItem("databaseName", json.databaseName);
      return Promise.resolve(json);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
