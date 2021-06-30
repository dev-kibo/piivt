import Ajv from "ajv";

interface IAddMovie {
  title: string;
  description: string;
  releasedAt: Date;
  duration: number;
}

const IAddMovieValidator = new Ajv({ coerceTypes: true }).compile({
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

export { IAddMovie, IAddMovieValidator };
