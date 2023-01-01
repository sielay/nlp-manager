import {
  Alignment,
  Button,
  ButtonGroup,
  Icon,
  Menu,
  MenuItem,
  Navbar,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { FC } from "react";
import { useCorpora } from "../../hooks";
import { useEditors } from "../../hooks/editors";
import { EditorFrame } from "../EditorFrame";
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
            <Popover2
              content={
                <Menu>
                  <MenuItem
                    onClick={() => addEditor("corpus", undefined)}
                    label="Corpus"
                  />
                </Menu>
              }
            >
              <Button icon="add" rightIcon="chevron-down" />
            </Popover2>
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
              {editors.map(({ title, instance }) => {
                return (
                  <Tab id={instance} key={instance}>
                    <small onClick={() => setActive(instance)}>{title}</small>
                    <Icon icon="cross" onClick={() => closeEditor(instance)} />
                  </Tab>
                );
              })}
            </Tabs>
          </div>
          <div className="Frame__content__editor">
            {editors.map(({ editor, instance }) => {
              return (
                <EditorFrame
                  key={instance}
                  editorApp={editor}
                  instance={instance}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
