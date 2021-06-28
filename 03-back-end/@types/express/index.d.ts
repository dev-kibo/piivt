import IToken from "../../src/components/admin/dto/IToken";

declare global {
  namespace Express {
    interface Request {
      authorized?: IToken | null;
    }
  }
}
