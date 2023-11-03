import { ProseMirrorInner, ProseMirrorProps } from "./ProseMirrorInner";

import { LayoutGroup } from "../contexts/LayoutGroup";
import React from "react";

/**
 * Renders the ProseMirror View onto a DOM mount.
 *
 * The `mount` prop must be an actual HTMLElement instance. The
 * JSX element representing the mount should be passed as a child
 * to the ProseMirror component.
 *
 * e.g.
 *
 * ```
 * function MyProseMirrorField() {
 *   const [mount, setMount] = useState(null);
 *
 *   return (
 *     <ProseMirror mount={mount}>
 *       <div ref={setMount} />
 *     </ProseMirror>
 *   );
 * }
 * ```
 */
export function ProseMirror(props: ProseMirrorProps) {
  return (
    <LayoutGroup>
      <ProseMirrorInner {...props} />
    </LayoutGroup>
  );
}
