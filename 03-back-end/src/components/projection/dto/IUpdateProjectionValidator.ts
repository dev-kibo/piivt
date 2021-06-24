import Ajv from "ajv";

const IUpdateProjectionValidator = new Ajv({ coerceTypes: true }).compile({
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
    projectionId: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["cinemaId", "movieId", "projectionId"],
  additionalProperties: false,
});

export default IUpdateProjectionValidator;
