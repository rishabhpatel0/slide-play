import React, { useState } from "react";
import { musicData } from "./data/musicData";
import BottomSheet from "./BottomSheet";
import "./App.css";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [sheetState, setSheetState] = useState("collapsed"); 

  const handleSongClick = (song) => {
    setCurrentSong(song);
    setSheetState("collapsed");
  };

  return (
    <div className="app">
      <h1 className="heading">Slide Play </h1>
      <div className="grid">
        {musicData.map((song) => (
          <div
            key={song.id}
            className="card"
            onClick={() => handleSongClick(song)}
          >
            <img
              src={song.cover}
              alt={song.title}
              className="cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/200";//image
              }}
            />
            <h3 className="title">{song.title}</h3>
            <p className="artist">{song.artist}</p>
          </div>
        ))}
      </div>

      {currentSong && (
        <BottomSheet
          song={currentSong}
          state={sheetState}
          setState={setSheetState}
        />
      )}
    </div>
  );
}

export default App;
