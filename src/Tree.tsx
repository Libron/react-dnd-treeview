import React, {
  useState,
  createContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";
import { DragLayer } from "./DragLayer";
import { Container } from "./Container";
import { mutateTree, getTreeItem } from "./utils";
import { useOpenIdsHelper } from "./hooks";
import {
  TreeState,
  DragControlState,
  OpenIdsHandlers,
  TreeProps,
} from "./types";

const TreeContext = createContext<TreeState>({} as TreeState);
const DragControlContext = createContext<DragControlState>(
  {} as DragControlState
);

const Tree = forwardRef<OpenIdsHandlers, TreeProps>((props, ref) => {
  const [openIds, { handleToggle, handleCloseAll, handleOpenAll }] =
    useOpenIdsHelper(props.tree, props.initialOpen);

  useImperativeHandle(ref, () => ({
    openAll: () => handleOpenAll(),
    closeAll: () => handleCloseAll(),
  }));

  const canDropCallback = props.canDrop;
  const canDragCallback = props.canDrag;
  const [isLock, setIsLock] = useState(false);

  return (
    <TreeContext.Provider
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
        canDrag: canDragCallback
          ? (id) => canDragCallback(getTreeItem(props.tree, id))
          : undefined,
        onToggle: handleToggle,
      }}
    >
      <DragControlContext.Provider
        value={{
          isLock: isLock,
          lock: () => setIsLock(true),
          unlock: () => setIsLock(false),
        }}
      >
        <DndProvider options={HTML5toTouch}>
          {props.dragPreviewRender && <DragLayer />}
          <Container parentId={props.rootId} depth={0} />
        </DndProvider>
      </DragControlContext.Provider>
    </TreeContext.Provider>
  );
});

Tree.displayName = "Tree";

export { TreeContext, DragControlContext, Tree };
