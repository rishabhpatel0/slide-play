import React, { useState, useRef, useEffect } from "react";
import "./BottomSheet.css";
const BottomSheet = ({ song, state, setState }) => {
  const startPos = useRef(0); 
  const endPos = useRef(0);

  const [progress, setProgress] = useState(0);

  //progress bar
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setProgress((current) => {
        let increment = Math.floor(Math.random()*4)+2; 
        let nextProgress = current + increment;
        if (nextProgress > 100) {
          nextProgress = 0; 
        }
        // console.log('Progress updated to:', nextProgress); 
        return nextProgress;
      });
    }, 2000); 

    return () => clearInterval(updateInterval); 
  }, []);

  //catch starting position
  const handleTouchStart = (e) => {
    e.preventDefault();
    startPos.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    endPos.current = e.changedTouches[0].clientY;
    handleSwipe();
  };

  //mouse down handle
  const handleMouseDown = (e) => {
    e.preventDefault(); 
    startPos.current = e.clientY;
    document.addEventListener("mouseup", handleMouseUp); 
  };

  const handleMouseUp = (e) => {
    endPos.current = e.clientY;
    handleSwipe();
    document.removeEventListener("mouseup", handleMouseUp); 
  };

  //core swipe logic
  const handleSwipe = () => {
    const swipeDiff = startPos.current - endPos.current;
    const threshold = 50;
    if (swipeDiff > threshold) {
      if (state === "collapsed" && state !== "half") setState("half");
      else if (state === "half" && state !== "full") setState("full");
    } else if (swipeDiff < -threshold) {
      if (state === "full" && state !== "half") setState("half");
      else if (state === "half" && state !== "collapsed") setState("collapsed");
    }
  };

  return (
    <div
      className={`bottom-sheet ${state}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      <div className="drag-handle"></div>
      <div className="sheet-content">
        <div className="info">
          <div className="album-cover">
            <img
              src={song.cover}
              alt={`Album cover for ${song.title}`}
              onError={(e) => {
                e.target.onerror = null; //prevent loop
                e.target.src = "https://picsum.photos/200"; //image
              }}
            />
          </div>
          <div className="song-details">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        </div>

        {/*progress bar*/}
        {(state === "half" || state === "full") && (
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {state === "full" && (
          <div className="lyrics">
            <p>{song.lyrics}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
