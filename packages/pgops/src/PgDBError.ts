import { DatabaseError } from "pg";

export class PgDBError extends DatabaseError {
  eCode: string | undefined;
  eMessage: string;
  eMessageName: string;
  constructor(
    eMessage: string,
    eCode: string | undefined,
    eMessageName: string
  ) {
    // @ts-expect-error ignore this, because I don't have the type with me
    super(eMessage, 77, eMessageName);
    this.eCode = eCode;
    this.eMessage = eMessage;
    this.eMessageName = eMessageName;
  }
}
