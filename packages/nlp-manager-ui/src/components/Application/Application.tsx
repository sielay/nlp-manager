import { FC } from "react";
import { VERSION } from "@nlp-manager/shared";

export const App: FC<unknown> = () => {
  return <div>Hello world {VERSION}</div>;
};

export const Application: FC<unknown> = () => {
  return <App />;
};
