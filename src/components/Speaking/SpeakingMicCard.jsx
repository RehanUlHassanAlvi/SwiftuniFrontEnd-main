import React, { useState, useEffect, useRef } from "react";
import {
  SMCmainDiv,
  SpeakingMicCardDiv,
  MicRoundBackground,
  DoneText,
  PlayRecordingCardDiv,
  PlayRecordingCardText,
  RecordingAndVisualizingDiv,
  MicInputDiv,
  WaveformContainer,
  AudioPlayer as CustomAudio,
  UseHeadSetDiv,
  UseHeadSetText,
  RecordingSliderDiv,
  RecordingSlider,
} from "./styles";
import MicImage from "../../assets/images/Mic.svg";
import WaveSurfer from "wavesurfer.js";
import InfoIcon from "../../assets/images/info-icon-3.svg";
import { FlexDiv } from "../../assets/styles/style";
import { useMediaQuery } from "@mui/material";
import { MediaRecorder } from "extendable-media-recorder";
import { setupWavEncoder } from "./wavEncoderSetup";
import Typography from "@mui/material/Typography";
import ReactAudioPlayer from "react-audio-player";
import { playBeep } from "./data";

const isWavFile = (blob) => {
  return blob.type === "audio/wav";
};

const SpeakingMicCard = ({
  setSelectedAnswers,
  resetTrigger,
  setCanSubmit,
  setRecordedAudio,
  setRecordedWavFile,
  autoStartRecording = false,
  resetAutoStart,
  handleRecordingStart,
  handleRecordingStop,
  totalTestTime,
  isAudioCompleted = false,
  isAudioPlayerComponent = false,
  isReTellLecture = false,
  postAudioPlayTestCountdownTime,
}) => {
  const isLaptop = useMediaQuery("(max-width:1100px)");
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [showWaveform, setShowWaveform] = useState(false);
  const audioRef = useRef(new Audio());
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const waveformRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const [transcript, setTranscript] = useState("");
  const recordingTimeoutRef = useRef(null);
  const startDelayTimeoutRef = useRef(null);
  const [isRecordingHasCompleted, setIsRecordingHasCompleted] = useState(false);
  const lastClickRef = useRef(Date.now());
  const streamRef = useRef(null);
  const [currentRecordingTime, setCurrentRecordingTime] = useState(0);
  const maxRecordingTime = totalTestTime;

  useEffect(() => {
    const shouldStartRecording = isAudioPlayerComponent ? autoStartRecording && isAudioCompleted : autoStartRecording;

    if (shouldStartRecording) {
      startRecording();
    }
    return () => {
      resetAutoStart();
    };
  }, [autoStartRecording, isAudioCompleted]);

  useEffect(() => {
    setupWavEncoder();
  }, []);

  useEffect(() => {
    setSelectedAnswers(transcript);
  }, [transcript]);

  useEffect(() => {
    const stoppingTheRecording = async () => {
      if (isRecording) {
        await stopRecording();
      }
    };

    const handleReset = async () => {
      await stoppingTheRecording();

      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      resetAutoStart();
      setRecordedAudio("");
      setAudioUrl("");
      setTranscript("");
      setShowWaveform(false);
      setIsRecordingHasCompleted(false);
      audioChunksRef.current = [];

      if (waveformRef.current) {
        waveformRef.current.destroy();
        waveformRef.current = null;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
      }

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    handleReset();
  }, [resetTrigger]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (showWaveform && audioUrl) {
      waveformRef.current = WaveSurfer.create({
        container: "#waveform",
        waveColor: "grey",
        progressColor: "#996cfe",
        backgroundColor: "transparent",
        height: 100,
        barWidth: 0,
        cursorWidth: 1,
        cursorColor: "black",
        responsive: true,
        hideScrollbar: true,
        normalize: true,
      });

      waveformRef.current.load(audioUrl);
      waveformRef.current.setVolume(0);

      const playHandler = () => waveformRef.current.play();
      const pauseHandler = () => waveformRef.current.pause();
      const seekedHandler = () => {
        if (audioRef.current && waveformRef.current) {
          waveformRef.current.seekTo(
            audioRef.current.currentTime / audioRef.current.duration
          );
        }
      };

      audioRef.current.addEventListener("play", playHandler);
      audioRef.current.addEventListener("pause", pauseHandler);
      audioRef.current.addEventListener("seeked", seekedHandler);

      return () => {
        if (waveformRef.current) {
          waveformRef.current.destroy();
          waveformRef.current = null;
        }

        if (audioRef.current) {
          audioRef.current.removeEventListener("play", playHandler);
          audioRef.current.removeEventListener("pause", pauseHandler);
          audioRef.current.removeEventListener("seeked", seekedHandler);
        }
      };
    }
  }, [showWaveform, audioUrl]);

  useEffect(() => {
    if (audioUrl) {
      setRecordedAudio(audioUrl);
      if (waveformRef.current) {
        waveformRef.current.load(audioUrl);
      }
    }
  }, [audioUrl]);

  const startSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        console.log("Voice recognition started. Speak into the microphone.");
      };

      recognition.onresult = (event) => {
        let interim_transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setTranscript((prevTranscript) => prevTranscript + event.results[i][0].transcript + " ");
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      recognition.onend = () => {
        speechRecognitionRef.current = null;
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
      return recognition;
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  };

  const startRecording = async (cancelDelay = false) => {
    if (
      isRecording ||
      isRecordingHasCompleted ||
      speechRecognitionRef.current
    ) {
      console.log("Recording or speech recognition already in progress.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/wav",
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      if (isReTellLecture && !cancelDelay) {
        startDelayTimeoutRef.current = setTimeout(() => {
          startRecordingProcess(mediaRecorder, stream);
        }, postAudioPlayTestCountdownTime);
      } else {
        clearTimeout(startDelayTimeoutRef.current);
        startRecordingProcess(mediaRecorder, stream);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const startRecordingProcess = (mediaRecorder, stream) => {
    if (!stream.active) {
      console.error("Stream is no longer active.");
      return;
    }

    mediaRecorder.start();
    setIsRecording(true);
    setIsRecordingHasCompleted(false);
    handleRecordingStart();
    console.log("Recording started");

    playBeep(850, 200, 0.5);

    const audioContext = new window.AudioContext();
    // || window.webkitAudioContext
    const source = audioContext.createMediaStreamSource(stream);
    analyserRef.current = audioContext.createAnalyser();
    source.connect(analyserRef.current);

    startSpeechRecognition();

    recordingTimeoutRef.current = setTimeout(() => {
      console.log(
        "Total test time passed, automatically stopping the recording."
      );
      stopRecording();
    }, totalTestTime);

    draw();
    setCanSubmit(false);
  };

  const stopRecording = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      console.log("Stopping recording...");
      playBeep(700, 300, 0.3);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      setIsRecording(false);
      setIsRecordingHasCompleted(true);
      handleRecordingStop();
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav",});

        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);

        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          setShowWaveform(true);
        }

        setCanSubmit(true);

        if (isWavFile(audioBlob)) {
          setRecordedWavFile(audioBlob);
        }
        console.log("Recording stopped and processed.");
      };
    }

    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      speechRecognitionRef.current = null;
    }
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = (width / 255) * 2.5;
    const maxHeight = height * 0.7;
    let barHeight;
    let x = 0;

    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      x = 0;
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * maxHeight;

        const r = barHeight + 25 * (i / bufferLength);
        const g = 250 * (i / bufferLength);
        const b = 50;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
      animationRef.current = requestAnimationFrame(renderFrame);
    };
    renderFrame();
  };

  const toggleRecording = async () => {
    if (Date.now() - lastClickRef.current < 1500) return;
    lastClickRef.current = Date.now();

    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording(true);
    }
  };

  useEffect(() => {
    let intervalId;
    if (isRecording) {
      intervalId = setInterval(() => {
        setCurrentRecordingTime((prevTime) => {
          const newTime = prevTime + 100;
          if (newTime <= maxRecordingTime) {
            return newTime;
          } else {
            clearInterval(intervalId);
            return maxRecordingTime;
          }
        });
      }, 100);
    } else {
      setCurrentRecordingTime(0);
    }

    return () => clearInterval(intervalId);
  }, [isRecording, maxRecordingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  return (
    <>
      <SMCmainDiv>
        <SpeakingMicCardDiv>
          {showWaveform ? (
            <WaveformContainer id="waveform" />
          ) : (
            <RecordingAndVisualizingDiv>
              <DoneText>
                {isRecording ? "Recording" : audioUrl ? "Done" : "Start"}
              </DoneText>
              <MicRoundBackground onClick={toggleRecording}>
                <img
                  src={MicImage}
                  alt={isRecording ? "Stop Recording" : "Start Recording"}
                />
              </MicRoundBackground>
              {!isRecording && (
                <FlexDiv
                  style={{
                    width: "100%",
                    justifyContent: isLaptop ? "" : "flex-end",
                    marginTop: isLaptop ? "" : "-2rem",
                  }}
                >
                  <UseHeadSetDiv isRecording={isRecording}>
                    <img src={InfoIcon} alt="" />
                    <UseHeadSetText>
                      Use a headset with inline microphone to get accurate AI
                      scores
                    </UseHeadSetText>
                  </UseHeadSetDiv>
                </FlexDiv>
              )}

              <MicInputDiv>
                <canvas ref={canvasRef} width="30" height="130"></canvas>
              </MicInputDiv>

              {isRecording && (
                <RecordingSliderDiv>
                  <Typography variant="body2">
                    {formatTime(currentRecordingTime)}
                  </Typography>
                  <RecordingSlider
                    value={currentRecordingTime}
                    min={0}
                    step={100}
                    max={maxRecordingTime}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="off"
                    sx={{ mx: 2, flex: 1, my: "-4.5px" }}
                  />
                  <Typography variant="body2">
                    {formatTime(maxRecordingTime)}
                  </Typography>
                </RecordingSliderDiv>
              )}
            </RecordingAndVisualizingDiv>
          )}
        </SpeakingMicCardDiv>

        <PlayRecordingCardDiv>
          <CustomAudio style={{ display: audioUrl ? "block" : "none" }}>
            <div style={{marginTop: '5px'}}>
              <audio controls ref={audioRef}>
                <source src={audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </CustomAudio>
          <PlayRecordingCardText>
            AI Scoring and Audio Answer is available after submission.
          </PlayRecordingCardText>
        </PlayRecordingCardDiv>
      </SMCmainDiv>
    </>
  );
};

export default SpeakingMicCard;
