export type SelectDateType = {
  selectedDate: Date | undefined | string;
  toSelectDate: Function;
  today: Date;
  setPrevView: Function;
  setNextView: Function;
};
