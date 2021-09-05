/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { NavigateAction } from "../types/NavigateActType";
import { SelectMonthType } from "../types/SelectMonthType";

const containerStyle = css`
  width: 230px;
`;

const monthListStyle = css`
  display: flex;
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

export const MonthView: React.VFC<NavigateAction & SelectMonthType> = ({
  prevAct,
  nextAct,
  info,
  selectedDate,
}) => {
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
      <NavigationBar prevAct={prevAct} nextAct={nextAct} info={info} />

      <div className="month-list" css={monthListStyle}>
        {monthList.map((elem, idx) => {
          return (
            <div
              className={`element ${
                selectedDate !== undefined &&
                selectedDate.getFullYear() === parseInt(info, 10) &&
                selectedDate.getMonth() === idx
                  ? "picked"
                  : ""
              }`}
              key={idx}
            >
              {elem}
            </div>
          );
        })}
      </div>
    </div>
  );
};
