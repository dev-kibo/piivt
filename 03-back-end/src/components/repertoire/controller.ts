import BaseController from "../../common/BaseController";
import { NextFunction, Request, Response } from "express";
import { IAddRepertoire, IAddRepertoireValidator } from "./dto/IAddRepertoire";
import RepertoireModel from "./model";

export default class RepertoireController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.services.repertoireService.getAll());
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id;

    if (id <= 0) {
      res.status(400).send("Invalid ID number.");
    }

    try {
      const repertoire: RepertoireModel | null =
        await this.services.repertoireService.getById(id);

      if (repertoire === null) {
        return res.sendStatus(404);
      }

      res.send(repertoire);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddRepertoireValidator(data)) {
      res.status(400).send(IAddRepertoireValidator.errors);
    }

    try {
      res.send(
        await this.services.repertoireService.add(data as IAddRepertoire)
      );
    } catch (error) {
      next(error);
    }
  }
}
