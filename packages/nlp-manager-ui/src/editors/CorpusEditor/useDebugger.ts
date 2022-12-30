import { Corpus } from "@nlp-manager/shared";

import { Container, containerBootstrap } from "@nlpjs/core";
import { Nlp } from "@nlpjs/nlp";
import { LangEn } from "@nlpjs/lang-en-min";

import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, useReducer, useRef } from "react";

interface Message {
  text: string;
  from: "bot" | "me";
}

interface State {
  console: string[];
  messages: Message[];
  disabled: boolean;
}

const INITIAL_STATE: State = {
  console: [],
  messages: [],
  disabled: true,
};

export const reducers = {
  addMessage: (state: State, { payload }: PayloadAction<Message>) => {
    state.messages.push(payload);
  },
  addLog: (state: State, { payload }: PayloadAction<string>) => {
    state.console.push(payload);
  },
  clear: (state: State) => {
    state.console = [];
    state.messages = [];
  },
  setTrained: (state: State, { payload }: PayloadAction<boolean>) => {
    state.disabled = !payload;
  },
};

export const useDebugger = (): [
  State,
  {
    clear: () => void;
    send: (text: string) => void;
    train: (corpus: Corpus) => Promise<void>;
  }
] => {
  const bot =
    useRef<{
      nlp: Nlp;
      container: Container;
    }>();

  const slice = createSlice<State, typeof reducers>({
    name: "Debugger",
    reducers,
    initialState: INITIAL_STATE,
  });
  const [state, dispatch] = useReducer(slice.reducer, INITIAL_STATE);
  const { clear, addMessage, setTrained, addLog } = slice.actions;
  const train = async (corpus: Corpus) => {
    dispatch(setTrained(false));
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);
    container.register("nlp-manager", function () {
      return { transform: (a: unknown) => [a] };
    });
    const nlp = container.get("nlp");
    nlp.settings.autoSave = false;
    nlp.addLanguage("en");
    nlp.addCorpus({ importer: "nlp-manager", content: corpus });
    await nlp.train();
    bot.current = { nlp, container };
    dispatch(setTrained(true));
  };

  return [
    state,
    {
      clear: () => dispatch(clear),
      send: async (text: string) => {
        dispatch(addMessage({ text, from: "me" }));
        dispatch(addLog(`>>> ${text}`));
        const response = await bot.current?.nlp.process("en", text);
        if (response) {
          const { answer, intent } = response;
          console.log(response);
          dispatch(addLog(`[intent] ${intent}`));
          dispatch(addLog(`[raw] ${JSON.stringify(response)}`));
          dispatch(addLog(`<<< ${answer}`));
          dispatch(addMessage({ text: answer, from: "bot" }));
        }
      },
      train,
    },
  ];
};
