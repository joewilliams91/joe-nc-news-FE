import React from "react";

export default function CommentSort({ commentSort, selectedParams }) {
  const sortBy = event => {
    const sort = JSON.parse(event.target.value);
    commentSort(sort);
  };
  return (
    <div>
      <form>
        <select onChange={sortBy} value={JSON.stringify(selectedParams)}>
          <option value={JSON.stringify({})}>--Sort by--</option>
          <option
            value={JSON.stringify({ sort_by: "created_at", order: "desc" })}
          >
            --Newest to oldest--
          </option>
          <option
            value={JSON.stringify({ sort_by: "created_at", order: "asc" })}
          >
            --Oldest to newest--
          </option>
          <option value={JSON.stringify({ sort_by: "votes", order: "desc" })}>
            --Vote count: high to low--
          </option>
          <option value={JSON.stringify({ sort_by: "votes", order: "asc" })}>
            --Vote count: low to high--
          </option>
        </select>
      </form>
    </div>
  );
}
