import React, { useState, useEffect, useRef } from "react";
import {
  ActionBtn,
  ButtonListDiv,
  GrayLineDiv,
  MyScoreText,
  MyWorkBlueDiv,
  MyWorkBlueDivImg,
  MyWorkBlueDivText,
  MyWorkImg,
  MyWorkRedDiv,
  MyWorkRedDivText,
  MyWorkSmallBlueDiv,
  MyWorkSmallRedDiv,
  MyWorkUserName,
  MyWorkTime,
  ShowScoreDiv,
  ShowMoreBtnDiv,
  ShowMoreBtn,
  ForumPurpleDiv,
  CommentSubBtn,
  ShowCommentDiv,
  ReplyContainer,
  CommentImg,
  CommentText,
  CommentUserName,
  CommentTime,
  CommentUserImg,
  CommentActionBtn,
  ShowCategory,
  CategoryButton,
  ViewAllBtn,
  LikeActionBtn,
  HistoryAndComments,
  MyScoreShowDiv,
} from "./Style";
import { FlexDiv } from "../../assets/styles/style";
import UserImg from "../../assets/images/navuser.svg";
import AI_Score from "../../assets/images/WritingAIScore.svg";
import Download from "../../assets/images/download-icon.svg";
import Delete from "../../assets/images/Delete.svg";
import Comment from "../../assets/images/Comment.svg";
import Like from "../../assets/images/Like.svg";
import { useMediaQuery } from "@mui/material";
import UserAvatar from "../../assets/images/user-avatar.png";
import Modal from "react-modal";
import AddCommentPopup from "./AddCommentPopup";
import SnackbarAlert from "../Login/SnackbarAlert";
import LoadingModal from "../Common/LoadingModal";
import ReplyContainerCard from "./ReplyContainerCard";
import CommentContainerCard from "./CommentContainerCard";
import AddCommentPopupSH from "./AddCommentPopupSH";
import ScoreHistoryCommentsCard from "./ScoreHistoryCommentsCard";
import ScoreHistory from "./ScoreHistory";
import { Base_URL } from "../../Client/apiURL";

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

const CommunityScore = ({
  is_ptecore = false,
  ai_score = true,
  bg = "#868EAF",
  formateScore = true,
  totalScore = "00.00",
  testQuestionTableId,
  onSelectMyScore,
  lastScoreUpdate,
  renderDownloadIcon = false,
  ScoreLetter,
  testSubmissionInProcess = false,
}) => {
 
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:800px)");
  const [isLoading, setIsLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedSection, setSelectedSection] = useState("My Work");
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  // const [userData, setUserData] = useState(null);
  const [storedUserImage, setStoredUserImage] = useState(null);
  const [storedUserId, setStoredUserId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [open, setOpen] = useState(false);
  const [commentActionType, setCommentActionType] = useState("");
  const [comment, setComment] = useState("");
  const [commentFile, setCommentFile] = useState("");
  const [commentCategory, setCommentCategory] = useState("Forum");
  const [commentsData, setCommentsData] = useState([]);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [visibleComments, setVisibleComments] = useState(4);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [loadingReplies, setLoadingReplies] = useState({});
  const [enlargedImageId, setEnlargedImageId] = useState(null);
  const [commentCardOpen, setCommentCardOpen] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);


  const lastScoreUpdateRef = useRef(lastScoreUpdate);

  const fetchScoreHistory = async (
    testQuestionTableId,
    is_ptecore,
    page,
    selectedSection,
    Date
  ) => {
    setIsLoading(true);
    let api;
    if (selectedSection === "Community") {
      api = `${Base_URL}/app/users/attempted-questions/get-attempted-question-of-users-by-questionid?question_id=${testQuestionTableId}&is_ptecore=${is_ptecore}&page=${page}`;
    } else {
      api = `${Base_URL}/app/users/attempted-questions/get-attempted-question-by-questionid?question_id=${testQuestionTableId}&is_ptecore=${is_ptecore}&page=${page}`;
    }

    try {
      const response = await fetch(api, { credentials: "include" });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: status ${response.status}`);
      }
      const data = await response.json();
      const attemptedQuestionData = data.response[0];

      if (!attemptedQuestionData || attemptedQuestionData.AttemptedAnswers.length === 0) {
        setHasMoreData(false); // No more history available
        return;
      }

      const attemptedQuestionsWithInfo =  attemptedQuestionData.AttemptedAnswers.map((answer) => ({
          ...answer,
          ...(attemptedQuestionData.OptionNames && {
            OptionNames: attemptedQuestionData.OptionNames,
          }),
          ...(attemptedQuestionData.AnswerNames && {
            AnswerNames: attemptedQuestionData.AnswerNames,
          }),
        }));

      if (page === 1) {
        setAttemptedQuestions(attemptedQuestionsWithInfo);
      } else {
        setAttemptedQuestions((prev) => [
          ...prev,
          ...attemptedQuestionsWithInfo,
        ]);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (testQuestionTableId) {

      const isNewSubmission = lastScoreUpdate !== lastScoreUpdateRef.current;

      if(isNewSubmission){
        setPage(1);
        setAttemptedQuestions([]);
        setHasMoreData(true);
      }

      fetchScoreHistory(
        testQuestionTableId,
        is_ptecore,
        page,
        selectedSection,
        Date.now()
      );

      lastScoreUpdateRef.current = lastScoreUpdate;
    }
  }, [testQuestionTableId, is_ptecore, page, selectedSection, lastScoreUpdate]);

  const handleDelete = async (attemptedQuestionId) => {
    const api = `${Base_URL}/app/users/attempted-questions/delete-attempted-question-of-user-by-attempted-questionid?attempted_question_id=${attemptedQuestionId}`;

    try {
      const response = await fetch(api, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: status ${response.status}`);
      }

      setAttemptedQuestions((prevItems) =>
        prevItems.filter(
          (item) => item.AttemptedQuestionId !== attemptedQuestionId
        )
      );
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleMyScoreClick = (score) => {
    onSelectMyScore(score, true);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setAttemptedQuestions([]);
    setPage(1);
    setHasMoreData(true);
  };

  // useEffect(() => {
  //   setAttemptedQuestions([]);
  //   setPage(1);
  // }, [selectedSection]);

  useEffect(() => {
    setPage(1);
    setAttemptedQuestions([]);
  }, [testQuestionTableId]);

  useEffect(() => {
    const storedUserDataString = localStorage.getItem("userData");
    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);
      if (storedUserData && storedUserData.UserName) {
        // setUserData(storedUserData.UserName);
        setStoredUserId(storedUserData.UserId);
        setStoredUserImage(storedUserData.ImageUrl);
      }
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("comment-popup");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (selectedSection === "Forum") {
      getComments();
    }
  }, [testQuestionTableId, selectedSection]);

  const getComments = async () => {
    if (!testQuestionTableId) {
      return;
    }
    
    try {
      const response = await fetch(
        `${Base_URL}/app/users/comments?test_question_id=${testQuestionTableId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200 && data.response) {
        setCommentsData(data.response);
        initializeReplyVisibility(data.response);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  useEffect(() => {
    setCommentsData([]);
    getComments();
  }, [testQuestionTableId]);

  const AddComment = async () => {
    setCommentsLoading(true);
    try {
      if (!comment.trim()) {
        console.error("Please write comment!");
        setSnackbarMessage("Please write comment!");
        setSnackbarVariant("outlined");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
        return;
      }

      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("comment_img", commentFile);
      formData.append("category", commentCategory);
      formData.append("test_question_id", testQuestionTableId);

      const response = await fetch(
        `${Base_URL}/app/users/comments/add`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        getComments();
        setOpen(false);
        setSnackbarMessage(data.message || "Comment Saved Successfully");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const AddCommentReply = async (parentCommentId) => {
    setCommentsLoading(true);
    try {
      if (!comment.trim()) {
        console.error("Please write comment!");
        setSnackbarMessage("Please write comment!");
        setSnackbarVariant("outlined");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
        return;
      }

      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("comment_img", commentFile);
      formData.append("category", commentCategory);
      formData.append("test_question_id", testQuestionTableId);
      formData.append("parent_id", parentCommentId);

      const response = await fetch(
        `${Base_URL}/app/users/comments/add`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        getComments();
        setOpen(false);
        setSnackbarMessage(data.message || "Comment Saved Successfully");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/comments/delete?comment_id=${commentId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        // getComments();

        setCommentsData((prevComments) => prevComments.filter((comment) => comment.CommentId !== commentId));

        setSnackbarMessage(data.message || "Comment Deleted Successfully");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
        // setShowDeleteBtn(false);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const initializeReplyVisibility = (comments) => {
    const initialRepliesVisibility = {};
    comments.forEach((comment) => {
      initialRepliesVisibility[comment.CommentId] = 2;
    });
    setVisibleReplies(initialRepliesVisibility);
  };

  const showMoreComments = () => {
    setVisibleComments((prev) => prev + 4);
  };

  const showAllReplies = (commentId) => () => {
    if (visibleReplies[commentId] > 2) {
      setTimeout(() => {
        setVisibleReplies((prev) => ({ ...prev, [commentId]: 2 }));
      }, 200);
    } else {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
      setTimeout(() => {
        setVisibleReplies((prev) => ({
          ...prev,
          [commentId]: Number.MAX_SAFE_INTEGER,
        }));
        setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
      }, 500);
    }
  };

  const handleToggleVisibility = (questionId) => {
    setVisibleReplies((prevReplies) => ({
      ...prevReplies,
      [questionId]: prevReplies[questionId] > 2 ? 2 : Number.MAX_SAFE_INTEGER,
    }));
  };

  const handleImageClick = (imageOwnerID, imageID) => {
    const uniqueImageId = `${imageOwnerID}-${imageID}`;
    setEnlargedImageId(
      enlargedImageId === uniqueImageId ? null : uniqueImageId
    );
  };

  const toggleLike = async (commentId, isLiked) => {
    const method = isLiked ? "DELETE" : "GET";
    const endpoint = `${Base_URL}/app/users/comments/likes?comment_id=${commentId}`;

    try {
      const response = await fetch(endpoint, {
        method: method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.responseCode === 200) {
        getComments();
      } else {
        throw new Error(`Failed to toggle like: ${response.status}`);
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  const toggleLikeScoreHistory = async (id, isLiked) => {
    const method = isLiked ? "DELETE" : "GET";
    const endpoint = `${Base_URL}/app/users/attempted-questions/like?attempted_question_id=${id}`;
    try {
      const response = await fetch(endpoint, {
        method: method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.responseCode === 200) {
        await fetchScoreHistory(
          testQuestionTableId,
          is_ptecore,
          page,
          selectedSection,
          Date.now()
        );
      } else {
        throw new Error(`Failed to toggle like: ${response.status}`);
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  const toggleLikeScoreHistoryComment = async (id, isLiked) => {
    const method = isLiked ? "DELETE" : "GET";
    const endpoint = isLiked
      ? `${Base_URL}/app/users/attempted-questions/comments/likes?comment_id=${id}`
      : `${Base_URL}/app/users/attempted-questions/comments/likes?attempted_questions_comment_id=${id}`;

    try {
      const response = await fetch(endpoint, {
        method: method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.responseCode === 200) {
        await fetchScoreHistory(
          testQuestionTableId,
          is_ptecore,
          page,
          selectedSection,
          Date.now()
        );
      } else {
        throw new Error(`Failed to toggle like: ${response.status}`);
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  const AddScoreHistoryComment = async (parentCommentId) => {
    setCommentsLoading(true);
    try {
      if (!comment.trim()) {
        console.error("Please write comment!");
        setSnackbarMessage("Please write comment!");
        setSnackbarVariant("outlined");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
        return;
      }

      const formData = new FormData();
      formData.append("attempted_questions_comment", comment);
      formData.append("attempted_question_id", parentCommentId);

      const response = await fetch(
        `${Base_URL}/app/users/attempted-questions/comments/add`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        await fetchScoreHistory(
          testQuestionTableId,
          is_ptecore,
          page,
          selectedSection,
          Date.now()
        );
        setCommentCardOpen(false);
        setSnackbarMessage(data.message || "Comment Saved Successfully");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const deleteScoreHistoryComment = async (commentId) => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/attempted-questions/comments/delete?comment_id=${commentId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {

        await fetchScoreHistory(
          testQuestionTableId,
          is_ptecore,
          page,
          selectedSection,
          Date.now()
        );

        setSnackbarMessage(data.message || "Comment Deleted Successfully");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
        // setShowDeleteBtn(false);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      <Modal isOpen={commentCardOpen} style={modalStyle}>
        <AddCommentPopupSH
          close={() => {
            setCommentCardOpen(false);
            setParentCommentId(null);
          }}
          setComment={setComment}
          onSubmit={() => {
            if (parentCommentId) {
              AddScoreHistoryComment(parentCommentId);
            }
          }}
        />
      </Modal>
      {commentsLoading && <LoadingModal />}
      <Modal isOpen={open} style={modalStyle}>
        <AddCommentPopup
          close={() => {
            setOpen(false);
            setCommentActionType("");
            setParentCommentId(null);
          }}
          setComment={setComment}
          setCommentFile={setCommentFile}
          setCommentCategory={setCommentCategory}
          onSubmit={() => {
            if (commentActionType === "addComment") {
              AddComment();
            } else if (
              commentActionType === "addCommentReply" &&
              parentCommentId
            ) {
              AddCommentReply(parentCommentId);
            }
          }}
        />
      </Modal>

      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      <ButtonListDiv>
        <FlexDiv
          style={{
            justifyContent: "flex-start",
            gap: "2.75rem",
          }}
        >
          <MyScoreText
            onClick={() => handleSectionClick("My Work")}
            style={{
              marginLeft: "1.25rem",
              color:
                selectedSection === "My Work"
                  ? "var(--Brand-Purple, #996CFE)"
                  : "",
            }}
            selected={selectedSection === "My Work"}
          >
            My Work
          </MyScoreText>
          <MyScoreText
            onClick={() => handleSectionClick("Community")}
            style={{
              color:
                selectedSection === "Community"
                  ? "var(--Brand-Purple, #996CFE)"
                  : "",
            }}
            selected={selectedSection === "Community"}
          >
            Community
          </MyScoreText>
          <MyScoreText
            onClick={() => handleSectionClick("Forum")}
            style={{
              color:
                selectedSection === "Forum"
                  ? "var(--Brand-Purple, #996CFE)"
                  : "",
            }}
            selected={selectedSection === "Forum"}
          >
            Forum
          </MyScoreText>
        </FlexDiv>
        <GrayLineDiv></GrayLineDiv>

        {selectedSection === "My Work" && (
          <>
            {attemptedQuestions.map((score, index) => (
              <HistoryAndComments key={score.CreatedAt}>
                <ScoreHistory
                  score={score}
                  isMobile={isMobile}
                  bg={bg}
                  formateScore={formateScore}
                  totalScore={totalScore}
                  ScoreLetter={ScoreLetter}
                  handleMyScoreClick={handleMyScoreClick}
                  handleDelete={handleDelete}
                  setCommentCardOpen={setCommentCardOpen}
                  setParentCommentId={setParentCommentId}
                  toggleLikeScoreHistory={toggleLikeScoreHistory}
                  storedUserImage={storedUserImage}
                  ai_score={ai_score}
                  renderDownloadIcon={renderDownloadIcon}
                  selectedSection={selectedSection}
                  testSubmissionInProcess={testSubmissionInProcess}
                />

                {score.Comments && score.Comments.slice(0, visibleReplies[score.AttemptedQuestionId] || 2).map((comment) => (
                  <ScoreHistoryCommentsCard
                    key={comment.CommentId}
                    comments={{
                      UserName: comment.UserName || "Anonymous",
                      UserImageUrl: comment.UserImage,
                      comment: comment.Comment,
                      CreatedAt: comment.CreatedAt,
                      UserId: comment.UserId,
                      IsLiked: comment.IsLiked,
                      CommentId: comment.CommentId,
                    }}
                    storedUserId={storedUserId}
                    deleteComment={deleteScoreHistoryComment}
                    toggleLikeScoreHistoryComment={toggleLikeScoreHistoryComment}
                  />
                ))}

                {score.Comments && score.Comments.length > 2 && (
                  <FlexDiv
                    style={{
                      paddingBottom: "0.7rem",
                      alignSelf: "flex-start",
                    }}
                  >
                    <ViewAllBtn onClick={() =>handleToggleVisibility(score.AttemptedQuestionId)}>
                      {loadingReplies[score.AttemptedQuestionId] &&
                      visibleReplies[score.AttemptedQuestionId] <= 2
                        ? "Loading..."
                        : visibleReplies[score.AttemptedQuestionId] > 2
                        ? "View Less"
                        : "View All"}
                    </ViewAllBtn>
                  </FlexDiv>
                )}
              </HistoryAndComments>
            ))}

            {hasMoreData && attemptedQuestions.length > 3 && (
              <ShowMoreBtnDiv>
                <ShowMoreBtn onClick={handleShowMore} disabled={isLoading}>
                  Show More
                </ShowMoreBtn>
              </ShowMoreBtnDiv>
            )}
          </>
        )}

        {selectedSection === "Community" && (
          <>
            {attemptedQuestions.map((score, index) => (
              <>
                <HistoryAndComments key={score.CreatedAt}>
                  <ScoreHistory
                    score={score}
                    isMobile={isMobile}
                    bg={bg}
                    formateScore={formateScore}
                    totalScore={totalScore}
                    ScoreLetter={ScoreLetter}
                    handleMyScoreClick={handleMyScoreClick}
                    handleDelete={handleDelete}
                    setCommentCardOpen={setCommentCardOpen}
                    setParentCommentId={setParentCommentId}
                    toggleLikeScoreHistory={toggleLikeScoreHistory}
                    ai_score={ai_score}
                    renderDownloadIcon={renderDownloadIcon}
                    selectedSection={selectedSection}
                    testSubmissionInProcess={testSubmissionInProcess}
                  />

                  {score.Comments && score.Comments.slice(0, visibleReplies[score.AttemptedQuestionId] || 2).map((comment) => (
                    <ScoreHistoryCommentsCard
                      key={comment.CommentId}
                      comments={{
                        UserName: comment.UserName || "Anonymous",
                        UserImageUrl: comment.UserImage,
                        comment: comment.Comment,
                        CreatedAt: comment.CreatedAt,
                        UserId: comment.UserId,
                        IsLiked: comment.IsLiked,
                        CommentId: comment.CommentId,
                      }}
                      storedUserId={storedUserId}
                      deleteComment={deleteScoreHistoryComment}
                      toggleLikeScoreHistoryComment={
                        toggleLikeScoreHistoryComment
                      }
                    />
                  ))}

                  {score.Comments && score.Comments.length > 2 && (
                    <FlexDiv
                      style={{
                        paddingBottom: "0.7rem",
                        alignSelf: "flex-start",
                      }}
                    >
                      <ViewAllBtn
                        onClick={() =>
                          handleToggleVisibility(score.AttemptedQuestionId)
                        }
                      >
                        {loadingReplies[score.AttemptedQuestionId] &&
                        visibleReplies[score.AttemptedQuestionId] <= 2
                          ? "Loading..."
                          : visibleReplies[score.AttemptedQuestionId] > 2
                          ? "View Less"
                          : "View All"}
                      </ViewAllBtn>
                    </FlexDiv>
                  )}
                </HistoryAndComments>
              </>
            ))}

            {hasMoreData && attemptedQuestions.length > 3 && (
              <ShowMoreBtnDiv>
                <ShowMoreBtn onClick={handleShowMore} disabled={isLoading}>
                  Show More
                </ShowMoreBtn>
              </ShowMoreBtnDiv>
            )}
          </>
        )}

        {selectedSection === "Forum" && (
          <>
            <ForumPurpleDiv>
              <CommentSubBtn
                onClick={() => {
                  setCommentActionType("addComment");
                  setParentCommentId(null);
                  setOpen(true);
                }}
              >
                Comment
              </CommentSubBtn>
              {commentsData.slice(0, visibleComments).map((data) => (
                <ShowCommentDiv key={data.commentId}>
                  <CommentContainerCard
                    key={data.CommentId}
                    commentData={data}
                    storedUserId={storedUserId}
                    deleteComment={deleteComment}
                    setCommentActionType={setCommentActionType}
                    setParentCommentId={setParentCommentId}
                    setOpen={setOpen}
                    handleImageClick={handleImageClick}
                    toggleLike={toggleLike}
                    enlargedImageId={enlargedImageId}
                    isMobile={isMobile}
                  />

                  {data.Replies &&
                    data.Replies.slice(
                      0,
                      visibleReplies[data.CommentId] || 2
                    ).map((reply) => (
                      <ReplyContainerCard
                        key={reply.ReplyId}
                        reply={reply}
                        storedUserId={storedUserId}
                        deleteComment={deleteComment}
                        handleImageClick={handleImageClick}
                        toggleLike={toggleLike}
                        enlargedImageId={enlargedImageId}
                      />
                    ))}

                  {data.Replies && data.Replies.length > 2 && (
                    <ViewAllBtn onClick={showAllReplies(data.CommentId)}>
                      {loadingReplies[data.CommentId] &&
                      visibleReplies[data.CommentId] <= 2
                        ? "Loading..."
                        : visibleReplies[data.CommentId] > 2
                        ? "View Less"
                        : "View All"}
                    </ViewAllBtn>
                  )}
                </ShowCommentDiv>
              ))}

              {commentsData.length > visibleComments && (
                <ShowMoreBtn onClick={showMoreComments}>
                  {isLoading ? "Loading..." : "Show More"}
                </ShowMoreBtn>
              )}
            </ForumPurpleDiv>
          </>
        )}
      </ButtonListDiv>
    </>
  );
};

export default CommunityScore;
