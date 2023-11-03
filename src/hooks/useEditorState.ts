import { EditorContext } from "../contexts/EditorContext";
import type { EditorState } from "prosemirror-state";
import { useContext } from "react";

/**
 * Provides access to the current EditorState value.
 */
export function useEditorState(): EditorState | null {
  const { editorState } = useContext(EditorContext);

  return editorState;
}
