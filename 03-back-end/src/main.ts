import * as express from "express";
import Config from "./config/dev";
import * as cors from "cors";
import * as fs from "fs";
import * as path from "path";
import * as morgan from "morgan";
import IApplicationResources from "./common/IApplicationResources.interface";
import * as mysql2 from "mysql2/promise";
import Router from "./router";
import CinemaController from "./components/cinema/controller";
import CinemaRouter from "./components/cinema/router";
import CinemaService from "./components/cinema/service";
import ActorService from "./components/actor/service";
import ActorRouter from "./components/actor/router";

async function main() {
  const application: express.Application = express();

  fs.mkdirSync(path.dirname(Config.logger.path), {
    mode: 0o755,
    recursive: true,
  });

  application.use(
    morgan(
      ":date[iso]\t:remote-addr\t:method\t:status\t:res[content-length] bytes\t:response-time ms",
      {
        stream: fs.createWriteStream(Config.logger.path),
      }
    )
  );

  application.use(cors());
  application.use(express.json());

  const resources: IApplicationResources = {
    databaseConnection: await mysql2.createConnection({
      host: Config.database.host,
      port: Config.database.port,
      user: Config.database.user,
      password: Config.database.password,
      database: Config.database.database,
      charset: Config.database.charset,
      timezone: Config.database.timezone,
      supportBigNumbers: true,
    }),
  };

  resources.databaseConnection.connect();

  resources.services = {
    cinemaService: new CinemaService(resources),
    actorService: new ActorService(resources),
  };

  application.use(
    Config.server.static.route,
    express.static(Config.server.static.path, {
      cacheControl: Config.server.static.cacheControl,
      dotfiles: Config.server.static.dotFiles,
      etag: Config.server.static.etag,
      maxAge: Config.server.static.maxAge,
      index: Config.server.static.index,
    })
  );

  Router.setupRoutes(application, resources, [
    new CinemaRouter(),
    new ActorRouter(),
  ]);

  application.use((err, req, res, next) => {
    console.dir(err);
    res.status(500).send(err);
  });

  application.listen(Config.server.port);
}

main();
