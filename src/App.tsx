import React from "react";
import * as ReactDOM from "react-dom";
import "./App.css";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div className="App">
      <Calendar.DateView></Calendar.DateView>
    </div>
  );
}

export default App;
