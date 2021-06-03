export default interface IConfig {
  server: {
    port: number;
    static: {
      path: string;
      route: string;
      cacheControl: boolean;
      dotFiles: string;
      etag: boolean;
      maxAge: number;
      index: boolean;
    };
  };
  logger: {
    path: string;
  };
}
