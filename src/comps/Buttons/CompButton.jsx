import React from "react";

function CompButton({ children, onClick, onKeyPress }) {
  const btnStyle = {
    backgroundColor: "pink",
  };
  return (
    <button style={btnStyle} onClick={onClick} onKeyPress={onKeyPress}>
      {children}
    </button>
  );
}

export default CompButton;
