/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { NavigateAction } from "../types/NavigateActType";
import { SelectDateType } from "../types/SelectDateType";

const containerStyle = css`
  width: 230px;
`;
const dayOfWeekStyle = css`
  display: flex;
  margin: auto 1rem;
  flex-wrap: wrap;

  > .element {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    width: 20px;
    border-radius: 50%;

    &.out-of-range {
      color: #aaa;
    }

    &:not(.out-of-range):hover {
      cursor: pointer;
      background-color: #ccc;
    }

    &.picked {
      background-color: #db3d44;
      color: #fff;
    }
  }

  > .name {
    font-weight: bold;
  }
`;

export const DateView: React.VFC<NavigateAction & SelectDateType> = ({
  prevAct,
  nextAct,
  info,
  viewDate,
  selectedDate,
  toSelectDate,
}) => {
  let year =
    viewDate !== undefined ? viewDate.getFullYear() : new Date().getFullYear();
  let month =
    viewDate !== undefined ? viewDate.getMonth() : new Date().getMonth(); // range: 0 ~ 11

  /**
   * 用 Gaussian algorithm 得知 日期幾年幾月幾號 是一週的第幾天
   *
   * https://calendars.wikia.org/wiki/Calculating_the_day_of_the_week
   */
  function genDayOfWeek(year: number, month: number, day: number) {
    let numOfDay = -1;
    let calcYear = month > 1 ? year : year - 1;

    let first2DigitYear = parseInt(calcYear.toString().substr(0, 2), 10);
    let last2DigitYear = parseInt(calcYear.toString().substr(2, 2), 10);
    let calcMonth = ((month + 10) % 12) + 1; // 因為 month 用 Date constructor 的 monthIndex ，所以從 +9 變成 +10

    numOfDay =
      (((day +
        Math.floor(2.6 * calcMonth - 0.2) +
        last2DigitYear +
        Math.floor(last2DigitYear / 4) +
        Math.floor(first2DigitYear / 4) -
        2 * first2DigitYear) %
        7) +
        7) %
      7; // Notice: modulo 7 的過程已經轉換過負數
    return numOfDay;
  }

  /**
   * 產生日期的節點陣列，陣列必須包含 42 個
   */
  function genDayNodeAry() {
    const nodeAry = [];

    let firstDate = new Date(year, month, 1);

    let calcDate = new Date(firstDate);

    let calcStartDate = new Date(firstDate);

    let numOfDayOfWeek = genDayOfWeek(year, month, 1),
      i = 0;
    let pickDate: string = "";
    let compareDate: string = "";

    if (selectedDate === undefined) {
      compareDate = new Date().toLocaleString();
    } else {
      compareDate =
        selectedDate.getFullYear() +
        "-" +
        (selectedDate.getMonth() + 1) +
        "-" +
        selectedDate.getDate();
    }

    while (i < numOfDayOfWeek) {
      calcStartDate.setDate(calcStartDate.getDate() - 1);
      nodeAry.unshift(
        <div
          className="element out-of-range"
          key={
            calcStartDate.getFullYear() +
            "-" +
            calcStartDate.getMonth() +
            "-" +
            calcStartDate.getDate()
          }
        >
          {calcStartDate.getDate()}
        </div>
      );
      i++;
    } // 產生 1號之前的資料

    while (true) {
      if (calcDate.getMonth() === month) {
        nodeAry.push(
          <div
            className={`element ${pickDate == compareDate ? "picked" : ""}`}
            key={
              calcDate.getFullYear() +
              "-" +
              calcDate.getMonth() +
              "-" +
              calcDate.getDate()
            }
            data-tag={
              calcDate.getFullYear() +
              "-" +
              (calcDate.getMonth() + 1) +
              "-" +
              calcDate.getDate()
            }
            onClick={(event) => {
              toSelectDate(
                new Date(event.currentTarget.getAttribute("data-tag") + "")
              );

              pickDate = event.currentTarget.getAttribute("data-tag") + "";
              // console.log(`pickDate: ${pickDate}, compareDate: ${compareDate}`); // debug
            }}
          >
            {calcDate.getDate()}
          </div>
        );
        calcDate.setDate(1 + calcDate.getDate());
      } else {
        /**
         * 因為已經換月，所以要跳出這個無窮回圈
         */

        break;
      }
    } // 產生一個月的資料

    for (let j = nodeAry.length; j < 42; j++) {
      nodeAry.push(
        <div
          className="element out-of-range"
          key={
            calcDate.getFullYear() +
            "-" +
            calcDate.getMonth() +
            "-" +
            calcDate.getDate()
          }
        >
          {calcDate.getDate()}
        </div>
      );
      calcDate.setDate(1 + calcDate.getDate());
    } // 產生一個月後的資料，目的是填滿數量到 42 個

    return nodeAry;
  }

  return (
    <div className="container" css={containerStyle}>
      <NavigationBar prevAct={prevAct} nextAct={nextAct} info={info} />

      <div className="day-name-of-week" css={dayOfWeekStyle}>
        <div className="element name">Su</div>
        <div className="element name">Mo</div>
        <div className="element name">Tu</div>
        <div className="element name">We</div>
        <div className="element name">Th</div>
        <div className="element name">Fr</div>
        <div className="element name">Sa</div>
      </div>

      <div className="row day" css={dayOfWeekStyle}>
        {genDayNodeAry()}
      </div>
    </div>
  );
};
