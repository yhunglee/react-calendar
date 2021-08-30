/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { NavigateAction } from "../types/NavigateActType";

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

    &:hover {
      cursor: pointer;
      background-color: #ccc;
    }
  }
`;

export const MonthView: React.VFC<NavigateAction> = ({
  prevAct,
  nextAct,
  info,
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
            <div className="element" key={idx}>
              {elem}
            </div>
          );
        })}
      </div>
    </div>
  );
};
