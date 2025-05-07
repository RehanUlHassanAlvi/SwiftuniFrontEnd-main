import React from "react";
import {
  Avatar3,
  AnnunceMainDiv,
  AnnunceSubDiv,
  VIPText,
  AnnounceDateText,
  PurchasedText,
} from "./style";
import UserImg from "../../assets/images/navuser.svg";

const AnnouncementCard = ({ MainText, SubText, date }) => {
  return (
    <AnnunceMainDiv>
      <AnnunceSubDiv>
        <Avatar3 src={UserImg} alt="user" />
        <div>
          <VIPText>{MainText}</VIPText>
          <PurchasedText>{SubText}</PurchasedText>
        </div>
      </AnnunceSubDiv>
      <AnnounceDateText>{date}</AnnounceDateText>
    </AnnunceMainDiv>
  );
};

export default AnnouncementCard;
