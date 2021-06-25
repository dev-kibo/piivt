import React from "react";
import useFetchActor from "../../../hooks/useFetchActor";

interface IMovieRoleItemProps {
  actorId: number;
  role: string;
  uid: string;
  onRemove: (uid: string) => void;
}

export default function MovieRoleItem({
  actorId,
  role,
  uid,
  onRemove,
}: IMovieRoleItemProps) {
  const [actor] = useFetchActor(actorId);

  return (
    <div className="d-flex justify-content-between border p-2 my-3 mt-md-0">
      <p className="m-0">
        {actor?.firstName} {actor?.middleName} {actor?.lastName} ... {role}
      </p>
      <button
        type="button"
        className="btn-close"
        onClick={() => onRemove(uid)}
      ></button>
    </div>
  );
}
