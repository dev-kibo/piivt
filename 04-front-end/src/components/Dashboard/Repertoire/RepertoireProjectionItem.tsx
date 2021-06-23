import React from "react";

interface IMovieRoleItemProps {
  cinemaName: string;
  movieName: string;
  uid: string;
  onRemove: (uid: string) => void;
}

export default function RepertoireProjectionItem({
  cinemaName,
  movieName,
  uid,
  onRemove,
}: IMovieRoleItemProps) {
  return (
    <div className="d-flex justify-content-between border p-2 my-3 mt-md-0">
      <p className="m-0">
        {cinemaName} - {movieName}
      </p>
      <button
        type="button"
        className="btn-close"
        onClick={() => onRemove(uid)}
      ></button>
    </div>
  );
}
