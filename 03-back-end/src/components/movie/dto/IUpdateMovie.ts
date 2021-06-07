import Ajv from "ajv";

interface IUpdateMovie {
  title: string;
  description: string;
  releasedAt: Date;
  duration: number;
}

const IUpdateMovieValidator = new Ajv({ coerceTypes: true }).compile({
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    description: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    releasedAt: {
      type: "string",
    },
    duration: {
      type: "integer",
    },
  },
  required: ["title", "description", "releasedAt", "duration"],
  additionalProperties: false,
});

export { IUpdateMovie, IUpdateMovieValidator };
