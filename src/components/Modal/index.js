import React from "react";
import { Modal } from "antd";
import AddForm from "../Form";

class AddTodoModal extends React.Component {
  state = {
    confirmLoading: false,
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState(
        {
          confirmLoading: false,
        },
        () => this.props.handleSubmit()
      );
    }, 2000);
  };

  render() {
    const { confirmLoading } = this.state;
    const {
      isAddFormOpen,
      handleAddFormOpen,
      handleChange,
      isAllValuesEntered,
      subTaskName,
      status,
      priority,
      dueDate,
    } = this.props;
    return (
      <>
        <Modal
          title="Add a task"
          visible={isAddFormOpen}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleAddFormOpen}
          width={496}
          okButtonProps={{ disabled: !isAllValuesEntered }}
          centered
        >
          <AddForm
            handleChange={handleChange}
            subTaskName={subTaskName}
            status={status}
            priority={priority}
            dueDate={dueDate}
          />
        </Modal>
      </>
    );
  }
}

export default AddTodoModal;
