/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { DateView } from "./DateView/DateView";
import { MonthView } from "./MonthView/MonthView";
import { ViewKind } from "./types/ViewKind";
import { YearView } from "./YearView/YearView";

export const Calendar: React.VFC = (props) => {
  let [today, setToday] = useState(new Date());
  let [viewDate, setViewDate] = useState(new Date());
  let [selectedDate, setSelectedDate] = useState();
  let [currentView, setCurrentView] = useState<ViewKind>("DATE_VIEW");

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

  function previousTenYears() {
    setViewDate(new Date(viewDate.setFullYear(viewDate.getFullYear() - 10)));
  }

  function nextTenYears() {
    setViewDate(new Date(viewDate.setFullYear(viewDate.getFullYear() + 10)));
  }

  function setPrevView(currView: string) {
    console.log(`currView at setPrevView: ${currView}`); // debug
    switch (currView) {
      case "MONTH_VIEW": {
        setCurrentView("YEAR_VIEW");
        break;
      }
      case "DATE_VIEW": {
        setCurrentView("MONTH_VIEW");
        break;
      }
      case "YEAR_VIEW": {
        break;
      }
      default: {
        // others, set to dismiss all views
        setCurrentView("");
        break;
      }
    }
  }

  function setNextView(currView: string) {
    console.log(`currView at setNextView: ${currView}`); // debug
    switch (currView) {
      case "YEAR_VIEW": {
        setCurrentView("MONTH_VIEW");
        break;
      }
      case "MONTH_VIEW": {
        setCurrentView("DATE_VIEW");
        break;
      }
      case "DATE_VIEW": {
        break;
      }
      default: {
        // others, set to dismiss all
        setCurrentView("");
        break;
      }
    }
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
        today={today}
        setPrevView={setPrevView}
        setNextView={setNextView}
        currentView={currentView}
      />
      <MonthView
        info={`${viewDate.toLocaleString("en-US", { year: "numeric" })}`}
        prevAct={previousYear}
        nextAct={nextYear}
        viewDate={viewDate}
        selectedDate={selectedDate}
        setPrevView={setPrevView}
        setNextView={setNextView}
        currentView={currentView}
      />
      <YearView
        prevAct={previousTenYears}
        nextAct={nextTenYears}
        info={""}
        selectedDate={selectedDate}
        viewDate={viewDate}
        setPrevView={setPrevView}
        setNextView={setNextView}
        currentView={currentView}
      />
    </div>
  );
};
