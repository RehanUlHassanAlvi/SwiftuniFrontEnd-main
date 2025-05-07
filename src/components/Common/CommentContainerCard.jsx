

import React from 'react';
import { CommentUserImg, CommentUserName, CommentTime, CommentText, CommentImg, CommentActionBtn, LikeActionBtn, ShowCategory } from './Style'; // Ensure you import all necessary components and styles
import { FlexDiv } from "../../assets/styles/style";
import Delete from "../../assets/images/Delete.svg";
import Comment from "../../assets/images/Comment.svg";
import Like from "../../assets/images/Like.svg";
import UserAvatar from "../../assets/images/user-avatar.png";

const CommentContainerCard = ({
  commentData,
  storedUserId,
  deleteComment,
  setCommentActionType,
  setParentCommentId,
  setOpen,
  handleImageClick,
  toggleLike,
  enlargedImageId,
  isMobile
}) => {
  return (
    <FlexDiv style={{ width: "100%", flexDirection: "column" }}>
      <FlexDiv style={{ width: "100%", justifyContent: "space-between" }}>
        <FlexDiv style={{
          gap: isMobile ? "0.5rem" : "0.63rem",
          marginLeft: isMobile ? "0.75rem" : "1.25rem",
          alignItems: "flex-start"
        }}>
          <CommentUserImg alt="User Image" src={commentData.UserImageUrl || UserAvatar} />
          <FlexDiv style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <FlexDiv style={{ gap: "0.38rem" }}>
              <CommentUserName>{commentData.UserName}</CommentUserName>
              <CommentTime>
                {new Date(commentData.CreatedAt).toLocaleString(
                  "en-PK", {
                    timeZone: "Asia/Karachi",
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </CommentTime>
              {commentData.Category !== "Forum" && (
                <ShowCategory bg={commentData.Category === "New Ques" ? "#FF6666" : undefined}>
                  {commentData.Category}
                </ShowCategory>
              )}
            </FlexDiv>
            <CommentText style={{marginBottom: "0.3rem"}}>{commentData.Comment}</CommentText>
            {commentData.CommentImg && (
              <CommentImg
                src={commentData.CommentImg}
                alt="Comment Attachment"
                className={enlargedImageId === `${commentData.CommentId}-${commentData.CommentImg}` ? "enlarged" : ""}
                onClick={() => handleImageClick(commentData.CommentId, commentData.CommentImg)}
                style={{marginBottom: "0.4rem"}}
              />
            )}
          </FlexDiv>
        </FlexDiv>

        <FlexDiv style={{
          gap: isMobile ? "0.5rem" : "0.63rem",
          marginRight: isMobile ? "0.75rem" : "1.25rem",
          alignItems: "flex-start"
        }}>
          {storedUserId === commentData.UserId && (
            <CommentActionBtn alt="Delete Comment" src={Delete} onClick={() => deleteComment(commentData.CommentId)} />
          )}
          <CommentActionBtn
            alt="Comment Reply"
            src={Comment}
            onClick={() => {
              setCommentActionType("addCommentReply");
              setParentCommentId(commentData.CommentId);
              setOpen(true);
            }}
          />
          <LikeActionBtn
            alt={commentData.IsLiked ? "Unlike Comment" : "Like Comment"}
            src={Like}
            liked={commentData.IsLiked}
            onClick={() => toggleLike(commentData.CommentId, commentData.IsLiked)}
          />
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export default CommentContainerCard;
