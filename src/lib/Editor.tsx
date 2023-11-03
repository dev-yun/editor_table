import {
  ProseMirror,
  useEditorEventCallback,
} from "@nytimes/react-prosemirror";
import React, { useState } from "react";

import { EditorState } from "prosemirror-state";
import { createTables } from "./table/command";
import schema from "./schema";
import setupPlugins from "./plugins";
import { styled } from "styled-components";
import { toggleMark } from "prosemirror-commands";

function BoldButton() {
  const onClick = useEditorEventCallback((view, e) => {
    if (!view) return;
    const toggleBoldMark = toggleMark(view.state.schema.marks.bold);
    toggleBoldMark(view.state, view.dispatch, view);
  });

  const onClick2 = useEditorEventCallback((view) => {
    if (!view) return;
    createTables(view.state, view.dispatch);
  });
  return (
    <>
      <button onMouseDown={onClick}>Bold</button>
      <button onMouseDown={onClick2}>table</button>
    </>
  );
}

const Editor = () => {
  const [mount, setMount] = useState<HTMLDivElement | null>(null);
  const plugins = setupPlugins({
    className: "Editor",
  });

  const [editorState, setEditorState] = useState(() => {
    return EditorState.create({ schema: schema, plugins });
  });

  return (
    <ProseMirror
      mount={mount}
      state={editorState}
      dispatchTransaction={(transaction) => {
        setEditorState((prevState) => prevState.apply(transaction));
      }}
    >
      <BoldButton />
      <StyledEditor>
        <div ref={setMount} />
      </StyledEditor>
    </ProseMirror>
  );
};

export default Editor;

const StyledEditor = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 400px;
  padding: 8px;
  gap: 4px;

  border: 1px solid black;

  .prosemirror-menu {
    /* background-color: lightgray; */
    display: flex;
    gap: 10px;
  }

  .Editor {
    height: 500px;
    :focus-visible {
      outline: none;
    }

    overflow: scroll;
  }

  // table

  .ProseMirror table {
    margin: 0;
  }

  .ProseMirror th,
  .ProseMirror td {
    min-width: 1em;
    border: 1px solid #ddd;
    padding: 3px 5px;
  }

  .ProseMirror th {
    font-weight: bold;
    text-align: left;
  }
  .ProseMirror .tableWrapper {
    margin: 1em 0;
    overflow-x: auto;
  }
  .ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    overflow: hidden;
  }
  .ProseMirror td,
  .ProseMirror th {
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }
  .ProseMirror .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
  }
  .ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  .ProseMirror .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }
`;
