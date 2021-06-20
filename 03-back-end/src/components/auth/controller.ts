import BaseController from "../../common/BaseController";
import { Request, Response, NextFunction } from "express";
import { IAddAdmin, IAddAdminValidator } from "../admin/dto/IAddAdmin";
import * as bcrypt from "bcrypt";
import AdminModel from "../admin/model";
import IToken from "../admin/dto/IToken";
import * as jwt from "jsonwebtoken";
import Config from "../../config/dev";
import * as crypto from "crypto";
import { IRefreshToken, IRefreshTokenValidator } from "./dto/IRefreshToken";
import ApiError from "../error/ApiError";

export default class AuthController extends BaseController {
  async signIn(req: Request, res: Response, next: NextFunction) {
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

    const { accessToken, refreshToken } =
      this.generateApiTokens(accessTokenData);

    try {
      const query: string =
        "UPDATE admin SET refresh_token = ? WHERE admin_id = ?;";

      await this.db.execute(query, [refreshToken, admin.adminId]);

      res.send({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(new ApiError("SIGN_IN_FAILED", "Sign in failed."));
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    if (!IRefreshTokenValidator(req.body)) {
      res.status(400).send(IRefreshTokenValidator.errors);
    }

    const data = req.body as IRefreshToken;

    try {
      const query: string = "SELECT * FROM admin WHERE refresh_token = ?;";

      const [rows] = await this.db.execute(query, [data.refreshToken]);

      if (!Array.isArray(rows)) {
        return res.sendStatus(404);
      }

      if (rows.length === 0) {
        return res.sendStatus(404);
      }

      const admin: any = rows[0];
      const adminId: number = admin?.admin_id;
      const adminEmail: string = admin?.email;

      const tokenData: IToken = {
        id: adminId,
        email: adminEmail,
        role: "admin",
      };

      const { accessToken, refreshToken } = this.generateApiTokens(tokenData);

      const updateRefreshTokenQuery: string =
        "UPDATE admin SET refresh_token = ? WHERE admin_id = ?;";

      await this.db.execute(updateRefreshTokenQuery, [refreshToken, adminId]);

      res.send({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(new ApiError("TOKEN_REFRESH_FAILED", "Failed refreshing token."));
    }
  }

  private generateApiTokens(data: IToken) {
    const accessToken = jwt.sign(data, Config.accessToken.secret, {
      algorithm: "HS256",
      issuer: Config.accessToken.issuer,
      expiresIn: Config.accessToken.duration,
    });

    const refreshToken = crypto.randomBytes(64).toString("hex");

    return { accessToken, refreshToken };
  }
}
