import Ajv from "ajv";

interface IRefreshToken {
  refreshToken: string;
}

const IRefreshTokenValidator = new Ajv().compile({
  type: "object",
  properties: {
    refreshToken: {
      type: "string",
    },
  },
  required: ["refreshToken"],
  additionalProperties: false,
});

export { IRefreshToken, IRefreshTokenValidator };
