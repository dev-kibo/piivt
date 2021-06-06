import Ajv from "ajv";

interface IAddCinema {
  name: string;
}

const ajv = new Ajv();

const IAddCinemaValidator = ajv.compile({
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

export { IAddCinema, IAddCinemaValidator };
