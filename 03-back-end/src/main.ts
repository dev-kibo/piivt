import * as express from "express";
import Config from "./config/dev";
import * as cors from "cors";
import * as fs from "fs";
import * as path from "path";
import * as morgan from "morgan";
import AuthRouter from "./routers/auth.router";
import IApplicationResources from "./services/IApplicationResources.inteface";

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

application.use(cors());
application.use(express.json());

const resources: IApplicationResources = {};

AuthRouter.setupRoutes(application, resources);

application.listen(Config.server.port);
