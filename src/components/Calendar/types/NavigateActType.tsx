import { ViewKind } from "./ViewKind";

export type NavigateAction = {
  prevAct: Function;
  nextAct: Function;
  info: string;
  viewDate?: Date; // browsing purpose
  setPrevView: Function;
  currentView: ViewKind;
};
