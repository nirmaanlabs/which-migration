import { httpClient } from "../../httpClient/httpClient";
import { TConnectParam, TConnectSuccessResponse } from "./types";
export const AuthService = {
  connect: async (params: TConnectParam) => {
    try {
      const {
        json,
      }: {
        json: TConnectSuccessResponse;
      } = await httpClient("/v1/pg/connect", {
        method: "POST",
        body: JSON.stringify(params),
      });
      localStorage.setItem(
        json.connectionId,
        JSON.stringify({ db: json.database, dbtoken: json.dbtoken })
      );
      return Promise.resolve(json);
    } catch (error) {
      console.log({ error });
      return Promise.reject(error);
    }
  },

  disconnect: async (connectionId: string) => {
    try {
      const { json } = await httpClient("/v1/pg/disconnect");
      localStorage.removeItem(connectionId);
      return Promise.resolve(json);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
