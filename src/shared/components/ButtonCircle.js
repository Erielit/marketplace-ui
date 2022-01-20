import React from "react";
import FeatherIcon from "feather-icons-react";
import "../button-circle.css";

export const ButtonCircle = ({ type, onClickFunct, icon = "" }) => {
  return (
    <button className={"btn btn-circle " + type} onClick={onClickFunct}>
      {icon !== "" && <FeatherIcon icon={icon} />}
    </button>
  );
};
