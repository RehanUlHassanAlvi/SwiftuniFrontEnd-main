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

const PauseButtonSx = {
  fontSize: 25,
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


const TextToSpeechPlayer = ({
  AudioObjects = [],
  preTestCountdownTime = 2500,
  onAudioComplete,
  resetTrigger,
  utteranceText = "Testing Text for Text Utterance When No Audio URL Available.",
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

  const audioRef = useRef(null);
  const isReady = useRef(false);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!utteranceText) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    utteranceRef.current = new SpeechSynthesisUtterance(utteranceText);

    utteranceRef.current.onend = () => {
      if (onAudioComplete) onAudioComplete();
    };

    synthRef.current.speak(utteranceRef.current);

    return () => {
      // Cleanup: Stop any ongoing speech when component unmounts
      synthRef.current.cancel();
    };
  }, [utteranceText, resetTrigger]);

  useEffect(() => {
    if (resetTrigger) {
      setPreTestCountdown(preTestCountdownTime + 500);
    } else {
      setPreTestCountdown(preTestCountdownTime);
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (AudioObjects.length > 0) {
      setAudioSpeaker(AudioObjects[0].audio_speaker);
      setAudioUrl(AudioObjects[0].url || AudioObjects[0].audio_url);
    }
  }, [AudioObjects]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audioUrl && audio) {
      audio.load();
    }
  }, [audioUrl]);

  useEffect(() => {
    if (audioUrl) {
      handlePlayAudio();
    } else if (utteranceText) {
      handleSpeakText();
    }
  }, [audioUrl, utteranceText, resetTrigger]);

  const handlePlayAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
      audio.pause();
      audio.currentTime = 0;

      countdownTimerRef.current = setTimeout(() => {
        audio.play().then(() => setIsPlaying(true)).catch((err) => console.error("Error playing audio:", err));
      }, preTestCountdown);

      return () => {
        clearTimeout(countdownTimerRef.current);
        audio.pause();
      };
    }
  };

  const handleSpeakText = () => {
    if (!utteranceText || isPlaying) return; // Prevents multiple triggers

    countdownTimerRef.current = setTimeout(() => {
      synthRef.current.cancel(); // Ensure previous utterance is canceled
      utteranceRef.current = new SpeechSynthesisUtterance(utteranceText);
      utteranceRef.current.rate = speed;

      utteranceRef.current.onstart = () => {
        setIsPlaying(true);
      };

      utteranceRef.current.onend = () => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setCurrentTime(0);
        if (onAudioComplete) onAudioComplete();
      };

      synthRef.current.speak(utteranceRef.current);

      const estimatedDuration = utteranceText.length * 0.08;
      setDuration(estimatedDuration);

      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= estimatedDuration) { 
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);

    }, preTestCountdown);

    return () => {
      clearTimeout(countdownTimerRef.current);
      clearInterval(intervalRef.current);
      synthRef.current.cancel(); // Ensure utterance is canceled when stopping
    };
  };

  const handlePlayPause = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (audioUrl) {
      const audio = audioRef.current;
      if (audio && isReady.current) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      }
    } else if (utteranceText) {
      if (isPlaying) {
        synthRef.current.cancel();
        setIsPlaying(false);
        clearInterval(intervalRef.current); // Stop updating the slider
      } else {
        handleSpeakText();
      }
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
    if (audioRef.current) {
      audioRef.current.playbackRate = parseFloat(event.target.value);
    }
    if (utteranceRef.current) {
      utteranceRef.current.rate = parseFloat(event.target.value);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setCurrentTime(newValue);
    if (audioUrl && audioRef.current) {
      audioRef.current.currentTime = newValue;
    }
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
        <APStyledIconBtn id="playButton" onClick={handlePlayPause}>
          {isPlaying ? (
            <PauseRoundedIcon sx={PauseButtonSx} />
          ) : (
            <PlayArrowRoundedIcon sx={playButtonSx} />
          )}
        </APStyledIconBtn>
        <audio ref={audioRef} controls={false}>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
        <APStyledAudioSlider
          value={currentTime}
          min={0}
          max={duration}
          onChange={handleSliderChange}
          aria-labelledby="continuous-slider"
        />
        <StyledDurationBox>
          <StyledDurationDiv>{formatTime(currentTime)}</StyledDurationDiv>
          <StyledDurationDiv>/</StyledDurationDiv>
          <StyledDurationDiv>{formatTime(duration)}</StyledDurationDiv>
        </StyledDurationBox>
      </APStyledBox1>

      <APStyledBox2>
        <StyledVolumeIconBtn onClick={toggleVolumeSlider}>
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
            />
          </Box>
        )}

        <APStyledSelectSpeed
          value={speed}
          onChange={handleSpeedChange}
          isSliderOpenAndNarrowScreen={
            showVolumeSlider && window.innerWidth <= 450
          }
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
        >
          {AudioObjects.map((audioObj, index) => (
            <MenuItemsLanguage
              key={index}
              value={audioObj.audio_speaker}
              onClick={() =>
                handleSpeakerChange(audioObj.audio_speaker, audioObj.audio_url || audioObj.url)
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

export default TextToSpeechPlayer;