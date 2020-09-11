import React, { Component } from "react";
import SideBar from "../SideBar";
import { connect } from "react-redux";
// import { Divider } from "antd";
import DragTable from "../../components/Table";
import AddTodoModal from "../../components/Modal";
import { addSubTask } from "../../actions/todo";
import { v4 as uuidv4 } from "uuid";
import {
  sideNavWrapper,
  mainBodyWrapper,
  mainBodyContentWrapper,
} from "./styles";

export class Core extends Component {
  state = {
    activeTaskId: "",
    isAddFormOpen: false,
    subTaskName: null,
    status: null,
    priority: null,
    dueDate: null,
  };

  handleAddFormOpen = () => {
    this.setState({ isAddFormOpen: !this.state.isAddFormOpen });
  };

  handleActiveTask = (activeTaskId) => {
    this.setState({ activeTaskId });
  };

  handleChange = (input, type) => {
    this.setState({ [type]: input });
  };

  handleSubmit = () => {
    const { activeTaskId, dueDate, priority, status, subTaskName } = this.state;
    const payload = {
      data: {
        key: uuidv4(),
        subTaskName,
        status,
        priority,
        dueDate,
        // key: status,
      },
      activeTaskId,
    };
    this.props.addSubTask(payload);
    this.setState({
      isAddFormOpen: !this.state.isAddFormOpen,
      subTaskName: null,
      status: null,
      priority: null,
      dueDate: null,
    });
  };

  render() {
    const { tasks } = this.props;
    const activeTask = tasks.find(
      (task) => task.id === this.state.activeTaskId
    );
    let isAllValuesEntered = false;
    const { subTaskName, status, priority, dueDate } = this.state;
    if (subTaskName && status && priority && dueDate) isAllValuesEntered = true;

    return (
      <>
        <div style={sideNavWrapper}>
          <SideBar handleActiveTask={this.handleActiveTask} />
        </div>
        <div style={mainBodyWrapper}>
          <div style={mainBodyContentWrapper}>
            {activeTask ? (
              <div>
                <h5>{activeTask.title}</h5>
                <div>
                  <DragTable
                    handleAddFormOpen={this.handleAddFormOpen}
                    subTasks={activeTask.subTasks}
                  />
                  <AddTodoModal
                    isAddFormOpen={this.state.isAddFormOpen}
                    handleAddFormOpen={this.handleAddFormOpen}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    isAllValuesEntered={isAllValuesEntered}
                    subTaskName={subTaskName}
                    status={status}
                    priority={priority}
                    dueDate={dueDate}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasksState.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubTask: (payload) => dispatch(addSubTask(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Core);
