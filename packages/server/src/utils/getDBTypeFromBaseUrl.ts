import { DbKey } from "../dbInstances";

export const getDBTypeFromBaseUrl = (baseUrl: string) => {
  const segments = baseUrl.split("/");
  const dbType = segments[3] as DbKey;
  return dbType;
};
