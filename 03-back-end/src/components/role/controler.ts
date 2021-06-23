import BaseController from "../../common/BaseController";
import { NextFunction, Request, Response } from "express";
import { IAddRole, IAddRoleValidator } from "./dto/IAddRole";
import { IUpdateRole, IUpdateRoleValidator } from "./dto/IUpdateRole";

export default class RoleController extends BaseController {
  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddRoleValidator(data)) {
      return res.status(400).send(IAddRoleValidator.errors);
    }

    try {
      res.send(await this.services.roleService.add(data as IAddRole));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = +req.params?.id;
    const data = req.body;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    if (!IUpdateRoleValidator(data)) {
      return res.status(400).send(IUpdateRoleValidator.errors);
    }

    try {
      const result = await this.services.roleService.update(
        id,
        data as IUpdateRole
      );

      if (result === null) {
        return res.sendStatus(404);
      }

      res.send();
    } catch (error) {
      next(error);
    }
  }
}
