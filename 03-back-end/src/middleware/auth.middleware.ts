import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Config from "../config/dev";
import IToken from "../components/admin/dto/IToken";

export default class AuthMiddleware {
  public static verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token: string = req.headers.authorization ?? "";

    const [tokenType, tokenString] = token.trim().split(" ");

    if (tokenType !== "Bearer") {
      return res.status(401).send("Invalid auth token type specified.");
    }

    if (typeof tokenString !== "string" || tokenString.length === 0) {
      return res.status(401).send("Invalid auth token length.");
    }

    try {
      const decodedToken = jwt.verify(tokenString, Config.accessToken.secret);

      req.authorized = decodedToken as IToken;

      next();
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
}
