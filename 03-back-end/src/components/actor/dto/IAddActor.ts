import Ajv from "ajv";

interface IAddActor {
  firstName: string;
  middleName?: string;
  lastName: string;
}

const ajv = new Ajv();

const IAddActorValidator = ajv.compile({
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      maxLength: 64,
    },
    middleName: {
      type: "string",
      minLength: 1,
      maxLength: 64,
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

export { IAddActor, IAddActorValidator };
