import React, { useEffect, useRef, useState } from "react";
import { MediaRecorder } from "extendable-media-recorder";
import { setupWavEncoder } from "../../Speaking/wavEncoderSetup";
import { playBeep } from "../../Speaking/data";

export default function RecordingComponent({
  callNext,
  clicked,
  setTempTranscript,
  step,
  transcript,
  setTranscript,
  Beginning,
  Waiting,
  RecordingTime,
  audio,
  MicAudioRef,
  setDisabledButton,
  setRecordedAudioFile,
  handleRecordedWavBlob,
  mediaRecorderRef,
  setTranscriptLoading,
}) {
  const [timer, setTimer] = useState(Waiting);
  const [initTimer, setInitTimer] = useState(audio ? Beginning : 0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(!!audio);
  
  const speechRecognitionRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const stopTimeoutRef = useRef(null);
  const audioChunksRef = useRef([]);
  const callNextRef = useRef(callNext);

  useEffect(() => {
    callNextRef.current = callNext;
  }, [callNext]);

  useEffect(() => {
    setupWavEncoder();
  }, []);

  useEffect(() => {
    stopRecording();
  }, [clicked]);

  useEffect(() => {
    setTimer(Waiting);
    setIsRecording(false);
    setDisabledButton(true);
  }, [step, Waiting, setDisabledButton]);

  useEffect(() => {
    if (initTimer > 0) {
      const countdown = setTimeout(() => {
        setInitTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (audio) {
      if (MicAudioRef.current) {
        MicAudioRef.current.src = audio;
        MicAudioRef.current.onloadedmetadata = () => {
          setTimeout(() => {
            MicAudioRef.current.play();
            setIsPlayingAudio(true);
          }, 100);
        };

        MicAudioRef.current.onended = () => {
          setIsPlayingAudio(false);
          setTimer(Waiting);
        };

        MicAudioRef.current.ontimeupdate = () => {
          if (MicAudioRef.current) {
            setCurrentTime(MicAudioRef.current.currentTime || 0);
          }
        };
      }
    } else {
      setTimer(Waiting);
    }
  }, [initTimer, audio, Waiting, MicAudioRef]);

  useEffect(() => {
    setCurrentTime(0);

    if (!isPlayingAudio && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer <= 0 && !isPlayingAudio) {
      startRecording();
      setDisabledButton(false);
    }
  }, [timer, isPlayingAudio, setDisabledButton]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 0.1);
      }, 100);

      stopTimeoutRef.current = setTimeout(() => {
        playBeep(700, 300, 0.3);
        stopRecording();
        callNextRef.current();
      }, RecordingTime * 1000);
    }

    return () => {
      clearInterval(recordingIntervalRef.current);
      clearTimeout(stopTimeoutRef.current);
    };
  }, [isRecording, RecordingTime]);

  useEffect(() => {
    if (transcript !== "") {
      setTempTranscript(transcript);
      setTranscriptLoading(false);
    }
  }, [transcript, setTempTranscript, setTranscriptLoading]);

  const startRecording = async () => {
    playBeep(850, 200, 0.5);

    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        let interimTranscript = "";
        setTranscriptLoading(true);
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + event.results[i][0].transcript + " ");
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onerror = (err) => console.error("Speech recognition error:", err);
      recognition.onstop = () => {
        speechRecognitionRef.current = null;
        setIsRecording(false);
        setDisabledButton(false);
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
    }

    if (navigator.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioChunksRef.current = [];

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/wav" });

      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {audioChunksRef.current.push(event.data)});

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

        handleRecordedWavBlob(audioBlob);

        const file = new File([audioBlob], "audiofile.wav", {
          type: "audio/wav",
          lastModified: Date.now(),
        });

        setRecordedAudioFile(file); 
      });

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    setTempTranscript(transcript);
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      speechRecognitionRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    clearTimeout(stopTimeoutRef.current);
    stopTimeoutRef.current = null;
  };

  // ------------------ Render ------------------ //
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          backgroundColor: "rgba(153, 108, 254, 0.10)",
          maxWidth: "350px",
          borderRadius: "8px",
          padding: "15px",
          margin: "30px auto",
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
        <p style={{ fontSize: "14px", padding: 0 }}>
          {audio && initTimer > 0
            ? `Beginning in ${initTimer} sec`
            : isPlayingAudio
            ? "Playing Audio..."
            : timer > 0
            ? `Recording in ${timer} sec`
            : isRecording
            ? "Recording..."
            : "Done"}
        </p>

        <div>
          <audio ref={MicAudioRef}>
            Your browser does not support the audio element.
          </audio>
          <div style={{ width: "100%" }}>
            <input
              type="range"
              value={currentTime}
              min="0"
              max={
                isPlayingAudio && MicAudioRef.current?.duration
                  ? MicAudioRef.current.duration
                  : RecordingTime || 40
              }
              step="0.1"
              className="slider"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
