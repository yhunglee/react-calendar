/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { DateView } from "./DateView/DateView";
import { MonthView } from "./MonthView/MonthView";
import { CalendarType } from "./types/CalendarType";
import { ViewKind } from "./types/ViewKind";
import { YearView } from "./YearView/YearView";

export const Calendar: React.VFC<CalendarType> = ({ date, onSelect }) => {
  let [today] = useState(new Date());
  let [viewDate, setViewDate] = useState(new Date());
  let [selectedDate, setSelectedDate] = useState<Date | string>(date);
  let [currentView, setCurrentView] = useState<ViewKind>("DATE_VIEW");

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  /**
   * 同時設定自身 component 和外部元件傳進來的值，
   * 目的是當自身 component設定值時，能觸發外部元件的值跟自身元件一樣
   */
  function toSelectDate(val: Date | string) {
    setSelectedDate(val);
    onSelect(
      val instanceof Date ? Intl.DateTimeFormat("fr-CA").format(val) : ""
    );
  }

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

  /**
   * @param year number-type. 4-digit number
   *
   */
  function setViewDateByYear(year: number, month: number) {
    setViewDate(new Date(viewDate.setFullYear(year)));
  }

  /**
   *
   * @param month number-type. 0~11
   */
  function setViewDateByMonth(month: number) {
    setViewDate(new Date(viewDate.setMonth(month)));
  }

  function setPrevView(currView: string) {
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
        toSelectDate={toSelectDate}
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
        setViewDateByMonth={setViewDateByMonth}
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
        setViewDateByYear={setViewDateByYear}
      />
    </div>
  );
};
