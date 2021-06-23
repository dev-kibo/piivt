import React from "react";
import ActorModel from "../../../../../03-back-end/src/components/actor/model";

interface IMovieRoleItemProps {
  actor: ActorModel;
  role: string;
  uid: string;
  onRemove: (uid: string) => void;
}

export default function MovieRoleItem({
  actor,
  role,
  uid,
  onRemove,
}: IMovieRoleItemProps) {
  return (
    <div className="d-flex justify-content-between border p-2 my-3 mt-md-0">
      <p className="m-0">
        {actor.firstName} {actor?.middleName} {actor.lastName} ... {role}
      </p>
      <button
        type="button"
        className="btn-close"
        onClick={() => onRemove(uid)}
      ></button>
    </div>
  );
}
