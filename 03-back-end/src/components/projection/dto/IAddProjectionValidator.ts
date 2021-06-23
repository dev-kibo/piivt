import Ajv from "ajv";

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

export default IAddProjectionValidator;
