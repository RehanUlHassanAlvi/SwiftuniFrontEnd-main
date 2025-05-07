import React, { useEffect, useRef, useState } from "react";
import { AudioPlayer } from "../Speaking/styles";
import { PurpleBtn } from "../Common/Style";

export default function Step5({setStep,setOpen}) {
  const audioRef = useRef(new Audio());
  const MicAudioRef = useRef(new Audio());
  const [MicAudioUrl, setMicAudioUrl] = useState();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [transcript, setTranscript] = useState("");
  const [timer, setTimer] = useState(25); // Initial countdown timer
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Slider value
  const speechRecognitionRef = useRef(null);
  const transcriptionRef = useRef("");
  const recordingIntervalRef = useRef(null);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer <= 0) {
      startRecordingIntro();
    }
  }, [timer]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime < 30) {
            // console.log(prevTime);
            return prevTime + 0.1;
          } else {
            clearInterval(recordingIntervalRef.current);
            return prevTime;
          }
        });
      }, 100); // Update every 0.1 seconds
    } else {
      clearInterval(recordingIntervalRef.current);
    //   setCurrentTime(0); // Reset slider when not recording
    }
  }, [isRecording]);

  useEffect(() => {
    console.log("ts", transcript);
  }, [transcript]);

  const startRecordingIntro = async () => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        console.log("Voice recognition started. Speak into the microphone.");
      };

      //   recognition.onresult = (event) => {
      //     for (let i = event.resultIndex; i < event.results.length; ++i) {
      //       transcriptionRef.current += event.results[i][0].transcript + " ";
      //     }
      //   };

      recognition.onresult = (event) => {
        let interim_transcript = "";
        // setTranscript("");
        for (let i = event.resultIndex; i < event.results.length; ++i) {
        //   transcriptionRef.current += event.results[i][0].transcript + " ";
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
        // speechRecognitionRef.current = null;
        // console.log("Final transcript:", transcriptionRef.current);
        // setTranscript(transcriptionRef.current);
        speechRecognitionRef.current = null;
        setIsRecording(false);
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
      mediaRecorderRef.current = recognition;
      setIsRecording(true);

      // Stop recording after 30 seconds
      setTimeout(() => {
        if (speechRecognitionRef.current) {
          speechRecognitionRef.current.stop();
        }
      }, 30000);
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%",gap:"150px"}}>
      <div style={{ fontSize: "18px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 700, lineHeight: "32px" }}>
          Read the prompt below. In 35 seconds, you must reply in your own
          words, as naturally and clearly as possible. You have 40 seconds to
          record your response. Your response will be sent together with your
          score report to the institutions selected by you
        </h1>
        <p style={{ marginTop: "10px", fontWeight: 500 }}>
          Please introduce yourself. For example, you could talk about one of
          the following
        </p>
        <p style={{ marginTop: "-10px", fontWeight: 500 }}>- Your interests</p>
        <p style={{ marginTop: "-10px", fontWeight: 500 }}>
          - Your plans for future study
        </p>
        <p style={{ marginTop: "-10px", fontWeight: 500 }}>
          - Why you want to study abroad
        </p>
        <p style={{ marginTop: "-10px", fontWeight: 500 }}>
          - Why you need to learn English
        </p>
        <p style={{ marginTop: "-10px", fontWeight: 500 }}>
          - Why you chose this test
        </p>
        <div
          style={{
            backgroundColor: "rgba(153, 108, 254, 0.10)",
            // height: "130px",
            maxWidth: "350px",
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
            {timer > 0 ? `Recording in ${timer} sec` : !isRecording ? "Done" : "Recording..."}
          </p>
          <AudioPlayer>
            <audio ref={MicAudioRef} src={MicAudioUrl}>
              Your browser does not support the audio element.
            </audio>
            <div style={{ width: "100%" }}>
              <input
                type="range"
                value={currentTime}
                min="0"
                max={30}
                step="1"
                className="slider"
                onChange={() => {}}
              />
            </div>
          </AudioPlayer>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>5/5</p>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <div>
            <PurpleBtn onClick={() => setStep(4)}>Back</FocusedBtn>
          </div> */}
          <div>
            <PurpleBtn onClick={() => setOpen(false)}>Next</PurpleBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
