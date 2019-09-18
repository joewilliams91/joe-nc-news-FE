import React from "react";

export default function ErrorHandler({ status, data }) {
  return (
    <div className="error-message">
      <div className="error-message-box">
      <p>
        {status ? status : 404} : {data ? data.msg : "Page not found"}
      </p>
      </div>
     
    </div>
  );
}
