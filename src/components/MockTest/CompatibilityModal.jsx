import { useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AudioPlayer } from "../Speaking/styles";
import { MockBtn } from "./Style";
import Step5 from "./Step5";
import Sample from "../../assets/audios/sample.mp3";
import { PurpleBtn } from "../Common/Style";

export default function CompatibilityModal({ setOpen, test }) {
  const isMobile = useMediaQuery("(max-width:450px)");
  const [step, setStep] = useState(1);
  const audioRef = useRef(new Audio());
  const [IsRecording, setIsRecording] = useState(false);
  const MicAudioRef = useRef(new Audio());
  const [MicAudioUrl, setMicAudioUrl] = useState();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const speechRecognitionRef = useRef(null);
  const [transcript, setTranscript] = useState("");
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (IsRecording) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [IsRecording, time]);

  useEffect(() => {
    console.log("ts", transcript);
  }, [transcript]);

  const startRecording = async () => {
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
        setTranscript("");
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setTranscript(
              (prevTranscript) =>
                prevTranscript + event.results[i][0].transcript + " "
            );
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
      mediaRecorderRef.current = recognition;
    } else {
      console.log("Speech recognition not supported in this browser.");
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setMicAudioUrl(audioUrl);
        MicAudioRef.current.src = audioUrl;
        stream.getTracks().forEach((track) => track.stop());
      };

      setIsRecording(true);
    }
    // setCanSubmit(false);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Play audio
  const playAudio = () => {
    MicAudioRef.current.play();
    setIsPlaying(true);
  };

  // Pause audio
  const pauseAudio = () => {
    MicAudioRef.current.pause();
    setIsPlaying(false);
  };

  // Handle time update
  const handleTimeUpdate = () => {
    setCurrentTime(MicAudioRef.current.currentTime);
  };

  // Handle audio slider change
  const handleSliderChange = (event) => {
    const newTime = event.target.value;
    MicAudioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Load audio duration on mount and set event listeners
  useEffect(() => {
    if (MicAudioRef && MicAudioRef.current) {
      const audio = MicAudioRef.current;
      // console.log("duration", audio.duration);
      const setAudioData = () => {
        // console.log("dur", audio?.duration);
        setDuration(audio?.duration);
        setCurrentTime(0);
      };

      // audio.addEventListener("loadeddata", setAudioData);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("durationchange", setAudioData);
      audio.addEventListener("loadedmetadata", setAudioData);

      return () => {
        audio.removeEventListener("loadedmetadata", setAudioData);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("durationchange", setAudioData);
      };
    }
  }, [MicAudioRef.current, MicAudioUrl]);

  useEffect(() => {
    if (MicAudioUrl) {
      const audio = new Audio(MicAudioUrl);
      const updateDuration = () => {
        setDuration(audio.duration);
        console.log("Duration updated: ", audio.duration);
      };

      audio.addEventListener("loadedmetadata", updateDuration);

      return () => {
        audio.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [MicAudioUrl]);

  const stopSpeechRecognition = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      speechRecognitionRef.current = null;
      console.log("Speech recognition stopped.");
    }
  };

  const stopRecording = () => {
    stopSpeechRecognition();
    if (
      mediaRecorderRef.current &&
      typeof mediaRecorderRef.current.stop === "function"
    ) {
      mediaRecorderRef.current.stop();
      console.log("Stopped recording.");
      setIsRecording(false);
      //   cancelAnimationFrame(animationRef.current);

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setMicAudioUrl(audioUrl);
        MicAudioRef.current.src = audioUrl;
        // setCanSubmit(true);
      };
    }
  };

  const check = async () => {
    await startRecording();
  };

  return (
    <>
      {step === 1 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // gap: "200px",
            height: "100%",
          }}
        >
          <div style={{ fontSize: "18px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700 }}>Headset Check</h1>
            <p style={{ marginTop: "0px", fontWeight: 500 }}>
              This is an opportunity to check that your headset is working
              correctly.
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              1. Put your headset on and adjust it so that it fits comfortably
              over your ears
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              2. When you are ready, click on the [Play] button. You will hear a
              short recording
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              3. If you do not hear anything in your headphones while the status
              reads [Playing], raise your hand to get the attention of the Test
              Administrator
            </p>
            <AudioPlayer>
              <audio controls ref={audioRef}>
                <source src={Sample} type="audio/mp3" />
              </audio>
            </AudioPlayer>
            <p style={{ marginTop: "20px", fontWeight: 500 }}>
              · During the practice you will not have [Play] and [Stop] buttons.
              The audio recording will start playing automatically
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              · Please do not remove your headset. You should wear it throughout
              the test.
            </p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              // marginTop:"auto",
            }}
          >
            <p>{step}/5</p>
            <div>
              <PurpleBtn onClick={() => setStep(2)}>Next</PurpleBtn>
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            // gap: "100px",
          }}
        >
          <div style={{ fontSize: "18px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700 }}>
              Microphone Check
            </h1>
            <p style={{ marginTop: "0px", fontWeight: 500 }}>
              This is an opportunity to check that your microphone is working
              correctly.
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              1.Make sure your headset is on and the microphone is in the
              downward position near your mouth.
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              2.When you are ready, click on the Record button and say "Testing,
              testing, one, two, three" into the microphone.
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              3.After you have spoken, click on the Stop button. Your recording
              is now complete.
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              4.Now click on the Playback button. You should clearly hear
              yourself speaking.
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              5.If you can not hear your voice clearly, please raise your hand.
            </p>
            <div
              style={{
                backgroundColor: "rgba(153, 108, 254, 0.10)",
                minHeight: "180px",
                width: isMobile ? "90%" : "350px",
                borderRadius: "8px",
                padding: "15px",
              }}
            >
              <h5
                style={{
                  color: "#333",
                  fontSize: "14px",
                  paddingTop: "10px",
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                Recorded Answer
              </h5>
              <p style={{ fontSize: "14px", padding: "0px" }}>
                {IsRecording
                  ? "Recording " +
                    Math.floor((time % 6000) / 100) +
                    "." +
                    (time % 100)
                  : MicAudioUrl
                  ? "Done"
                  : "Click Record to Begin"}
              </p>
              {MicAudioUrl && (
                <AudioPlayer>
                  <audio
                    ref={MicAudioRef}
                    preload="auto"
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src={MicAudioUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                  <div style={{ width: "100%" }}>
                    <input
                      type="range"
                      value={currentTime}
                      min="0"
                      max={duration || time}
                      step="0.1"
                      className="slider"
                      onChange={handleSliderChange}
                    />
                  </div>
                  <br />
                </AudioPlayer>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "10px",
                  width: "100%",
                  justifyContent: "space-around",
                  marginTop: "30px",
                  textAlign: "center",
                }}
              >
                <MockBtn onClick={IsRecording ? null : check}>Record</MockBtn>
                <MockBtn onClick={isPlaying ? pauseAudio : playAudio}>
                  {!isPlaying ? "Playback" : "Pause"}
                </MockBtn>
                <MockBtn onClick={IsRecording ? stopRecording : null}>
                  Stop
                </MockBtn>
              </div>
            </div>

            <p style={{ marginTop: "20px", fontWeight: 500 }}>
              During the test, you will not have Record, Playback and Stop
              buttons. The voice recording will start automatically.
            </p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>{step}/5</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* <div>
                <FocusedBtn onClick={() => setStep(step - 1)}>Back</FocusedBtn>
              </div> */}
              <div>
                <PurpleBtn onClick={() => setStep(step + 1)}>Next</PurpleBtn>
              </div>
            </div>
          </div>
        </div>
      ) : step === 3 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // gap: "150px",
            height: "100%",
          }}
        >
          <div style={{ fontSize: "18px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700 }}>
              Keyboard Check
            </h1>
            <p style={{ marginTop: "0px", fontWeight: 500 }}>
              This is an opportunity to check that you have the correct
              keyboard.
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              1. Look at the top row of letters on the keyboard
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              2. The letters should appear in this order Q W E R T Y
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              3. If you do not have a Q W E R T Y keyboard, raise your hand to
              get the attention of Test Administrator.
            </p>
            <div
              style={{
                backgroundColor: "rgba(153, 108, 254, 0.10)",
                maxWidth: "450px",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              <img
                src="/keyboard.png"
                alt="qwerty"
                style={{
                  maxWidth: "100%", // Limits the image width to 100% of the parent div
                  maxHeight: "100%", // Limits the image height to 100% of the parent div
                  height: "auto", // Maintains aspect ratio
                  width: "auto", // Maintains aspect ratio
                }}
              />
            </div>

            <p style={{ marginTop: "20px", fontWeight: 500 }}>
              During the test, you will not have Record, Playback and Stop
              buttons. The voice recording will start automatically.
            </p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>{step}/5</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* <div>
                <FocusedBtn onClick={() => setStep(step - 1)}>Back</FocusedBtn>
              </div> */}
              <div>
                <PurpleBtn onClick={() => setStep(step + 1)}>Next</PurpleBtn>
              </div>
            </div>
          </div>
        </div>
      ) : step === 4 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // gap: "200px",
            height: "100%",
          }}
        >
          <div style={{ fontSize: "18px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700 }}>
              Test Introduction
            </h1>
            <p style={{ marginTop: "0px", fontWeight: 500 }}>
              This test will measure the English Reading, Writing, Listening and
              Speaking skills that you need in an academic setting.
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              - The test is divided into 3 parts. Each part may contain a number
              of sections. The sections are individually timed. The timer will
              be shown in the top right corner of your screen.The number of
              items in the section will also be displayed
            </p>
            <div
              style={{
                backgroundColor: "rgba(153, 108, 254, 0.10)",
                maxWidth: "230px",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              <img
                src="/timer.png"
                alt="timer"
                style={{
                  maxWidth: "100%", // Limits the image width to 100% of the parent div
                  maxHeight: "100%", // Limits the image height to 100% of the parent div
                  height: "auto", // Maintains aspect ratio
                  width: "auto", // Maintains aspect ratio
                }}
              />
            </div>
            <p style={{ marginTop: "20px", fontWeight: 500 }}>
              - At the beginning of each part you will receive instructions.
              These will provide details on what to expect in that part of the
              test
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              - By clicking on the Next button at the bottom of each screen you
              confirm your answer and move to the next question. If you click on
              Next you will not be able to return to the previous question. You
              will not be able to revisit any questions at the end of the test.{" "}
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              - You will be offered a break of up 10 minutes after Part 2. The
              break is optional
            </p>
            <p style={{ marginTop: "-10px", fontWeight: 500 }}>
              - This test makes use of different varieties of English, for
              example, British, American, Australian. You can answer in the
              standard English variety of your choice
            </p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>{step}/5</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* <div>
                <FocusedBtn onClick={() => setStep(step - 1)}>Back</FocusedBtn>
              </div> */}
              <div>
                <PurpleBtn onClick={() => setStep(step + 1)}>Next</PurpleBtn>
              </div>
            </div>
          </div>
        </div>
      ) : step === 5 ? (
        <Step5 setStep={setStep} setOpen={setOpen} />
      ) : step === 6 ? null : // <div
      //   style={{
      //     display: "flex",
      //     flexDirection: "column",
      //     justifyContent: "space-between",
      //     // gap: "450px",
      //     height:"100%",
      //   }}
      // >
      //   <div style={{ fontSize: "18px" }}>
      //     <h1
      //       style={{ fontSize: "20px", fontWeight: 700, lineHeight: "32px" }}
      //     >
      //       You are about to begin Part 1 of the exam : Speaking and Writing
      //       <br />
      //       Time allowed : 54 - 67 minutes
      //       <br />
      //       Remember to put your headphones on before beginning this section
      //     </h1>
      //   </div>
      //   <div
      //     style={{
      //       width: "100%",
      //       display: "flex",
      //       justifyContent: "space-between",
      //     }}
      //   >
      //     <p>{step}/5</p>
      //     <div style={{ display: "flex", gap: "10px" }}>
      //       {/* <div>
      //         <FocusedBtn onClick={() => setStep(step - 1)}>Back</FocusedBtn>
      //       </div> */}
      //       <div>
      //         <PurpleBtn onClick={() => setOpen(false)}>Start</PurpleBtn>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      null}
    </>
  );
}
