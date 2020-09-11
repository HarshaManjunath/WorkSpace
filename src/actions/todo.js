export const addTask = (payload) => {
  return {
    type: "ADD_TASK",
    payload,
  };
};

export const addSubTask = (payload) => {
  return {
    type: "ADD_SUB_TASK",
    payload,
  };
};
