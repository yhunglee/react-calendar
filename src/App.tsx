/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";

function App() {
  let [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="App">
      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}
        value={selectedDate}
        pattern="\d{4}-\d{2}-\d{2}"
      />
      <Calendar.Calendar
        date={selectedDate}
        onSelect={setSelectedDate}
      ></Calendar.Calendar>
    </div>
  );
}

export default App;
