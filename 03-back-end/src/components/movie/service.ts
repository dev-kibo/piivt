import BaseService from "../../common/BaseService";
import IModelAdapterOptionsInterface from "../../common/IModelAdapterOptions.interface";
import { IAddMovie } from "./dto/IAddMovie";
import MovieModel from "./model";
import Config from "../../config/dev";
import { v4 } from "uuid";
import * as path from "path";
import sharp = require("sharp");
import { IUpdateMovie } from "./dto/IUpdateMovie";
import ApiError from "../error/ApiError";
import IDeleteRole from "./dto/IDeleteRole";
import { IUpdateRole } from "../role/dto/IUpdateRole";
import IAddOrUpdateRole from "./dto/IAddOrUpdateRole";

class MovieModelAdapterOptions implements IModelAdapterOptionsInterface {
  loadRoles: boolean;
}

export default class MovieService extends BaseService<MovieModel> {
  protected async adaptModel(
    data: any,
    options: Partial<MovieModelAdapterOptions>
  ): Promise<MovieModel> {
    const model = new MovieModel();

    model.movieId = +data?.movie_id;
    model.title = data?.title;
    model.description = data?.description;
    model.duration = +data?.duration;
    model.releasedAt = data?.released_at;
    model.posterUrl = `${Config.server.baseUrl}/${data.poster_path}`;

    if (options.loadRoles) {
      model.roles = await this.services.roleService.getAllRolesForMovie(
        model.movieId
      );
    }

    return model;
  }

  public async getAll(
    options: Partial<MovieModelAdapterOptions> = {}
  ): Promise<MovieModel[]> {
    return await this.getAllFromTable("movie", options);
  }

  public async getById(
    id: number,
    options: Partial<MovieModelAdapterOptions> = {}
  ): Promise<MovieModel | null> {
    return await this.getByIdFromTable("movie", id, options);
  }

  public async getBySearchTerm(
    searchTerm: string,
    options: MovieModelAdapterOptions = { loadRoles: false }
  ): Promise<MovieModel[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const query: string =
          "SELECT * FROM movie WHERE title LIKE CONCAT('%', ?, '%') AND is_deleted = 0;";

        const [rows] = await this.db.execute(query, [searchTerm]);

        const results: MovieModel[] = [];

        if (Array.isArray(rows)) {
          for (const row of rows) {
            results.push(await this.adaptModel(row, options));
          }
        }

        resolve(results);
      } catch (error) {
        reject(new ApiError("FAILED_MOVIE_SEARCH", "Failed searching movies."));
      }
    });
  }

  public async add(data: IAddMovie, posterFile: any): Promise<MovieModel> {
    return new Promise<MovieModel>(async (resolve, reject) => {
      try {
        if (!this.isPosterValid(posterFile)) {
          return reject(
            new ApiError(
              "INVALID_IMAGE",
              "Image must be in .jpg or .png format."
            )
          );
        }

        await this.db.beginTransaction();

        const insertQuery: string =
          "INSERT movie SET title = ?, description = ?, released_at = ?, duration = ?;";

        const result = await this.db.execute(insertQuery, [
          data.title,
          data.description,
          data.releasedAt,
          data.duration,
        ]);

        const insertInfo: any = result[0];
        const movieId = +insertInfo?.insertId;

        const posterPath = await this.uploadMoviePoster(posterFile, movieId);
        await this.resizeUploadedPhoto(posterPath);

        const updateQuery: string =
          "UPDATE movie SET poster_path = ? WHERE movie_id = ?;";

        await this.db.execute(updateQuery, [posterPath, movieId]);

        await this.db.commit();

        resolve(await this.getById(movieId));
      } catch (error) {
        await this.db.rollback();

        console.log(error.errno);

        if (error?.errno === 1292) {
          return reject(
            new ApiError(
              "MOVIE_ADD_FAILED",
              "Invalid date format. Date must be in yyyy-MM-dd format."
            )
          );
        }

        reject(new ApiError("MOVIE_ADD_FAILED", "Failed adding new movie."));
      }
    });
  }

  public async update(
    data: IUpdateMovie,
    id: number,
    posterFile: any
  ): Promise<MovieModel> | null {
    const movie: MovieModel | null = await this.getById(id);

    if (movie === null) {
      return null;
    }

    return new Promise<MovieModel>(async (resolve, reject) => {
      try {
        if (posterFile !== null && !this.isPosterValid(posterFile)) {
          return reject(
            new ApiError(
              "INVALID_IMAGE",
              "Image must be in .jpg or .png format."
            )
          );
        }

        await this.db.beginTransaction();

        const updateQuery: string =
          "UPDATE movie SET title = ?, description = ?, released_at = ?, duration = ? WHERE movie_id = ?;";

        await this.db.execute(updateQuery, [
          data.title,
          data.description,
          data.releasedAt,
          data.duration,
          movie.movieId,
        ]);

        if (posterFile !== null) {
          const posterPath = await this.uploadMoviePoster(
            posterFile,
            movie.movieId
          );
          await this.resizeUploadedPhoto(posterPath);

          const updateQuery: string =
            "UPDATE movie SET poster_path = ? WHERE movie_id = ?;";

          await this.db.execute(updateQuery, [posterPath, movie.movieId]);
        }

        await this.db.commit();

        resolve(await this.getById(movie.movieId));
      } catch (error) {
        await this.db.rollback();

        if (error?.errno === 1292) {
          return reject(
            new ApiError(
              "MOVIE_ADD_FAILED",
              "Invalid date format. Date must be in yyyy-MM-dd format."
            )
          );
        }

        reject(new ApiError("MOVIE_ADD_FAILED", "Failed adding new movie."));
      }
    });
  }

  public async updateRoles(
    movieId: number,
    data: IAddOrUpdateRole[]
  ): Promise<MovieModel> | null {
    if (!(await this.getById(movieId))) {
      return null;
    }

    return new Promise<MovieModel>(async (resolve, reject) => {
      try {
        for (const role of data) {
          console.log(role);
          if (Number.isNaN(Number(role.roleId))) {
            console.log("nan");
            await this.services.roleService.add(role);
          } else {
            console.log("num");
            await this.services.roleService.update(Number(role.roleId), {
              role: role.role,
            });
          }
        }

        resolve(await this.getById(movieId, { loadRoles: true }));
      } catch (error) {
        reject(
          new ApiError("ADD_UPDATE_FAILED", "Failed adding/updating roles.")
        );
      }
    });
  }

  public async deleteRoles(
    id: number,
    data: IDeleteRole[]
  ): Promise<boolean> | null {
    if (!(await this.getById(id))) {
      return null;
    }

    return new Promise(async (resolve, reject) => {
      try {
        for (const role of data) {
          await this.services.roleService.delete(role.roleId);
        }

        resolve(true);
      } catch (error) {
        reject(new ApiError("DELETE_FAILED", "Failed deleting roles."));
      }
    });
  }

  public async deleteMovie(id: number): Promise<boolean> | null {
    if (!(await this.getById(id))) {
      return null;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const query: string =
          "UPDATE movie SET is_deleted = 1 WHERE movie_id = ?;";
        await this.db.execute(query, [id]);

        resolve(true);
      } catch (error) {
        reject(new ApiError("DELETE_FAILED", "Failed deleting movie."));
      }
    });
  }

  private async uploadMoviePoster(file: any, movieId: number): Promise<string> {
    return new Promise<string>(async (resolve) => {
      const imagePath: string = `${
        Config.fileUpload.uploadDest
      }/movies/${movieId}/${v4()}.jpg`;

      await file.mv(imagePath);

      resolve(imagePath);
    });
  }

  private isPosterValid(posterFile: any): boolean {
    return (
      posterFile.mimetype === "image/jpeg" ||
      posterFile.mimetpye === "image/png"
    );
  }

  private async resizeUploadedPhoto(imagePath: string) {
    const pathParts = path.parse(imagePath);

    const directory = pathParts.dir;
    const filename = pathParts.name;
    const extension = pathParts.ext;

    for (const resizeSpecification of Config.fileUpload.photos.resizes) {
      const resizedImagePath =
        directory + "/" + filename + resizeSpecification.sufix + extension;
      await sharp(imagePath)
        .resize({
          width: resizeSpecification.width,
          height: resizeSpecification.height,
          fit: resizeSpecification.fit,
          background: { r: 255, g: 255, b: 255, alpha: 1.0 },
          withoutEnlargement: true,
        })
        .toFile(resizedImagePath);
    }
  }
}
