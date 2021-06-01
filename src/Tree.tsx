import React, { createContext, forwardRef, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";
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

  const canDropCallback = props.canDrop;

  return (
    <Context.Provider
      value={{
        listComponent: "ul",
        listItemComponent: "li",
        sort: true,
        initialOpen: false,
        ...props,
        openIds,
        onDrop: (id, parentId) =>
          props.onDrop(mutateTree(props.tree, id, parentId), {
            dragSourceId: id,
            dropTargetId: parentId,
            dragSource: getTreeItem(props.tree, id),
            dropTarget: getTreeItem(props.tree, parentId),
          }),
        canDrop: canDropCallback
          ? (id, parentId) =>
              canDropCallback(props.tree, {
                dragSourceId: id,
                dropTargetId: parentId,
                dragSource: getTreeItem(props.tree, id),
                dropTarget: getTreeItem(props.tree, parentId),
              })
          : undefined,
        onToggle: handleToggle,
      }}
    >
      <DndProvider options={HTML5toTouch}>
        {props.dragPreviewRender && <DragLayer />}
        <Container parentId={props.rootId} depth={0} />
      </DndProvider>
    </Context.Provider>
  );
});

Tree.displayName = "Tree";

export { Context, Tree };
