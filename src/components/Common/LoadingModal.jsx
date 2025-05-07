import React from "react";
import styled from "styled-components";
import { ScaleLoader } from "react-spinners";
// import { BeatLoader } from "react-spinners";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

const LoadingModal = () => {
  return (
    <ModalWrapper>
      <ScaleLoader color="#996cfe" />
    </ModalWrapper>
  );
};

export default LoadingModal;
