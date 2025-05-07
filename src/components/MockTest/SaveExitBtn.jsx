import React, { useState } from 'react';

function SaveExitBtn({ disabled, handleExit }) {
  const [hover, setHover] = useState(false);

  // Inline style object based on hover state
  const buttonStyle = {
    backgroundColor: hover && !disabled ? "#e0e1e5" : "#f2f3f7",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontFamily: "Noto Sans",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: hover && !disabled ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
    transform: hover && !disabled ? "translateY(-2px)" : "none",
    transition: "box-shadow 0.3s ease, transform 0.3s ease"
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleExit}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
    >
      Save & Exit
    </button>
  );
}

export default SaveExitBtn;
