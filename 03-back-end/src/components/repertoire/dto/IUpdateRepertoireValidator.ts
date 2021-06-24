import Ajv from "ajv";

const IUpdateRepertoireValidator = new Ajv({ coerceTypes: true }).compile({
  type: "object",
  properties: {
    startsAt: {
      type: "string",
    },
    projections: {
      type: "array",
      items: {
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
      },
    },
  },
  required: ["startsAt", "projections"],
  additionalProperties: false,
});

export default IUpdateRepertoireValidator;
