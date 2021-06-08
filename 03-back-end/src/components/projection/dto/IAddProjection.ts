import Ajv from "ajv";

interface IAddProjection {
  cinemaId: number;
  movieId: number;
}

const IAddProjectionValidator = new Ajv({ coerceTypes: true }).compile({
  type: "object",
  properties: {
    cinemaId: {
      type: "integer",
      minimum: 1,
    },
    movieId: {
      type: "integer",
      minimum: 1,
    },
  },
  required: ["cinemaId", "movieId", "startsAt", "endsAt"],
  additionalProperties: false,
});

export { IAddProjection, IAddProjectionValidator };
