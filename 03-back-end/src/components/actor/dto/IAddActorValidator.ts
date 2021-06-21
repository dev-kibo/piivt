import Ajv from "ajv";

const IAddActorValidator = new Ajv().compile({
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      maxLength: 64,
    },
    middleName: {
      type: "string",
    },
    lastName: {
      type: "string",
      minLength: 1,
      maxLength: 64,
    },
  },
  required: ["firstName", "lastName"],
  additionalProperties: false,
});

export default IAddActorValidator;
