// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./components/Application";
import "./index.scss";

export const init = (id: string) => {
  const container = document.getElementById(id);
  container &&
    createRoot(container).render(
      // <StrictMode>
      <Application />
      // </S trictMode>
    );
};
