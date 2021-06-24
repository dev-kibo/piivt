import Ajv from "ajv";

const IDeleteProjectionValidator = new Ajv().compile({
  type: "array",
  items: {
    type: "object",
    properties: {
      projectionId: {
        type: "integer",
        minimum: 1,
      },
    },
    required: ["projectionId"],
    additionalProperties: false,
  },
});

export default IDeleteProjectionValidator;
