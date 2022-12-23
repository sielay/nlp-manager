import { FC, useEffect, useState } from "react";
import { Frame } from "../Frame";
import "./Application.scss";

export const App: FC<unknown> = () => {
  const [state, setState] = useState<string>();
  useEffect(() => {
    void window.nlpManagerBackend?.getVersion().then(setState);
  }, []);
  console.log(state);
  return <Frame />;
};

export const Application: FC<unknown> = () => {
  return <App />;
};
