import React, { useState, useCallback, useRef, useEffect } from "react";
import { Table } from "antd";
import { DndProvider, useDrag, useDrop, createDndContext } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { PlusOutlined } from "@ant-design/icons";
import { rootTable, addWrapper, addIconWrapper } from "./styles";

const RNDContext = createDndContext(HTML5Backend);

const type = "DragableBodyRow";

const DragableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};

const DragTable = ({ subTasks, handleAddFormOpen }) => {
  const [data, setData] = useState(subTasks);

  useEffect(() => {
    setData(subTasks);
  }, [subTasks]);

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  const { Column } = Table;

  const manager = useRef(RNDContext);
  return (
    <DndProvider manager={manager.current.dragDropManager}>
      <Table
        style={rootTable}
        dataSource={data}
        pagination={false}
        hasData
        expandable
        tableLayout={"auto"}
        components={components}
        onRow={(record, index) => ({
          index,
          moveRow,
        })}
        size="middle"
      >
        <Column
          title="Things to do"
          dataIndex="subTaskName"
          key="subTaskName"
        />
        <Column title="Status" dataIndex="status" key="status" />
         <Column title="Owner" dataIndex="status" key="status" /> 
        <Column title="Due date" dataIndex="dueDate" key="dueDate" />
        <Column title="Priority" dataIndex="priority" key="priority" />
      </Table>
      <div style={addWrapper}>
        <span style={addIconWrapper} onClick={handleAddFormOpen}>
          <PlusOutlined /> Add
        </span>
      </div>
    </DndProvider>
  );
};

export default DragTable;
