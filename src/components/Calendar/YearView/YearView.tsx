/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { NavigateAction } from "../types/NavigateActType";
import { SelectYearType } from "../types/SelectYearType";

const containerStyle = css`
  width: 230px;
`;

const yearListStyle = css`
  display: flex;
  margin: auto 1rem;
  flex-wrap: wrap;

  > .element {
    width: fit-content;
    padding: 0.5rem;
    margin: auto;
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
`;
export const YearView: React.VFC<NavigateAction & SelectYearType> = ({
  prevAct,
  nextAct,
  viewDate,
  selectedDate,
}) => {
  let year =
    viewDate !== undefined ? viewDate.getFullYear() : new Date().getFullYear();
  let prevYearQuotient = Math.floor(year / 10) - 1;
  let prevYear = Math.floor(prevYearQuotient * 10) + 9;
  let startYear = prevYear + 1;

  function genYearNodeAry() {
    const nodeAry = [];
    let i = -1;

    // 產生 一個 十位數前於本範圍的年份
    nodeAry.push(
      <div className="element out-of-range" key={i}>
        {prevYear}
      </div>
    );
    i++;

    // 產生十個本範圍的年份
    for (i = 0; i < 10; i++) {
      nodeAry.push(
        <div
          className={`element ${
            selectedDate !== undefined &&
            selectedDate.getFullYear() === startYear + i
              ? "picked"
              : ""
          }`}
          key={startYear + i}
          data-tag={startYear + i}
        >
          {startYear + i}
        </div>
      );
    }

    // 產生一個 後於本範圍的年份
    nodeAry.push(
      <div className="element out-of-range" key={startYear + i}>
        {startYear + i}
      </div>
    );

    return nodeAry;
  }

  return (
    <div className="container" css={containerStyle}>
      <NavigationBar
        prevAct={prevAct}
        nextAct={nextAct}
        // info={info}
        info={`${startYear} - ${startYear + 9}`}
      />

      <div className="year-list" css={yearListStyle}>
        {genYearNodeAry()}
      </div>
    </div>
  );
};
