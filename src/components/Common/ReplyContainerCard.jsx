// ReplyContainer.js

import React from "react";
import { useMediaQuery } from "@mui/material";
import {
  CommentUserImg,
  CommentUserName,
  CommentTime,
  CommentText,
  CommentImg,
  CommentActionBtn,
  LikeActionBtn,
  MyWorkTime,
} from "./Style";
import { FlexDiv } from "../../assets/styles/style";
import Delete from "../../assets/images/Delete.svg";
import Like from "../../assets/images/Like.svg";
import UserAvatar from "../../assets/images/user-avatar.png";

const ReplyContainerCard = ({
  reply,
  storedUserId,
  deleteComment,
  handleImageClick,
  toggleLike,
  enlargedImageId,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <FlexDiv
      style={{
        width: "93.9%",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        borderTop: "1px solid #E8E8E8",
        padding: "0.5rem 0rem 0.5rem 0.5rem",
      }}
    >
      <FlexDiv
        style={{
          gap: isMobile ? "0.5rem" : "0.63rem",
          marginLeft: isMobile ? "0.75rem" : "0rem",
          alignItems: "flex-start",
        }}
      >
        <CommentUserImg
          alt="User Image"
          src={reply.UserImageUrl || UserAvatar}
        />
        <FlexDiv
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <FlexDiv style={{ gap: "0.38rem" }}>
            <CommentUserName>{reply.UserName}</CommentUserName>
            <CommentTime>
              {new Date(reply.CreatedAt).toLocaleString("en-PK", {
                timeZone: "Asia/Karachi",
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </CommentTime>
          </FlexDiv>
          <CommentText>{reply.Reply}</CommentText>
          {reply.ReplyImg && (
            <CommentImg
              src={reply.ReplyImg}
              alt="Comment Attachment"
              className={
                enlargedImageId === `${reply.ReplyId}-${reply.ReplyImg}`
                  ? "enlarged"
                  : ""
              }
              onClick={() => handleImageClick(reply.ReplyId, reply.ReplyImg)}
            />
          )}
        </FlexDiv>
      </FlexDiv>

      <FlexDiv
        style={{
          gap: isMobile ? "0.5rem" : "0.63rem",
          marginRight: isMobile ? "0.75rem" : "1.25rem",
        }}
      >
        {storedUserId === reply.UserId && (
          <CommentActionBtn
            alt="Delete Reply"
            src={Delete}
            onClick={() => deleteComment(reply.ReplyId)}
          />
        )}
        <LikeActionBtn
          alt={reply.IsLiked ? "Unlike Comment" : "Like Comment"}
          src={Like}
          liked={reply.IsLiked}
          onClick={() => toggleLike(reply.ReplyId, reply.IsLiked)}
        />
        {reply.TotalLikes > 0 && <MyWorkTime> {reply.TotalLikes} </MyWorkTime>}
      </FlexDiv>
    </FlexDiv>
  );
};

export default ReplyContainerCard;
