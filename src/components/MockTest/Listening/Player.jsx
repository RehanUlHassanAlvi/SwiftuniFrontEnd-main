import React, { useEffect, useRef, useState } from "react";
import { AudioPlayer } from "../../Speaking/styles";

export default function Player({
  audioURL,
  Waiting,
  setDisabledButton,
  title,
  SubCategory,
  setIsAudioPlaying,
}) {
  const [timer, setTimer] = useState(Waiting);

  const [currentTime, setCurrentTime] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(timerInterval);
        // title !== "Fill in the Blanks" && setDisabledButton(false);
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("loadedmetadata", () => {
        setRecordingTime(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
      audio.addEventListener("play", () => {
        setIsPlaying(true);
        setIsAudioPlaying(true);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(recordingTime);
        setIsAudioPlaying(false);
      
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", () => {});
        audio.removeEventListener("timeupdate", () => {});
        audio.removeEventListener("play", () => {});
        audio.removeEventListener("ended", () => {});
      }
    };
  }, [audioURL]);

  // const handleSliderChange = (e) => {
  //   const newTime = Number(e.target.value);
  //   setCurrentTime(newTime);
  //   audioRef.current.currentTime = newTime;
  // };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          backgroundColor: "rgba(153, 108, 254, 0.10)",
          // height: "130px",
          maxWidth: "350px",
          borderRadius: "8px",
          padding: "15px",
          margin: "30px auto",
        }}
      >
        <h5
          style={{
            color: "#333",
            fontSize: "17px",
            paddingTop: "10px",
            textAlign: "center",
            margin: "0px",
          }}
        > 
          {/* {SubCategory === "Summarize Spoken Text" ? "Written Answer " : "Recorded Answer"} */}
          Listen to this Recording.
        </h5>
        <p style={{ fontSize: "17px", padding: "0px" }}>
          {timer > 0
            ? `Playing in ${timer} sec`
            : !isPlaying
            ? "Done"
            : "Playing..."}
        </p>
        <div>
          <audio ref={audioRef} src={audioURL} preload="metadata">
            Your browser does not support the audio element.
          </audio>
          <div style={{ width: "100%" }}>
            <input
              type="range"
              value={currentTime}
              min="0"
              max={recordingTime}
              step="1"
              className="slider"
              // onChange={handleSliderChange}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}
