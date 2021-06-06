import Ajv from "ajv";

interface IUpdateActor {
  firstName: string;
  middleName?: string | null;
  lastName: string;
}

const IUpdateActorValidator = new Ajv().compile({
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

export { IUpdateActor, IUpdateActorValidator };
