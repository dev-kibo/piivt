import BaseController from "../../common/BaseController";
import { NextFunction, Request, Response } from "express";
import MovieModel from "./model";
import { IAddMovie, IAddMovieValidator } from "./dto/IAddMovie";
import { IUpdateMovie, IUpdateMovieValidator } from "./dto/IUpdateMovie";
import IDeleteRoleValidator from "./dto/IDeleteRoleValidator";
import IDeleteRole from "./dto/IDeleteRole";
import IAddOrUpdateRoleValidator from "./dto/IAddOrUpdateRoleValidator";
import IAddOrUpdateRole from "./dto/IAddOrUpdateRole";

export default class MovieController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await this.services.movieService.getAll());
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
      const movie: MovieModel | null = await this.services.movieService.getById(
        id
      );

      if (movie === null) {
        return res.sendStatus(404);
      }

      res.send(movie);
    } catch (error) {
      next(error);
    }
  }

  async getAllWithRoles(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params.id;

    if (id <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    try {
      const movie: MovieModel | null = await this.services.movieService.getById(
        id,
        { loadRoles: true }
      );

      if (movie === null) {
        return res.sendStatus(404);
      }

      res.send(movie);
    } catch (error) {
      next(error);
    }
  }

  async getAllBySearchTerm(req: Request, res: Response, next: NextFunction) {
    const searchTerm = "" + req.params["search"] ?? "";

    try {
      res.send(await this.services.movieService.getBySearchTerm(searchTerm));
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("You must upload image poster.");
    }

    const data = req.body;

    if (!IAddMovieValidator(data)) {
      return res.status(400).send(IAddMovieValidator.errors);
    }

    try {
      res.send(
        await this.services.movieService.add(
          data as IAddMovie,
          req.files["poster"]
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    let posterFile: any;

    if (!req.files || Object.keys(req.files).length === 0) {
      posterFile = null;
    } else {
      posterFile = req.files["poster"];
    }

    const data = req.body;
    const movieId = +req.params.id;

    if (!IUpdateMovieValidator(data)) {
      return res.status(400).send(IUpdateMovieValidator.errors);
    }

    try {
      res.send(
        await this.services.movieService.update(
          data as IUpdateMovie,
          movieId,
          posterFile
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async updateRoles(req: Request, res: Response, next: NextFunction) {
    const movieId = +req.params.id;
    const data = req.body;

    if (movieId <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    if (!IAddOrUpdateRoleValidator(data)) {
      return res.status(400).send(IAddOrUpdateRoleValidator.errors);
    }

    try {
      const result = await this.services.movieService.updateRoles(
        movieId,
        data as IAddOrUpdateRole[]
      );

      if (result === null) {
        return res.sendStatus(404);
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async deleteRoles(req: Request, res: Response, next: NextFunction) {
    const movieId = +req.params.id;
    const data = req.body;

    if (movieId <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    if (!IDeleteRoleValidator(data)) {
      return res.status(400).send(IDeleteRoleValidator.errors);
    }

    try {
      const result = await this.services.movieService.deleteRoles(
        movieId,
        data as IDeleteRole[]
      );

      if (result === null) {
        return res.sendStatus(404);
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const movieId = +req.params.id;

    if (movieId <= 0) {
      return res.status(400).send("Invalid ID number");
    }

    try {
      const result = await this.services.movieService.deleteMovie(movieId);

      if (result === null) {
        return res.sendStatus(404);
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
