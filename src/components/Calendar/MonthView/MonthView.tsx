/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { NavigateAction } from "../types/NavigateActType";
import { SelectMonthType } from "../types/SelectMonthType";

export const MonthView: React.VFC<NavigateAction & SelectMonthType> = ({
  prevAct,
  nextAct,
  info,
  selectedDate,
  setPrevView,
  setNextView,
  currentView,
  setViewDateByMonth,
}) => {
  const containerStyle = css`
    width: 230px;
    display: ${currentView === "MONTH_VIEW" ? "block" : "none"};
  `;

  const monthListStyle = css`
    display: ${currentView === "MONTH_VIEW" ? "flex" : "none"};
    margin: auto 1rem;
    flex-wrap: wrap;

    > .element {
      width: fit-content;
      padding: 0.5rem;
      margin: auto;
      border-radius: 50%;

      &:hover {
        cursor: pointer;
        background-color: #ccc;
      }

      &.picked {
        background-color: #db3d44;
        color: #fff;
      }
    }
  `;

  let monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="container" css={containerStyle}>
      <NavigationBar
        prevAct={prevAct}
        nextAct={nextAct}
        info={info}
        setPrevView={() => setPrevView("MONTH_VIEW")}
        currentView={currentView}
      />

      <div className="month-list" css={monthListStyle}>
        {monthList.map((elem, idx) => {
          return (
            <div
              className={`element ${
                selectedDate !== undefined &&
                selectedDate instanceof Date &&
                selectedDate.getFullYear() === parseInt(info, 10) &&
                selectedDate.getMonth() === idx
                  ? "picked"
                  : ""
              }`}
              key={idx}
              onClick={() => {
                // 表達現在是什麼頁面，下一站依照條件要前往哪一個頁面
                setNextView("MONTH_VIEW");

                // 依照選定的月份，去設定觀看畫面的日期
                setViewDateByMonth(idx);
              }}
            >
              {elem}
            </div>
          );
        })}
      </div>
    </div>
  );
};
