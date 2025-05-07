import React, { useEffect, useState } from "react";
import {
  AnswerBtn,
  ButtonListDiv,
  InputDiv,
  InputField,
  PurpleBtn,
  TokenDiv,
} from "./Style";
import { Btn, FlexDiv } from "../../assets/styles/style";
import { useMediaQuery } from "@mui/material";
import CircularProgress from "../Login/CircularLoader";
import TokenImg from '../../assets/images/Token.svg';
import { useLocation } from 'react-router-dom';
import { Base_URL } from "../../Client/apiURL";
import axios from "axios";
import Modal from "react-modal";
import { PopupHeader, PopupWhiteDiv, SubscribePopupBtn, WhiteDivText } from "../../components/AppearedCount/style";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { useNavigate } from "react-router-dom";

const modalStyle = {
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const ButtonList = ({
  onSubmit,
  onRedo,
  onAnswer,
  onScript,
  canSubmit,
  renderAnswer = true,
  explanation = false,
  renderScript = false,
  isSubmitted = false,
  isLoading = false,
  urlLoading = false,
  onNext,
  onPrevious,
  hasPrevious,
  hasNext,
  setSearchTerm,
  searchTerm = "",
}) => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const [searchValue, setSearchValue] = useState("");
  const [tokensData, setTokensData] = useState(null);
  const [open, isOpen] = useState(false);
  const location = useLocation();  
  const userData = JSON.parse(localStorage.getItem("userData"));
  // const shouldDisableSubmit = isLoading || isSubmitted;
  const navigate = useNavigate();

  const handleSubtract = async () => {
    try {
      let locationPath = location.pathname;
      let tokenType;
      if(locationPath.includes('speaking')){
        tokenType = 'speaking';
      }else{
        if(locationPath.includes('summarize-written-text') || locationPath.includes('summarize-spoken-text') || locationPath.includes('write-from-dictation') || locationPath.includes("write-essay") || locationPath.includes('write-email')){        
          tokenType = 'writing';
        } else{
          tokenType = 'non-ai';
        }
      }  
      const response = await axios.post(
        `${Base_URL}/app/users/subtract-tokens`,
        {
          type: tokenType,
        },
        {
          withCredentials: true,
        }
      );    
      if(locationPath.includes('speaking')){
        setTokensData((prevTokensData) => ({
          ...prevTokensData,
          SpeakingTokens: prevTokensData.SpeakingTokens - 1,
        }));      
      }else{
        if(locationPath.includes('summarize-written-text') || locationPath.includes('summarize-spoken-text') || locationPath.includes('write-from-dictation') || locationPath.includes("write-essay") || locationPath.includes('write-email')){
          setTokensData((prevTokensData) => ({
            ...prevTokensData,
            WritingTokens: prevTokensData.WritingTokens - 1,
          }));  
        }else{     
          setTokensData((prevTokensData) => ({
            ...prevTokensData,
            NonAITokens: prevTokensData.NonAITokens - 1,
          }));
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const submitAnswer = () => {
    let locationPath = location.pathname;
    let answer = canSubmit();
    let tokenCounter;
    if (!answer) {
      if(locationPath.includes('speaking')){
        tokenCounter = tokensData.SpeakingTokens;
      }else{
        if(locationPath.includes('summarize-written-text') || locationPath.includes('summarize-spoken-text') || locationPath.includes('write-from-dictation') || locationPath.includes("write-essay") || locationPath.includes('write-email')){
          tokenCounter = tokensData.WritingTokens;
        }else{
          tokenCounter = tokensData.NonAITokens;
        }
      }  

      if(userData.SubscriptionEndTimeUTC){
        onSubmit();
      }else if(tokenCounter > 0 && userData.PortalId === 1){
        onSubmit();
        handleSubtract();        
      }else{
        isOpen(true);
      }
    }
  };

  const getTokenCount = () => {
    let locationPath = location.pathname;
    if(tokensData != null) {
      if(locationPath.includes('speaking')){
        return tokensData.SpeakingTokens;
      }else{
        if(locationPath.includes('summarize-written-text') || locationPath.includes('summarize-spoken-text') || locationPath.includes('write-from-dictation') || locationPath.includes("write-essay") || locationPath.includes('write-email')){
          return tokensData.WritingTokens;
        }
        return tokensData.NonAITokens;
      }
    }else{
      return '';
    }
  }

  useEffect(() => {
    setSearchValue(searchTerm);
  }, [searchTerm]);

  const onSearchInputChange = (event) => {
    setSearchValue(event.target.value);
    setSearchTerm(event.target.value); // remove this line then search should be only on click.
  };

  const onSearchButtonClick = () => {
    setSearchTerm(searchValue);
  };

  const fetchTokens = async () => {
    try {
      const response = await axios.get(`${Base_URL}/app/users/check-tokens`);
      setTokensData(response.data.response);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

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
                onClick={() => isOpen(false)}
            />
        </FlexDiv>      
        </PopupHeader>
        <PopupWhiteDiv>
            {userData?.PortalId === 1 ?
            <>
            <WhiteDivText style={{fontWeight:'600', fontSize:'20px', textAlign:'center'}}>
                No token available
            </WhiteDivText>
            <WhiteDivText style={{textAlign:'center'}}> 
              You have zero tokens available. You need atleast one token to submit. Please purchase subscription.
            </WhiteDivText>
            <SubscribePopupBtn
              onClick={()=> {
                navigate("/sidebar", { state: { section:'Plan Info'} });
              }}            
            >
              Subscribe
            </SubscribePopupBtn>
            </>
            :
            <WhiteDivText style={{textAlign:'center'}}> 
              Ask your portal owner to subscribe your account.
            </WhiteDivText>            
            }
        </PopupWhiteDiv>
        </div>
    </Modal>    
    <ButtonListDiv>
      <FlexDiv
        style={{
          justifyContent: "space-between",
          flexDirection: isTab ? "column" : "",
          alignItems: isTab ? "flex-start" : "",
          gap: isTab ? "1rem" : "",
        }}
      >
        <FlexDiv
          style={{
            gap: isTab ? "0.75rem" : "1.25rem",
          }}
        >
          <Btn
            disabled={
              canSubmit() ||
              isLoading ||
              urlLoading ||
              !canSubmit ||
              isSubmitted
            }
            onClick={submitAnswer}
          >
            {isLoading || urlLoading ? (
              <PurpleBtn
                disabled={
                  canSubmit() || urlLoading || !canSubmit || isSubmitted
                }
              >
                <CircularProgress disableShrink size={18} />
                {isLoading ? " Loading Ai Score..." : "Wait..."}
              </PurpleBtn>
            ) : (
              <PurpleBtn
                disabled={
                  canSubmit() ||
                  isLoading ||
                  urlLoading ||
                  !canSubmit ||
                  isSubmitted
                }
                style={{ opacity: canSubmit() ? "0.8" : "" }}
              >
                {isSubmitted ? "Submitted" : "Submit"}
              </PurpleBtn>
            )}
          </Btn>
          <PurpleBtn onClick={onRedo}>Re-do</PurpleBtn>
          {renderAnswer && (
            <AnswerBtn
              onClick={onAnswer}
              style={{
                border: "1px solid var(--Brand-Purple, #996CFE)",
                background: "none",
                color: "#996CFE",
                maxHeight: "40px",
              }}
            >
              Answer
            </AnswerBtn>
          )}
          {renderScript && (
            <AnswerBtn
              onClick={onScript}
              style={{
                border: "1px solid var(--Brand-Purple, #996CFE)",
                background: "none",
                color: "#996CFE",
                maxHeight: "40px",
              }}
            >
              {explanation ? "Explanation" : "Script"}
            </AnswerBtn>
          )}
        </FlexDiv>
        <FlexDiv
          style={{
            gap: isTab ? "0.75rem" : "1.25rem",
          }}
        >
          {(!isTab && !userData.IsSubscribed && userData.PortalId === 1) &&
            <TokenDiv>
              <img src={TokenImg} alt="" style={{width:'20px'}} />
              <div>
                X {getTokenCount()}
              </div>
            </TokenDiv>
          }
          <InputDiv>
            <InputField
              placeholder="Search question"
              value={searchValue}
              onChange={onSearchInputChange}
            />
            <PurpleBtn onClick={onSearchButtonClick}>Search</PurpleBtn>
          </InputDiv>
          <PurpleBtn onClick={onPrevious} disabled={!hasPrevious}>
            Previous
          </PurpleBtn>
          <PurpleBtn onClick={onNext} disabled={!hasNext}>
            Next
          </PurpleBtn>
        </FlexDiv>
      </FlexDiv>
      {(isTab && !userData.IsSubscribed && userData.PortalId === 1) &&
      <TokenDiv style={{marginTop:'1rem'}}>
        <img src={TokenImg} alt="" style={{width:'20px'}} />
        <div>
          X {getTokenCount()}
        </div>
      </TokenDiv>
      }
    </ButtonListDiv>
    </>
  );
};

export default ButtonList;
