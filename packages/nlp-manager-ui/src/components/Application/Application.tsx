import { FC, useEffect, useState } from "react";

export const App: FC<unknown> = () => {
  const [state, setState] = useState<string>();
  useEffect(() => {
    void window.electronAPI?.getVersion().then(setState);
  }, []);
  return <div>Hello world {state}</div>;
};

export const Application: FC<unknown> = () => {
  return <App />;
};
