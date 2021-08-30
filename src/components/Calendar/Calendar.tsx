/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { DateView } from "./DateView/DateView";
import { MonthView } from "./MonthView/MonthView";

export const Calendar: React.VFC = (props) => {
  let [today, setToday] = useState(new Date());
  let [viewDate, setViewDate] = useState(new Date());
  let [selectedDate, setSelectedDate] = useState();

  function previousMonth() {
    setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)));
  }

  function nextMonth() {
    setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)));
  }

  function previousYear() {
    setViewDate(new Date(viewDate.setFullYear(viewDate.getFullYear() - 1)));
  }

  function nextYear() {
    setViewDate(new Date(viewDate.setFullYear(viewDate.getFullYear() + 1)));
  }

  return (
    <div className="container">
      <DateView
        prevAct={previousMonth}
        nextAct={nextMonth}
        info={`${viewDate
          .toLocaleString("en-US", {
            month: "long",
          })
          .substr(0, 3)} ${viewDate.toLocaleString("en-US", {
          year: "numeric",
        })}`}
        viewDate={viewDate}
        selectedDate={selectedDate}
        toSelectDate={setSelectedDate}
      />
      <MonthView
        info={`${viewDate.toLocaleString("en-US", { year: "numeric" })}`}
        prevAct={previousYear}
        nextAct={nextYear}
        viewDate={viewDate}
      />
    </div>
  );
};
