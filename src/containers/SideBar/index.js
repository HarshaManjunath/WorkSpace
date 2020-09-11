import React, { useState, useEffect } from "react";
import { Menu, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  HomeFilled,
  SearchOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  root,
  sideNavTitle,
  rootTitle,
  iconWrapper,
  addIcon,
  addNewMenuItem,
  noTaskText,
  inputStyle,
} from "./styles";
import { connect } from "react-redux";
import { addTask } from "../../actions/todo";

const { SubMenu } = Menu;

function SideBar(props) {
  const { tasks } = props;
  const [open, setOpen] = useState(false);
  const [tasksState, setTasksState] = useState(tasks);
  const [tasksStateClone, setTasksStateClone] = useState(tasks); // cloning for search logic

  useEffect(() => {
    setTasksState(tasks);
    setTasksStateClone(tasks);
  }, [tasks]);

  const handleAddMenuItem = () => {
    setOpen(!open);
  };
  const handleClick = (e) => {
    props.handleActiveTask(e.key);
  };
  const handleFilterTasks = (e) => {
    const searchedText = e.target.value;
    const tasksClone = [...tasksStateClone];
    if (searchedText.length) {
      const filteredTasks = tasksClone.filter((task) => {
        return task.title.includes(searchedText);
      });
      setTasksState(filteredTasks);
    } else {
      setTasksState(tasksStateClone);
    }
  };
  const addTask = (e) => {
    if (e.key === "Enter") {
      const payload = {
        id: uuidv4(),
        title: e.target.value,
        subTasks: [],
      };
      props.addTask(payload);
      setOpen(!open);
    }
  };

  return (
    <Menu onClick={handleClick} style={root} mode="inline">
      <div style={rootTitle}>
        <p style={sideNavTitle}>Workspaces</p>
        <Input
          size="small"
          placeholder="Filter boards.."
          prefix={<SearchOutlined className="site-form-item-icon" />}
          bordered={false}
          onChange={(e) => handleFilterTasks(e)}
        />
      </div>
      <SubMenu key="sub1" icon={<HomeFilled />} title="Main">
        <span style={iconWrapper} onClick={handleAddMenuItem}>
          {!open ? (
            <PlusCircleOutlined style={addIcon} />
          ) : (
            <CloseCircleOutlined style={addIcon} />
          )}
        </span>
        <Menu.ItemGroup>
          {tasksState.length ? (
            tasksState.map((item) => {
              return <Menu.Item key={item.id}>{item.title}</Menu.Item>;
            })
          ) : (
            <Menu.Item style={noTaskText}>No tasks found</Menu.Item>
          )}
        </Menu.ItemGroup>
        {open && (
          <span style={addNewMenuItem}>
            <Input
              style={inputStyle}
              size="small"
              placeholder="Add new item"
              bordered={false}
              onKeyDown={(e) => addTask(e)}
            />
          </span>
        )}
      </SubMenu>
    </Menu>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasksState.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (payload) => dispatch(addTask(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
