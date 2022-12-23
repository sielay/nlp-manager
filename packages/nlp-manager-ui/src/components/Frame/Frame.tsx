import { Alignment, Button, ButtonGroup, Navbar } from "@blueprintjs/core";
import { FC } from "react";
import { Sidebar } from "../Sidebar";
import "./Frame.scss";

export const Frame: FC<unknown> = () => {
  return (
    <div className="Frame">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>NLPM</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.LEFT}>
          <ButtonGroup minimal>
            <Button
              onClick={() => {
                window.nlpManagerBackend?.importFile();
              }}
            >
              Import file
            </Button>
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
        <div className="Frame__content"></div>
      </div>
    </div>
  );
};
