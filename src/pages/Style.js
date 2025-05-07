import styled from "@emotion/styled";

export const modalStyle = {
  overlay: {
    zIndex: 1002,
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    background: "none",
  },
  content: {
    border: "none",
    background: "transparent",
    inset: "0px",
    padding: "20px 1%",
  },
};

export const ModalStyleFlex = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 2% 2%;
  z-index: 1002;
`;

export const SWT_QCard_Div = styled.div`
  width: 86%;
  margin: 0rem 7% 1.25rem;
  @media (max-width: 1440px) {
    width: 90%;
    margin: 0rem 5% 1.25rem;
  }
  @media (max-width: 1000px) {
    width: 94%;
    margin: 0rem 3% 1.25rem;
  }
`;

export const SWT_MCQCard_Div = styled.div`
  width: 86%;
  margin: 0rem 7% 1.25rem;
  @media (max-width: 1440px) {
    width: 90%;
    margin: 0rem 5% 1.25rem;
  }
  @media (max-width: 1000px) {
    width: 94%;
    margin: 0rem 3% 1.25rem;
  }
`;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export const NavBlock = styled.div`
  height: 80px;
  width: 100vw;
  @media (max-width: 1000px) {
    display: none;
  }
`;