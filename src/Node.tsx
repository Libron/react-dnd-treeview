import React, {
  useEffect,
  useRef,
  useCallback,
  useContext,
  RefObject,
  PropsWithChildren,
  ReactElement,
} from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Container } from "./Container";
import {
  useTreeContext,
  useDragNode,
  useDropNode,
  useDragControl,
} from "./hooks";
import { PlaceholderContext } from "./providers";
import { NodeModel, RenderParams } from "./types";
import { isDroppable } from "./utils";

type Props = PropsWithChildren<{
  id: NodeModel["id"];
  depth: number;
  parentRef: RefObject<HTMLElement>;
}>;

export const Node = <T extends unknown>(props: Props): ReactElement | null => {
  const treeContext = useTreeContext<T>();
  const placeholderContext = useContext(PlaceholderContext);
  const ref = useRef<HTMLElement>(null);
  const item = treeContext.tree.find((node) => node.id === props.id);
  const { openIds, classes } = treeContext;
  const open = openIds.includes(props.id);

  if (!item) {
    return null;
  }

  const [isDragging, drag, preview] = useDragNode(item, ref);
  const [isOver, dragSource, drop] = useDropNode(item, ref);

  drag(ref);

  if (isDroppable(dragSource?.id, props.id, treeContext)) {
    drop(ref);
  }

  const hasChild = !!treeContext.tree.find((node) => node.parent === props.id);

  useEffect(() => {
    if (treeContext.dragPreviewRender) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, []);

  useDragControl(ref);

  const handleToggle = useCallback(() => {
    treeContext.onToggle(item.id);
  }, [openIds]);

  const Component = treeContext.listItemComponent;

  let className = classes?.listItem || "";

  if (isOver && classes?.dropTarget) {
    className = `${className} ${classes.dropTarget}`;
  }

  if (isDragging && classes?.draggingSource) {
    className = `${className} ${classes.draggingSource}`;
  }

  const draggable = treeContext.canDrag ? treeContext.canDrag(props.id) : true;
  const isDropTarget = placeholderContext.dropTargetId === props.id;

  const params: RenderParams = {
    depth: props.depth,
    isOpen: open,
    isDragging,
    isDropTarget,
    draggable,
    hasChild,
    parentRef: props.parentRef,
    containerRef: ref,
    onToggle: handleToggle,
  };

  return (
    <Component ref={ref} className={className} role="listitem">
      {treeContext.render(item, params)}
      {open && hasChild && (
        <Container parentId={props.id} depth={props.depth + 1} />
      )}
    </Component>
  );
};
