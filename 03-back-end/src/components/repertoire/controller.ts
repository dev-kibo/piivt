import BaseController from "../../common/BaseController";
import { NextFunction, Request, Response } from "express";
import IAddRepertoire from "./dto/IAddRepertoire";
import IAddRepertoireValidator from "./dto/IAddRepertoireValidator";
import RepertoireModel from "./model";
import IUpdateRepertoireValidator from "./dto/IUpdateRepertoireValidator";
import IUpdateRepertoire from "./dto/IUpdateRepertoire";
import IDeleteProjectionValidator from "../projection/dto/IDeleteProjectionValidator";
import IDeleteProjection from "../projection/dto/IDeleteProjection";

export default class RepertoireController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.services.repertoireService.getAll());
    } catch (error) {
      next(error);
    }
  }

  async getByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const date: string = req.params.date ?? null;
      const result: RepertoireModel | null =
        await this.services.repertoireService.getByDate(date);

      if (result === null) {
        return res.sendStatus(404);
      }

      res.send(result);
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

  async update(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id;
    const data = req.body;

    if (id <= 0) {
      res.status(400).send("Invalid ID number.");
    }

    if (!IUpdateRepertoireValidator(data)) {
      res.status(400).send(IUpdateRepertoireValidator.errors);
    }

    try {
      const repertoire = await this.services.repertoireService.addOrUpdate(
        id,
        data as IUpdateRepertoire
      );

      if (repertoire === null) {
        return res.sendStatus(404);
      }

      res.send(repertoire);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id;
    const data = req.body;

    if (id <= 0) {
      res.status(400).send("Invalid ID number.");
    }

    if (!IDeleteProjectionValidator(data)) {
      res.status(400).send(IDeleteProjectionValidator.errors);
    }

    try {
      const result: boolean | null =
        await this.services.projectionService.deleteProjections(
          id,
          data as IDeleteProjection[]
        );

      if (result === null) {
        return res.sendStatus(404);
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
