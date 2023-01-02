import { Button, InputGroup } from "@blueprintjs/core";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { Corpus } from "@nlp-manager/shared";
import { FC, useEffect, useState } from "react";
import { useCorpus } from "../../hooks";
import { EditorStatus } from "../../hooks/editor";
import { useEditSession } from "../../hooks/editSession";
import { useDebugger } from "./useDebugger";

export interface TabProps {
  corpus: Corpus;
}

export const Intents: FC<TabProps> = ({ corpus }) => {
  return (
    <Table2 numRows={corpus.data.length}>
      <Column
        name="Intent"
        cellRenderer={(index: number) => {
          return <Cell>{corpus.data[index].intent}</Cell>;
        }}
      />
      <Column
        name="Utterances"
        cellRenderer={(index: number) => {
          return <Cell>{corpus.data[index].utterances.length}</Cell>;
        }}
      />
      <Column
        name="Answers"
        cellRenderer={(index: number) => {
          const { answers } = corpus.data[index];
          return <Cell>{answers.length}</Cell>;
        }}
      />
    </Table2>
  );
};

export const Utterances: FC<TabProps> = ({ corpus }) => {
  // TODO: optimise
  const utterances = corpus.data.reduce((collected, next) => {
    const { intent, utterances } = next;
    utterances.forEach((utterance) => {
      collected.push({ utterance, intent });
    });
    return collected;
  }, [] as { utterance: string; intent: string }[]);
  utterances.sort((a, b) => {
    if (a.utterance === b.utterance) return 0;
    return a.utterance < b.utterance ? -1 : 1;
  });
  return (
    <Table2 numRows={utterances.length}>
      <Column
        name="Utterance"
        cellRenderer={(index: number) => {
          return <Cell>{utterances[index].utterance}</Cell>;
        }}
      />
      <Column
        name="Intent"
        cellRenderer={(index: number) => {
          return <Cell>{utterances[index].intent}</Cell>;
        }}
      />
    </Table2>
  );
};

export const Answers: FC<TabProps> = ({ corpus }) => {
  // TODO: optimise
  const answers = corpus.data.reduce((collected, next) => {
    const { intent, answers } = next;
    answers.forEach((record) => {
      if (typeof record === "string") {
        collected.push({ answer: record, intent });
        return;
      }
      const { answer, opts } = record;
      collected.push({ answer, options: opts, intent });
    });
    return collected;
  }, [] as { answer: string; options?: string; intent: string }[]);
  answers.sort((a, b) => {
    if (a.answer === b.answer) return 0;
    return a.answer < b.answer ? -1 : 1;
  });
  return (
    <Table2 numRows={answers.length}>
      <Column
        name="Answer"
        cellRenderer={(index: number) => {
          return <Cell>{answers[index].answer}</Cell>;
        }}
      />
      <Column
        name="Options"
        cellRenderer={(index: number) => {
          return <Cell>{answers[index].options}</Cell>;
        }}
      />
      <Column
        name="Intent"
        cellRenderer={(index: number) => {
          return <Cell>{answers[index].intent}</Cell>;
        }}
      />
    </Table2>
  );
};

export const Debug: FC<TabProps> = ({ corpus }) => {
  const [text, setText] = useState("");
  const [{ messages, console, disabled }, { clear, send, train }] =
    useDebugger();

  return (
    <div className="flex flex-row w-full h-full gap-2">
      <div className="h-full flex flex-col">
        <div className="overflow-auto flex-grow border">
          {messages.map(({ text, from }, index) => {
            return (
              <div key={index}>
                <strong>{from}</strong> {text}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row">
          <InputGroup
            disabled={disabled}
            type="text"
            value={text}
            onChange={({ target: { value } }) => setText(value)}
            onKeyDown={({ key }) => {
              if (key === "Enter") {
                send(text);
                setText("");
              }
            }}
          />
          <Button
            disabled={disabled}
            icon="send-message"
            onClick={() => {
              send(text);
              setText("");
            }}
          >
            Send
          </Button>
          <Button icon="eraser" onClick={() => clear()}>
            Reset
          </Button>
          <Button icon="refresh" onClick={() => train(corpus)}>
            Train
          </Button>
        </div>
      </div>
      <div className="flex flex-col h-full w-full">
        <pre className="bg-black font-mono text-white text-xs border h-full w-full whitespace-pre-wrap overflow-auto">
          {console.join("\n")}
        </pre>
      </div>
    </div>
  );
};

export const newGenerator = (): Corpus => {
  return {
    name: "Unnamed",
    locale: "en-En",
    data: [],
  };
};

export const CorpusEditor: FC<unknown> = () => {
  const [tab, setTab] = useState<string>("intents");

  const { localState, id, status } = useEditSession<Corpus>({
    newGenerator,
    serverHook: useCorpus,
  });
  useEffect(() => {
    switch (status) {
      case EditorStatus.LOADING: {
        if (id) {
        }
      }
    }
  }, [status]);
  return (
    <div>
      <pre>{status}</pre>
      <pre>{id}</pre>
      <pre>{JSON.stringify(localState)}</pre>
    </div>
  );
  /*
  
  // TODO: one to one hook
  const { data } = useCorpora();
  const corpus = data?.find(({ id: corpusId }) => id === corpusId);
  if (!corpus) {
    return <NonIdealState title="Corpus not found" icon="unknown-vehicle" />;
  }
  return (
    <div className="w-full h-full">
      <Navbar>
        <Navbar.Group>
          <Tabs onChange={(tabId: string) => setTab(tabId)} selectedTabId={tab}>
            <Tab title="Intents" id="intents" />
            <Tab title="Utterances" id="utterances" />
            <Tab title="Answers" id="answers" />
            <Tab title="Debug" id="debug" />
          </Tabs>
        </Navbar.Group>
      </Navbar>
      {tab === "intents" && <Intents corpus={corpus} />}
      {tab === "utterances" && <Utterances corpus={corpus} />}
      {tab === "answers" && <Answers corpus={corpus} />}
      {tab === "debug" && <Debug corpus={corpus} />}
    </div>
  );*/
};
