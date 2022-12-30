import { ComponentType, FC, useEffect, useState, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./Application.scss";
import { EditorsProvider } from "../../hooks/editors/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "../ErrorBounduary";

const Frame = lazy(() => import("../Frame"));

const editors: Record<string, ComponentType> = {
  "/ui": () => <div>Anything else</div>,
  "/": Frame,
};

export const Application: FC<unknown> = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <EditorsProvider>
        <Router>
          <Routes>
            {Object.entries(editors).map(([path, Component]) => (
              <Route
                path={path}
                key={path}
                element={
                  <ErrorBoundary>
                    <Suspense fallback={"Loading..."}>
                      <Component />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            ))}
          </Routes>
        </Router>
      </EditorsProvider>
    </QueryClientProvider>
  );
};
