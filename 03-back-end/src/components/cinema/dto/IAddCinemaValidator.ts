import Ajv from "ajv";

const IAddCinemaValidator = new Ajv().compile({
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 64,
    },
  },
  required: ["name"],
  additionalProperties: false,
});

export default IAddCinemaValidator;
