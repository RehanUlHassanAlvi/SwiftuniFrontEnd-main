import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery, Grid } from "@mui/material";
import SeperatingHeader from "../Common/SeperatingHeader";
import {
  OptionText,
  StretegyVideosDesc,
  VideoCard,
  VideoArea,
  VideoInfoDiv,
  VideoInfoText,
  VideoAuthorText,
  SpeakingButton,
  VideosDiv,
  VideosWhiteDiv,
} from "./Style";
import { Btn, FlexDiv } from "../../assets/styles/style";
import { APStyledIconBtn, APStyledIconBtnSV } from "../Speaking/styles";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { Options } from "./data";
import LoadingModal from "../Common/LoadingModal";
import { Base_URL } from "../../Client/apiURL";
import { ScrollableContainer } from "../../pages/Style";

const StrategyVid = () => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const [selectedOption, setSelectedOption] = useState("Speaking");
  const [strategyVideos, setStrategyVideos] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const videoRefs = useRef([]);

  const pteType = localStorage.getItem("pte-type") || "pte academic";
  const is_ptecore = pteType === "pte academic" ? false : true;

  useEffect(() => {
    fetchStrategyVideos();
  }, []);

  const fetchStrategyVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${Base_URL}/app/users/strategy-videos?core=${is_ptecore}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.responseCode === 200 && data.response) {
        setStrategyVideos(data.response);
      }
    } catch (error) {
      console.error("Error fetching strategy videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSortedVideosByCategory = () => {
    return strategyVideos
      .filter((video) => video.Category === selectedOption)
      .sort((a, b) => a.Priority - b.Priority);
  };

  const videoList = getSortedVideosByCategory();

  const handlePlayPause = (videoId, index) => {
    const videoElement = videoRefs.current[index];
    const isVideoPlaying = isPlaying[videoId] || false;

    if (!isVideoPlaying) {
      if (playingVideoId !== null) {
        const currentPlayingIndex = videoList.findIndex(
          (video) => video.Id === playingVideoId
        );
        if (
          currentPlayingIndex !== -1 &&
          videoRefs.current[currentPlayingIndex]
        ) {
          videoRefs.current[currentPlayingIndex].pause();
          setIsPlaying((prevState) => ({
            ...prevState,
            [playingVideoId]: false,
          }));
        }
      }
      videoElement.play();
      setPlayingVideoId(videoId);
      setIsPlaying((prevState) => ({
        ...prevState,
        [videoId]: true,
      }));
    } else {
      videoElement.pause();
      setIsPlaying((prevState) => ({
        ...prevState,
        [videoId]: false,
      }));
    }
  };

  const PauseButtonSx = {
    fontSize: 25,
  };

  const playButtonSx = {
    fontSize: 25,
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      {/* <ScrollableContainer
        style={{
          margin: isTab ? "1.5rem 0% 0rem" : "5rem 0% 0rem",
          height: isTab ? `calc(100vh - 1.5rem)` : `calc(100vh - 5rem)`,
        }}
      > */}
      <FlexDiv style={{ width: "100%" }}>
        <FlexDiv
          style={{
            flexDirection: "column",
            padding: isTab ? "1.5rem 2% 0rem" : "6.5rem 3% 0rem",
            // padding: isTab ? "0rem 2% 0rem" : "1.5rem 3% 0rem",
            maxWidth: "1680px",
            width: "100%",
          }}
        >
          <SeperatingHeader title="Strategy Videos" />
          <StretegyVideosDesc>
            Strategy Videos are in-depth visual demonstrations of how a
            particular question needs to be attempted. Each question type is
            explained in detail by an expert, breaking down Pearson’s marking
            criteria, examples, and tips to secure your desired score.
          </StretegyVideosDesc>
          <FlexDiv
            style={{
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "1.63rem",
            }}
          >
            <FlexDiv style={{ gap: isTab ? "1rem" : "2rem" }}>
              {Options.map((option) => (
                <Btn
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(option.text);
                  }}
                >
                  <OptionText
                    style={{
                      color:
                        option.text === selectedOption
                          ? "var(--Brand-Purple, #996CFE)"
                          : "",
                      borderBottom:
                        option.text === selectedOption
                          ? "1px solid var(--Brand-Purple, #996CFE)"
                          : "",
                    }}
                  >
                    {option.text}
                  </OptionText>
                </Btn>
              ))}
            </FlexDiv>
          </FlexDiv>

          <VideosWhiteDiv>
            <Grid container spacing={1} padding={4}>
              {videoList.length > 0 ? (
                videoList.map((video, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={video.Id}>
                    <VideoCard>
                      <VideoArea>
                        {video.Thumbnail ? (
                          <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            src={video.Thumbnail}
                            controls={true}
                            width="100%"
                            height="auto"
                          />
                        ) : (
                          <iframe
                            width="100%"
                            height="auto"
                            src={video.YtLink.replace("watch?v=", "embed/")}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.Title}
                            style={{ border: 0 }}
                          />
                        )}
                      </VideoArea>
                      <VideoInfoDiv>
                        <VideoInfoText>{video.Title}</VideoInfoText>
                        {video.Thumbnail && (
                          <APStyledIconBtnSV
                            id="playButton"
                            onClick={() => handlePlayPause(video.Id, index)}
                          >
                            {isPlaying[video.Id] ? (
                              <PauseRoundedIcon sx={PauseButtonSx} />
                            ) : (
                              <PlayArrowRoundedIcon sx={playButtonSx} />
                            )}
                          </APStyledIconBtnSV>
                        )}
                      </VideoInfoDiv>
                      <VideoAuthorText>{`Lecturer: ${video.Author}`}</VideoAuthorText>
                      <SpeakingButton>{video.Category}</SpeakingButton>
                    </VideoCard>
                  </Grid>
                ))
              ) : (
                <FlexDiv
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "#666",
                    width: "100%",
                  }}
                >
                  No videos available for this category
                </FlexDiv>
              )}
            </Grid>
          </VideosWhiteDiv>
        </FlexDiv>
      </FlexDiv>
      {/* </ScrollableContainer> */}
    </>
  );
};

export default StrategyVid;
