import {
  Alignment,
  Button,
  ButtonGroup,
  Icon,
  Navbar,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import { FC } from "react";
import { useCorpora } from "../../hooks";
import { useEditors } from "../../hooks/editors";
import { EditorInstance } from "../EditorInstance";
import { Sidebar } from "../Sidebar";
import "./Frame.scss";

export const Frame: FC<unknown> = () => {
  const { refetch, data } = useCorpora();
  const {
    state: { editors, activeEditor },
    addEditor,
    closeEditor,
    setActive,
  } = useEditors();
  return (
    <div className="Frame">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>NLPM</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.LEFT}>
          <ButtonGroup minimal>
            <Button
              onClick={async () => {
                if (await window.nlpManagerBackend?.importFile()) {
                  await refetch();
                }
              }}
            >
              Import file
            </Button>
            <Button onClick={() => addEditor("test", 12)}>Add editor</Button>
          </ButtonGroup>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <ButtonGroup minimal>
            <Button
              icon="cog"
              onClick={() => {
                /* noop */
              }}
            />
          </ButtonGroup>
        </Navbar.Group>
      </Navbar>

      <div className="Frame__columns">
        <div className="Frame__sidebar">
          <Sidebar />
        </div>
        <div className="Frame__content">
          <div className="Frame__content__tabs">
            <Tabs selectedTabId={activeEditor}>
              {editors.map(({ title }, index) => {
                return (
                  <Tab id={index} key={index}>
                    <small onClick={() => setActive(index)}>{title}</small>
                    <Icon icon="cross" onClick={() => closeEditor(index)} />
                  </Tab>
                );
              })}
            </Tabs>
          </div>
          <div className="Frame__content__editor">
            {editors.map(({ type }, index) => {
              return <EditorInstance key={index} editor={type} id={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
