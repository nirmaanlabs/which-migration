export type TConnectParam = {
  dbuser: string;
  database: string;
  dbpassword: string;
  host: string;
  port: number;
};

export type TConnectSuccessResponse = {
  database: string;
  dbuser: string;
  token: string;
};
export type TConnectReturn = Promise<TConnectSuccessResponse>;

export type TConnectFunc = (params: TConnectParam) => TConnectReturn;
