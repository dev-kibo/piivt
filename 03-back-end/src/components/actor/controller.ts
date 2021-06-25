import BaseController from "../../common/BaseController";
import { Request, Response, NextFunction } from "express";
import ActorModel from "./model";
import IAddActor from "./dto/IAddActor";
import IAddActorValidator from "./dto/IAddActorValidator";
import { IUpdateActor, IUpdateActorValidator } from "./dto/IUpdateActor";

export default class ActorController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const searchTerm = "" + req?.query?.q;
      res.send(await this.services.actorService.getAll(searchTerm));
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    try {
      const actor: ActorModel | null = await this.services.actorService.getById(
        id
      );

      if (actor === null) {
        return res.sendStatus(404);
      }

      res.send(actor);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddActorValidator(data)) {
      return res.status(400).send(IAddActorValidator.errors);
    }

    try {
      return res.send(await this.services.actorService.add(data as IAddActor));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const data = req.body;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number.");
    }

    if (!IUpdateActorValidator(data)) {
      return res.status(400).send(IUpdateActorValidator.errors);
    }

    try {
      const result: ActorModel | null = await this.services.actorService.update(
        data as IUpdateActor,
        id
      );

      if (result === null) {
        return res.sendStatus(404);
      }

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}
