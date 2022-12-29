import { FC, useEffect, useState } from "react";
import { Frame } from "../Frame";
import { QueryClient, QueryClientProvider } from "react-query";
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
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  );
};
