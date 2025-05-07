import React, { useState, useEffect, useRef } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import {
  APStyledCard,
  APStyledBox1,
  APStyledBox2,
  APStyledIconBtn,
  APStyledAudioSlider,
  APStyledVolumeSlider,
  APStyledSelectSpeed,
  APStyledSelectLanguage,
  StyledVolumeIconBtn,
  StyledDurationBox,
  StyledDurationDiv,
  MenuItemsSpeed,
  MenuItemsLanguage,
} from "./styles";
import { debounce } from "lodash";

const PauseButtonSx = {
  fontSize: 25,
  // backgroundColor: 'black'
};

const playButtonSx = {
  fontSize: 25,
};

const volumeIconSx = {
  width: "27px",
  height: "28px",
  color: "#9A9AAF",
};

const dropdownIconStyle = {
  color: "#9A9AAF",
  width: "30px",
  height: "30px",
  marginRight: "5px",
};

const AudioPlayer = ({
  AudioObjects = [],
  preTestCountdownTime = 2500,
  onAudioComplete,
  resetTrigger,
  isAudioPlayerDisabled = false,
  audioRef,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [audioSpeaker, setAudioSpeaker] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [preTestCountdown, setPreTestCountdown] =
    useState(preTestCountdownTime);

  const internalAudioRef = useRef(null);
  const UseAudioRef = audioRef || internalAudioRef;

  const isReady = useRef(false);

  useEffect(() => {
    if (resetTrigger) {
      setIsPlaying(false);
      setPreTestCountdown(preTestCountdownTime + 500);
    } else {
      setPreTestCountdown(preTestCountdownTime);
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (AudioObjects.length > 0) {
      setAudioSpeaker(AudioObjects[0].audio_speaker);
      setAudioUrl(AudioObjects[0].audio_url || AudioObjects[0].url);
    }
  }, [AudioObjects]);

  useEffect(() => {
    const audio = UseAudioRef.current;

    if (audioUrl && audio) {
      audio.load();
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("Error playing audio:", err);
            setIsPlaying(false);
          });
      }

      const canPlayHandler = () => {
        setDuration(audio.duration);
        isReady.current = true;
      };

      audio.addEventListener("canplay", canPlayHandler);

      return () => {
        audio.removeEventListener("canplay", canPlayHandler);
      };
    }
  }, [audioUrl, resetTrigger]);

  useEffect(() => {
    const audio = UseAudioRef.current;
    if (audio) {
      audio.load();
      audio.pause();
      audio.currentTime = 0;

      const timer = setTimeout(() => {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("Error playing audio:", err));
      }, preTestCountdown);

      return () => {
        clearTimeout(timer);
        audio.pause();
      };
    }
  }, [audioUrl, resetTrigger, preTestCountdown]);

  useEffect(() => {
    const audio = UseAudioRef.current;
    if (audio) {
      const loadedMetadataHandler = () => {
        setDuration(audio.duration);
      };

      const timeUpdateHandler = () => {
        setCurrentTime(audio.currentTime);
      };

      const endedHandler = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (onAudioComplete) {
          onAudioComplete();
        }
      };

      const canPlayHandler = () => {
        isReady.current = true;
      };

      audio.addEventListener("loadedmetadata", loadedMetadataHandler);
      audio.addEventListener("timeupdate", timeUpdateHandler);
      audio.addEventListener("ended", endedHandler);
      audio.addEventListener("canplay", canPlayHandler);

      return () => {
        audio.removeEventListener("loadedmetadata", loadedMetadataHandler);
        audio.removeEventListener("timeupdate", timeUpdateHandler);
        audio.removeEventListener("ended", endedHandler);
        audio.removeEventListener("canplay", canPlayHandler);
      };
    }
  }, [UseAudioRef, onAudioComplete]);

  const handleSpeakerChange = (speaker, url) => {
    setAudioSpeaker(speaker);
    setAudioUrl(url);
  };

  const handlePlayPause = debounce((event) => {
    event.stopPropagation();
    event.preventDefault();

    if (isAudioPlayerDisabled) return;

    const audio = UseAudioRef.current;
    if (audio && isReady.current) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        if (audio.readyState >= 3) {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.error("Error playing audio:", err));
        }
      }
    }
  }, 150);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    UseAudioRef.current.volume = newValue / 100;
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
    UseAudioRef.current.playbackRate = parseFloat(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    if (isAudioPlayerDisabled) return;
    setCurrentTime(newValue);
    UseAudioRef.current.currentTime = newValue;
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const DropdownIcon = () =>
    isOpen ? (
      <ExpandLessIcon style={dropdownIconStyle} />
    ) : (
      <ExpandMoreIcon style={dropdownIconStyle} />
    );

  return (
    <APStyledCard>
      <APStyledBox1>
        <APStyledIconBtn
          id="playButton"
          onClick={handlePlayPause}
          disabled={isAudioPlayerDisabled}
        >
          {isPlaying && !isAudioPlayerDisabled ? (
            <PauseRoundedIcon sx={PauseButtonSx} />
          ) : (
            <PlayArrowRoundedIcon sx={playButtonSx} />
          )}
        </APStyledIconBtn>
        <audio ref={UseAudioRef} controls={false} preload="auto">
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
        <APStyledAudioSlider
          value={currentTime}
          min={0}
          max={duration}
          onChange={handleSliderChange}
          aria-labelledby="continuous-slider"
          disabled={isAudioPlayerDisabled}
        />
        <StyledDurationBox>
          <StyledDurationDiv>{formatTime(currentTime)}</StyledDurationDiv>
          <StyledDurationDiv>/</StyledDurationDiv>
          <StyledDurationDiv>{formatTime(duration)}</StyledDurationDiv>
        </StyledDurationBox>
      </APStyledBox1>

      <APStyledBox2>
        <StyledVolumeIconBtn
          onClick={toggleVolumeSlider}
          disabled={isAudioPlayerDisabled}
        >
          {volume > 0 ? (
            <VolumeUpRoundedIcon sx={volumeIconSx} />
          ) : (
            <VolumeOffRoundedIcon sx={volumeIconSx} />
          )}
        </StyledVolumeIconBtn>

        {showVolumeSlider && (
          <Box sx={{ display: "flex", alignItems: "center", width: "auto" }}>
            <APStyledVolumeSlider
              value={volume}
              onChange={handleVolumeChange}
              orientation={window.innerWidth <= 450 ? "vertical" : "horizontal"}
              disabled={isAudioPlayerDisabled}
            />
          </Box>
        )}

        <APStyledSelectSpeed
          value={speed}
          onChange={handleSpeedChange}
          isSliderOpenAndNarrowScreen={
            showVolumeSlider && window.innerWidth <= 450
          }
          disabled={isAudioPlayerDisabled}
        >
          <MenuItemsSpeed value={0.3}>x0.3</MenuItemsSpeed>
          <MenuItemsSpeed value={0.5}>x0.5</MenuItemsSpeed>
          <MenuItemsSpeed value={1}>x1.0</MenuItemsSpeed>
          <MenuItemsSpeed value={1.5}>x1.5</MenuItemsSpeed>
          <MenuItemsSpeed value={2.0}>x2.0</MenuItemsSpeed>
        </APStyledSelectSpeed>

        <APStyledSelectLanguage
          value={audioSpeaker}
          IconComponent={DropdownIcon}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          disabled={isAudioPlayerDisabled}
        >
          {AudioObjects.map((audioObj, index) => (
            <MenuItemsLanguage
              key={index}
              value={audioObj.audio_speaker}
              onClick={() =>
                handleSpeakerChange(
                  audioObj.audio_speaker,
                  audioObj.audio_url || audioObj.url
                )
              }
            >
              {audioObj.audio_speaker}
            </MenuItemsLanguage>
          ))}
        </APStyledSelectLanguage>
      </APStyledBox2>
    </APStyledCard>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default AudioPlayer;

// import React, { useState, useEffect, useRef } from "react";
// import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
// import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
// import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
// import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import Box from "@mui/material/Box";
// import {
//   APStyledCard,
//   APStyledBox1,
//   APStyledBox2,
//   APStyledIconBtn,
//   APStyledAudioSlider,
//   APStyledVolumeSlider,
//   APStyledSelectSpeed,
//   APStyledSelectLanguage,
//   StyledVolumeIconBtn,
//   StyledDurationBox,
//   StyledDurationDiv,
//   MenuItemsSpeed,
//   MenuItemsLanguage,
// } from "./styles";

// const PauseButtonSx = {
//   fontSize: 25,
// };

// const playButtonSx = {
//   fontSize: 25,
// };

// const volumeIconSx = {
//   width: "27px",
//   height: "28px",
//   color: "#9A9AAF",
// };

// const dropdownIconStyle = {
//   color: "#9A9AAF",
//   width: "30px",
//   height: "30px",
//   marginRight: "5px",
// };

// const AudioPlayer = ({
//   AudioObjects = [],
//   preTestCountdownTime = 2500,
//   onAudioComplete,
//   resetTrigger,
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(50);
//   const [speed, setSpeed] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [showVolumeSlider, setShowVolumeSlider] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [audioSpeaker, setAudioSpeaker] = useState("");
//   const [audioUrl, setAudioUrl] = useState("");
//   const [preTestCountdown, setPreTestCountdown] =
//     useState(preTestCountdownTime);

//   const audioRef = useRef(null);
//   const isReady = useRef(false);

//   useEffect(() => {
//     if (resetTrigger) {
//       setPreTestCountdown(preTestCountdownTime + 500);
//     } else {
//       setPreTestCountdown(preTestCountdownTime);
//     }
//   }, [resetTrigger]);

//   useEffect(() => {
//     if (AudioObjects.length > 0) {
//       setAudioSpeaker(AudioObjects[0].audio_speaker);
//       setAudioUrl(AudioObjects[0].audio_url || AudioObjects[0].url);
//     }
//   }, [AudioObjects]);

//   useEffect(() => {
//     const audio = audioRef.current;

//     if (audioUrl && audio) {
//       audio.load();
//       audio.pause();
//       audio.currentTime = 0;
//       setIsPlaying(false);

//       const playPromise = audio.play();
//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setIsPlaying(true);
//           })
//           .catch((err) => {
//             console.error("Error playing audio:", err);
//             setIsPlaying(false);
//           });
//       }

//       const canPlayHandler = () => {
//         setDuration(audio.duration);
//         isReady.current = true;
//       };

//       audio.addEventListener("canplay", canPlayHandler);

//       return () => {
//         audio.removeEventListener("canplay", canPlayHandler);
//       };
//     }
//   }, [audioUrl]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.load();
//       audio.pause();
//       audio.currentTime = 0;

//       const timer = setTimeout(() => {
//         audio
//           .play()
//           .then(() => setIsPlaying(true))
//           .catch((err) => console.error("Error playing audio:", err));
//       }, preTestCountdown);

//       return () => {
//         clearTimeout(timer);
//         audio.pause();
//       };
//     }
//   }, [audioUrl, resetTrigger, preTestCountdown]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       const loadedMetadataHandler = () => {
//         setDuration(audio.duration);
//       };

//       const timeUpdateHandler = () => {
//         setCurrentTime(audio.currentTime);
//       };

//       const endedHandler = () => {
//         setIsPlaying(false);
//         setCurrentTime(0);
//         if (onAudioComplete) {
//           onAudioComplete();
//         }
//       };

//       const canPlayHandler = () => {
//         isReady.current = true;
//       };

//       audio.addEventListener("loadedmetadata", loadedMetadataHandler);
//       audio.addEventListener("timeupdate", timeUpdateHandler);
//       audio.addEventListener("ended", endedHandler);
//       audio.addEventListener("canplay", canPlayHandler);

//       return () => {
//         audio.removeEventListener("loadedmetadata", loadedMetadataHandler);
//         audio.removeEventListener("timeupdate", timeUpdateHandler);
//         audio.removeEventListener("ended", endedHandler);
//         audio.removeEventListener("canplay", canPlayHandler);
//       };
//     }
//   }, [audioRef.current, onAudioComplete]);

//   const handleSpeakerChange = (speaker, url) => {
//     setAudioSpeaker(speaker);
//     setAudioUrl(url);
//   };

//   const handlePlayPause = (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     const audio = audioRef.current;
//     if (audio && isReady.current) {
//       if (isPlaying) {
//         audio.pause();
//         setIsPlaying(false);
//       } else {
//         if (audio.readyState >= 3) {
//           audio
//             .play()
//             .then(() => setIsPlaying(true))
//             .catch((err) => console.error("Error playing audio:", err));
//         }
//       }
//     }
//   };

//   const handleVolumeChange = (event, newValue) => {
//     setVolume(newValue);
//     audioRef.current.volume = newValue / 100;
//   };

//   const handleSpeedChange = (event) => {
//     setSpeed(event.target.value);
//     audioRef.current.playbackRate = parseFloat(event.target.value);
//   };

//   const handleSliderChange = (event, newValue) => {
//     setCurrentTime(newValue);
//     audioRef.current.currentTime = newValue;
//   };

//   const toggleVolumeSlider = () => {
//     setShowVolumeSlider(!showVolumeSlider);
//   };

//   const DropdownIcon = () =>
//     isOpen ? (
//       <ExpandLessIcon style={dropdownIconStyle} />
//     ) : (
//       <ExpandMoreIcon style={dropdownIconStyle} />
//     );

//   return (
//     <APStyledCard>
//       <APStyledBox1>
//         <APStyledIconBtn id="playButton" onClick={handlePlayPause}>
//           {isPlaying ? (
//             <PauseRoundedIcon sx={PauseButtonSx} />
//           ) : (
//             <PlayArrowRoundedIcon sx={playButtonSx} />
//           )}
//         </APStyledIconBtn>
//         <audio ref={audioRef} controls={false}>
//           <source src={audioUrl} type="audio/mpeg" />
//         </audio>
//         <APStyledAudioSlider
//           value={currentTime}
//           min={0}
//           max={duration}
//           onChange={handleSliderChange}
//           aria-labelledby="continuous-slider"
//         />
//         <StyledDurationBox>
//           <StyledDurationDiv>{formatTime(currentTime)}</StyledDurationDiv>
//           <StyledDurationDiv>/</StyledDurationDiv>
//           <StyledDurationDiv>{formatTime(duration)}</StyledDurationDiv>
//         </StyledDurationBox>
//       </APStyledBox1>

//       <APStyledBox2>
//         <StyledVolumeIconBtn onClick={toggleVolumeSlider}>
//           {volume > 0 ? (
//             <VolumeUpRoundedIcon sx={volumeIconSx} />
//           ) : (
//             <VolumeOffRoundedIcon sx={volumeIconSx} />
//           )}
//         </StyledVolumeIconBtn>

//         {showVolumeSlider && (
//           <Box sx={{ display: "flex", alignItems: "center", width: "auto" }}>
//             <APStyledVolumeSlider
//               value={volume}
//               onChange={handleVolumeChange}
//               orientation={window.innerWidth <= 450 ? "vertical" : "horizontal"}
//             />
//           </Box>
//         )}

//         <APStyledSelectSpeed
//           value={speed}
//           onChange={handleSpeedChange}
//           isSliderOpenAndNarrowScreen={
//             showVolumeSlider && window.innerWidth <= 450
//           }
//         >
//           <MenuItemsSpeed value={0.3}>x0.3</MenuItemsSpeed>
//           <MenuItemsSpeed value={0.5}>x0.5</MenuItemsSpeed>
//           <MenuItemsSpeed value={1}>x1.0</MenuItemsSpeed>
//           <MenuItemsSpeed value={1.5}>x1.5</MenuItemsSpeed>
//           <MenuItemsSpeed value={2.0}>x2.0</MenuItemsSpeed>
//         </APStyledSelectSpeed>

//         <APStyledSelectLanguage
//           value={audioSpeaker}
//           IconComponent={DropdownIcon}
//           onOpen={() => setIsOpen(true)}
//           onClose={() => setIsOpen(false)}
//         >
//           {AudioObjects.map((audioObj, index) => (
//             <MenuItemsLanguage
//               key={index}
//               value={audioObj.audio_speaker}
//               onClick={() =>
//                 handleSpeakerChange(
//                   audioObj.audio_speaker,
//                   audioObj.audio_url || audioObj.url
//                 )
//               }
//             >
//               {audioObj.audio_speaker}
//             </MenuItemsLanguage>
//           ))}
//         </APStyledSelectLanguage>
//       </APStyledBox2>
//     </APStyledCard>
//   );
// };

// const formatTime = (timeInSeconds) => {
//   const minutes = Math.floor(timeInSeconds / 60);
//   const seconds = Math.floor(timeInSeconds % 60);
//   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// };

// export default AudioPlayer;
