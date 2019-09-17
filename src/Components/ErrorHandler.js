import React from "react";

export default function ErrorHandler({ status, data }) {
  return (
    <div className="error-message">
      <p>
        {status ? status : 404} : {data ? data.msg : "Page not found"}
      </p>
    </div>
  );
}
