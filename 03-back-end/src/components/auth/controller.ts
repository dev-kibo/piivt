import BaseController from "../../common/BaseController";
import { Request, Response, NextFunction } from "express";
import { IAddAdmin, IAddAdminValidator } from "../admin/dto/IAddAdmin";
import * as bcrypt from "bcrypt";
import AdminModel from "../admin/model";
import IToken from "../admin/dto/IToken";
import * as jwt from "jsonwebtoken";
import Config from "../../config/dev";
import * as crypto from "crypto";
import IErrorResponse from "../../common/IErrorResponse.interface";

export default class AuthController extends BaseController {
  public async signIn(req: Request, res: Response, next: NextFunction) {
    if (!IAddAdminValidator(req.body)) {
      return res.status(400).send(IAddAdminValidator.errors);
    }

    const data = req.body as IAddAdmin;

    const admin: AdminModel | null =
      await this.services.adminService.getByEmail(data.email);

    if (admin === null) {
      return res.sendStatus(404);
    }

    if (!bcrypt.compareSync(data.password, admin.passwordHash)) {
      return res.status(403).send("Invalid administrator password.");
    }

    const accessTokenData: IToken = {
      id: admin.adminId,
      email: admin.email,
      role: "admin",
    };

    const accessToken = jwt.sign(accessTokenData, Config.accessToken.secret, {
      algorithm: "HS256",
      issuer: Config.accessToken.issuer,
      expiresIn: Config.accessToken.duration,
    });

    const refreshToken = crypto.randomBytes(64).toString("hex");

    try {
      const query: string =
        "UPDATE admin SET refresh_token = ? WHERE admin_id = ?;";

      await this.db.execute(query, [refreshToken, admin.adminId]);

      res.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      const e: IErrorResponse = {
        code: +error?.errno,
        description: error.message,
      };
      next(e);
    }
  }
}
