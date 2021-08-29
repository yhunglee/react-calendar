/** @jsxImportSource @emotion/react */
import { DateView } from "./DateView/DateView";
import { MonthView } from "./MonthView/MonthView";

export const Calendar: React.VFC = (props) => {
  return (
    <div className="container">
      <DateView></DateView>
      <MonthView></MonthView>
    </div>
  );
};
