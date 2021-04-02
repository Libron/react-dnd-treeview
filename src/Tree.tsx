import React, { createContext, forwardRef, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragLayer } from "./DragLayer";
import { Container } from "./Container";
import { mutateTree, getTreeItem } from "./utils";
import { useOpenIdsHelper } from "./hooks";
import { TreeContext, OpenIdsHandlers, TreeProps } from "./types";

const Context = createContext<TreeContext>({} as TreeContext);

const Tree = forwardRef<OpenIdsHandlers, TreeProps>((props, ref) => {
  const [
    openIds,
    { handleToggle, handleCloseAll, handleOpenAll },
  ] = useOpenIdsHelper(props.tree, props.initialOpen);

  useImperativeHandle(ref, () => ({
    openAll: () => handleOpenAll(),
    closeAll: () => handleCloseAll(),
  }));

  return (
    <Context.Provider
      value={{
        ...props,
        openIds,
        onDrop: (id, parentId) =>
          props.onDrop(mutateTree(props.tree, id, parentId), {
            dragSourceId: id,
            dropTargetId: parentId,
            dragSource: getTreeItem(props.tree, id),
            dropTarget: getTreeItem(props.tree, parentId),
          }),
        onToggle: handleToggle,
        sort: props.sort,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        {props.dragPreviewRender && <DragLayer />}
        <Container parentId={props.rootId} depth={0} />
      </DndProvider>
    </Context.Provider>
  );
});

Tree.displayName = "Tree";

export { Context, Tree };
