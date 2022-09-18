import React from "react";
import "./Error.css";
import notFound from "../../assets/notFound.gif";

const Error = () => {
  return (
    <div className="error-wrapper">
      <img src={notFound} alt="" />
      <span>Error 404. Page not found !</span>
    </div>
  );
};

export default Error;
