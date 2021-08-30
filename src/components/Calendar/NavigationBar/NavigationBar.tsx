/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { NavigateAction } from "../types/NavigateActType";

const infoActionStyle = css`
  display: flex;
  justify-content: space-around;

  .action {
    display: inline-block;
    padding: 0.5rem;

    &:hover {
      cursor: pointer;
    }
  }

  .show-info {
    padding: 0.5rem;

    &:hover {
      cursor: pointer;
      background-color: #ccc;
    }
  }
`;

export const NavigationBar: React.VFC<NavigateAction> = ({
  prevAct,
  nextAct,
  info,
}) => {
  return (
    <div className="info-action-bar" css={infoActionStyle}>
      <span className="prev action" onClick={() => prevAct()}>
        &lt;
      </span>

      <div className="show-info">{info}</div>
      <span className="next action" onClick={() => nextAct()}>
        &gt;
      </span>
    </div>
  );
};
