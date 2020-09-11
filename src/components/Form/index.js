import React from "react";
import { Form, Input, DatePicker, Select } from "antd";
import { prioritySelect, date } from "./styles";
import { defaultStatusValues, defaultPriorityValues } from "../../constants";
const { Option } = Select;

const AddForm = ({ handleChange, subTaskName, status, priority, dueDate }) => {
  console.log(dueDate);
  return (
    <div>
      <Form>
        <Form.Item>
          <Input
            placeholder="Enter a task"
            style={{ width: "90%" }}
            value={subTaskName}
            onChange={(e) => handleChange(e.target.value, "subTaskName")}
          />
        </Form.Item>
        <Form.Item>
          <Select
            showSearch
            style={{ width: 180 }}
            placeholder="Select a status"
            optionFilterProp="children"
            value={status}
            onChange={(value) => handleChange(value, "status")}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {defaultStatusValues.map((item) => (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Select
            style={prioritySelect}
            showSearch
            value={priority}
            placeholder="Select a priprity"
            optionFilterProp="children"
            onChange={(value) => handleChange(value, "priority")}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {defaultPriorityValues.map((item) => (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <DatePicker
            defaultValue={dueDate}
            style={date}
            onChange={(e, dateString) => handleChange(dateString, "dueDate")}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddForm;
