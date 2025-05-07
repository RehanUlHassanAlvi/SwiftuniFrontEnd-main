import React from "react";
import Modal from "react-modal";
import { PopupHeader, PopupHeaderText, PopupWhiteDiv, WhiteDivText } from "../components/AppearedCount/style";
import CancelIcon from "../assets/images/carbon_close-filled.svg";
import { FlexDiv } from "../assets/styles/style";
import BrowserIcon from '../assets/images/Browser.svg';

const modalStyle = {
  overlay: {
    zIndex: 1002,
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: 'blur(5px)',
    background: "none",
  },
  content: {
    border: "none",
    background: "transparent",
    inset: "0px",
    padding: "20px 1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const BrowserNotSupported = ({open=false, close=()=>{}}) => {

  return (
    <>
      <Modal isOpen={open} style={modalStyle}>
        <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            <PopupHeader>
            <FlexDiv style={{ width: "95%", justifyContent: "flex-end" }}>
                <img
                    src={CancelIcon}
                    alt=""
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    onClick={() => close(false)}
                />
            </FlexDiv>      
            <PopupHeaderText>Alert</PopupHeaderText>
            </PopupHeader>
            <PopupWhiteDiv>
                <img alt="" src={BrowserIcon} style={{marginTop:'1rem'}} />
                <WhiteDivText style={{fontWeight:'600', fontSize:'20px', textAlign:'center'}}>
                    Browser Not Supported
                </WhiteDivText>
                <WhiteDivText style={{textAlign:'center'}}> 
                    You seem to be using an unsupported browser & it may affect the performance of some features (including AI) on this website. Please switch to Google Chrome for a better user experience.
                </WhiteDivText>
            </PopupWhiteDiv>
        </div>
      </Modal>
    </>
  );
};

export default BrowserNotSupported;
