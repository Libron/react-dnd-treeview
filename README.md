# React DnD TreeView

A draggable / droppable React-based treeview component.  
You can use render props to create each node freely.

![react-dnd-treeview](https://user-images.githubusercontent.com/3772820/98293395-94441000-1ff1-11eb-81db-b84c31b03c6b.gif)

## Demo

- [JavaScript](https://codesandbox.io/s/full-features-js-itczn) | [TypeScript](https://codesandbox.io/s/full-features-ts-5296j)

## Examples (on CodeSandbox)

Some of the examples below use Material-UI components, but TreeView does not depend on Material-UI, so you can use other libraries or your own custom components.

- Minimum configuration ([JavaScript](https://codesandbox.io/s/minimum-configuration-js-d9kem) | [TypeScript](https://codesandbox.io/s/minimum-configuration-ts-wjigd))
- Custom node ([JavaScript](https://codesandbox.io/s/custom-node-js-lulok) | [TypeScript](https://codesandbox.io/s/custom-node-ts-buimk))
- Custom drag preview ([JavaScript](https://codesandbox.io/s/custom-drag-previewjs-m8rp2) | [TypeScript](https://codesandbox.io/s/custom-drag-preview-ts-bdhgj))
- Select node ([JavaScript](https://codesandbox.io/s/select-node-js-hvlzq) | [TypeScript](https://codesandbox.io/s/select-node-ts-7elv2))
- Multiple selections(checkobx) ([JavaScript](https://codesandbox.io/s/multiple-selections-js-ve17w) | [TypeScript](https://codesandbox.io/s/multiple-selections-ts-eud8c))
- Opening and closing all nodes ([JavaScript](https://codesandbox.io/s/opening-and-closing-all-nodes-js-qn00x) | [TypeScript](https://codesandbox.io/s/opening-and-closing-all-nodes-ts-43j5l))
- Auto expand with drag over node ([JavaScript](https://codesandbox.io/s/auto-expand-with-drag-over-node-js-zksyi) | [TypeScript](https://codesandbox.io/s/opening-and-closing-all-nodes-ts-forked-7rcdk))
- Initialize with open parents ([JavaScript](https://codesandbox.io/s/initialize-with-open-parents-js-hk45o) | [TypeScript](https://codesandbox.io/s/initialize-with-open-parents-ts-9nkw3))

## Getting Started

### Installation

```shell
$ npm install --save @minoru/react-dnd-treeview
```

### Usage

```jsx
import { Tree } from "@minoru/react-dnd-treeview";

...

const [treeData, setTreeData] = useState(initialData);
const handleDrop = (newTreeData) => setTreeData(newTreeData);

<Tree
  tree={treeData}
  rootId={0}
  onDrop={handleDrop}
  render={(node, {depth, isOpen, onToggle}) => (
    <div style={{marginLeft: depth * 10}}>
      {node.droppable && (
        <span onClick={onToggle}>
          {isOpen ? "[-]" : "[+]"}
        </span>
      )}
      {node.text}
    </div>
  )}
/>
```

## Data Structure

In order to display the tree,  
we need to pass the following data to the `Tree` component

### Basic example

The minimal data structure for representing the tree is shown in the following example

```json
[
  {
    "id": 1,
    "parent": 0,
    "droppable": true,
    "text": "Folder 1"
  },
  {
    "id": 2,
    "parent": 1,
    "text": "File 1-1"
  },
  {
    "id": 3,
    "parent": 1,
    "text": "File 1-2"
  },
  {
    "id": 4,
    "parent": 0,
    "droppable": true,
    "text": "Folder 2"
  },
  {
    "id": 5,
    "parent": 4,
    "droppable": true,
    "text": "Folder 2-1"
  },
  {
    "id": 6,
    "parent": 5,
    "text": "File 2-1-1"
  }
]
```

### Optional data

If you want to pass custom properties to each node's rendering,  
you can use the `data` property.

```json
[
  {
    "id": 1,
    "parent": 0,
    "droppable": true,
    "text": "Folder 1"
  },
  {
    "id": 2,
    "parent": 1,
    "text": "File 1-1",
    "data": {
      "fileType": "csv",
      "fileSize": "0.5MB"
    }
  },
  {
    "id": 3,
    "parent": 1,
    "text": "File 1-2",
    "data": {
      "fileType": "pdf",
      "fileSize": "4.8MB"
    }
  },
  {
    "id": 4,
    "parent": 0,
    "droppable": true,
    "text": "Folder 2"
  },
  {
    "id": 5,
    "parent": 4,
    "droppable": true,
    "text": "Folder 2-1"
  },
  {
    "id": 6,
    "parent": 5,
    "text": "File 2-1-1",
    "data": {
      "fileType": "image",
      "fileSize": "2.1MB"
    }
  }
]
```

### Node Properties

| Key       | Type             | Required | Default   | Description                                                                                     |
| --------- | ---------------- | -------- | --------- | ----------------------------------------------------------------------------------------------- |
| id        | number \| string | yes      | -         | Identifier of each node                                                                         |
| parent    | number \| string | yes      | -         | Parent id of each node                                                                          |
| text      | string           | yes      | -         | Node label                                                                                      |
| droppable | boolean          | no       | false     | If `true`, child nodes will be accepted and it will be able to drop other node                  |
| data      | any              | no       | undefined | Additional data to be injected into each node.<br>These data are available in the render props. |

## Component API

| Props             | Type                | Required | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tree              | array               | yes      |           | The data representing the tree structure. An array of node data.                                                                                                                                                                                                                                                                                                                                                                                              |
| rootId            | number \| string    | yes      |           | The id of the root node. It is the parent id of the shallowest node displayed in the tree view.                                                                                                                                                                                                                                                                                                                                                               |
| classes           | object              | no       | undefined | A set of CSS class names to be applied to a specific area in the tree view.<br>See the [Component Styling](#Component-Styling) section for more information.                                                                                                                                                                                                                                                                                                  |
| listComponent     | string              | no       | ul        | The HTML tag for the list.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| listItemComponent | string              | no       | li        | HTML tag for list items.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| render            | function            | yes      |           | The render function of each node.<br>Please refer to the [Render prop](#Render-prop) section for more details about the render functions.                                                                                                                                                                                                                                                                                                                     |
| dragPreviewRender | function            | no       | undefined | Render function for customizing the drag preview.<br>See the [Dragging Preview](#Dragging-Preview) section for more information on customizing the drag preview<br><br>**NOTE**:<br>The default preview is not displayed on touch devices. Therefore, if you want to support touch devices, please define a custom preview in `dragPreviewRender`.                                                                                                            |
| onDrop            | function            | yes      |           | Callback function for when the state of the tree is changed.<br>The new data is passed as the argument.<br>See the [onDrop callback](#onDrop-callback) section for more information.                                                                                                                                                                                                                                                                          |
| canDrop           | function            | no       | undefined | Callback function which should return true or false depending on if a give node should be droppable onto another node.<br>If the canDrop callback is given, the `droppable` property of each node will no longer be referenced.<br>The callback will receive the current tree and an options object which is the same as the one which would be passed to the onDrop callback.<br>See the [canDrop callback](#canDrop-callback) section for more information. |
| sort              | function \| boolean | no       | true      | Passing false will disable sorting. Alternatively, pass a callback to use in place of the default sort callback.                                                                                                                                                                                                                                                                                                                                              |
| initialOpen       | boolean \| array    | no       | false     | If true, all parent nodes will be initialized to the open state.<br>If an array of node IDs is passed instead of the boolean value, only the specified node will be initialized in the open state.                                                                                                                                                                                                                                                            |

### Render prop

To render each tree node, please pass a render function to the `render` property.

```jsx
<Tree
  {...props}
  render={(node, { depth, isOpen, onToggle }) => (
    <div style={{ marginLeft: depth * 10 }}>
      {node.droppable && (
        <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
      )}
      {node.text}
    </div>
  )}
/>
```

The arguments passed to the render function are as follows

| Name             | Type     | Description                                                                                                 |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| data             | object   | Node data. (an element in the tree data array)                                                              |
| options.depth    | number   | The depth of the node hierarchy.                                                                            |
| options.isOpen   | boolean  | The open and closed state of the node.<br>If `droppable` is not `true`, isOpen is always false.             |
| options.hasChild | boolean  | Flag indicating whether or not the node has children. It is true if the node has children, false otherwise. |
| options.onToggle | function | An event handler for the open/close button of a node.                                                       |

### Dragging Preview

By default, the drag preview is a screenshot of a DOM node.  
The `dragPreviewRender` property allows you to display a custom React component instead of a screenshot.

NOTE:  
The default preview is not displayed on touch devices.  
Therefore, if you want to support touch devices, please define a custom preview in `dragPreviewRender`.

```jsx
<Tree
  {...props}
  dragPreviewRender={(monitorProps) => {
    const item = monitorProps.item;

    return (
      <div>
        <p>{item.text}</p>
      </div>
    );
  }}
/>
```

The data passed to `dragPreviewRender` contains the following properties

| Name         | Type   | Description                                                                                                                                                                   |
| ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| item         | object | Node data. (an element in the tree data array)<br>It also includes the `ref` property, which is a reference to the HTML element to be dragged.                                |
| clientOffset | object | The client offset of the pointer during the dragging operation.<br>It is in the format of `{x: number, y: number}`.<br>If the item is not being dragged, it is set to `null`. |

### onDrop callback

If the tree is modified by drag-and-drop, the changes can be retrieved by the `onDrop` callback.

```jsx
const [treeData, setTreeData] = useState(initialTreeData);
const handleDrop = (
  newTree,
  { dragSourceId, dropTargetId, dragSource, dropTarget }
) => {
  // Do something

  setTreeData(newTree);
};

return <Tree {...props} tree={treeData} onDrop={handleDrop} />;
```

The arguments passed to the onDrop callback function are as follows

| Name                 | Type                | Description                                                                                                                      |
| -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| newTree              | array               | This data represents the updated TreeView.<br>To redraw the modified TreeView, you need to set this data to the `tree` property. |
| options.dragSourceId | number \| string    | node id of the dragging source                                                                                                   |
| options.dropTargetId | number \| string    | node id of the drop destination.<br>If the drop destination is the root node, it will be the value of the `rootId` property.     |
| options.dragSource   | object              | node item of the dragging source                                                                                                 |
| options.dropTarget   | object \| undefined | node item of the drop destination.<br>If the drop destination is the root node, it will be `undefined`                           |

### canDrop callback

This callback should return true if the node being dragged can be dropped onto a given node. If it returns false and the user drops the dragged node, no action will be taken and the [onDrop callback](#onDrop-callback) will not be fired.

This callback accepts the same parameters as the onDrop callback except that the first parameter will be the current tree.

```jsx
const canDrop = (
  currentTree,
  { dragSourceId, dropTargetId, dragSource, dropTarget }
) => {
  return true;

  // or

  return false;
};

return <Tree {...props} tree={treeData} canDrop={canDrop} />;
```

Note that this will replace the default behaviour which will not take any action when a drop would not result in a change to the tree structure or when dropping on a node would result in a malformed tree e.g. dropping a droppable node on itself as shown in the below graphic. Therefore, if you pass this callback, you may need to handle such cases.

![malformed tree](https://user-images.githubusercontent.com/3772820/114326837-9d717400-9b71-11eb-91cf-c762c4ab7461.gif)

### Component Styling

You are free to define the styling of individual nodes in the tree in your Render props, but the rest of the tree can be styled by specifying the CSS class name for the `classes` property.

```jsx
<Tree
  {...props}
  classes={{
    root: "my-root-classname",
    dragOver: "my-dragover-classname",
  }}
/>
```

You can use the following keys for the objects you pass to the `classes` property. Neither key is required.

| Name           | Description                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| root           | CSS class name to give to the top-level container element (by default, `ul` tag) that wraps all nodes.         |
| container      | CSS class name to give to the element wrapping the list of nodes of the same hierarchy (by default, `ul` tag). |
| dropTarget     | CSS class name to give to the area that can be dropped during a node dragging operation.                       |
| draggingSource | CSS class name to give to the node during the dragging operation.                                              |

### Usage to openAll, closeAll methods

The open/close state of a node is managed within the Tree component, but methods are available outside the component to open and close all nodes.

```jsx
const ref = useRef(null);

const handleOpenAll = () => ref.current.openAll();
const handleCloseAll = () => ref.current.closeAll();

<Tree
  ref={ref}
  {...props}
>

<button onClick={handleOpenAll}>Open All Folders</button>
<button onClick={handleCloseAll}>Close All Folders</button>
```

## License

MIT.
