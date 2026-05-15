import React from "react";
import md5 from "blueimp-md5";

const Gravatar = ({ email, size = 40, className = "" }) => {
  const cleanEmail = email ? email.trim().toLowerCase() : "";
  const hash = md5(cleanEmail);
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;

  return (
    <img
      src={gravatarUrl}
      alt="User Avatar"
      className={className}
      style={{ borderRadius: "50%" }}
    />
  );
};

export default Gravatar;
