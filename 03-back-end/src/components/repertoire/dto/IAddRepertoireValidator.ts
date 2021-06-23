import Ajv from "ajv";

const IAddRepertoireValidator = new Ajv().compile({
  type: "object",
  properties: {
    startsAt: {
      type: "string",
    },
    projections: {
      type: "array",
      minItems: 1,
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
        },
      },
    },
  },
  required: ["startsAt", "projections"],
  additionalProperties: false,
});

export default IAddRepertoireValidator;
