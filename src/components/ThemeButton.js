import React from "react";

const ThemeButton = ({ change }) => {
  return (
    <button onClick={change}>
      Change theme
    </button>
  );
};

export default ThemeButton;