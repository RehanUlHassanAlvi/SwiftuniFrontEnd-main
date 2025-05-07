import React from "react";

const DescribeImageCard = ({ srcImage, onImageLoad }) => {
  return (
    <div
      style={{
        width: "100%",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "10px",
          "@media (max-width: 500px)": {
            padding: "10px 0px",
          },
        }}
      >
        <img
          src={srcImage}
          alt=""
          onLoad={onImageLoad}
          style={{ maxWidth: "700px", height: "400px" }}
        />
      </div>
    </div>
  );
};

export default DescribeImageCard;
