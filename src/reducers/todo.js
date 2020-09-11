const initialState = {
  tasks: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        tasks: [...state.tasks, action.payload],
      };
    case "ADD_SUB_TASK":
      const { payload } = action;
      const stateClone = [...state.tasks];
      const activeTask = stateClone.find(
        (item) => item.id === payload.activeTaskId
      );
      activeTask["subTasks"] = [...activeTask.subTasks, { ...payload.data }];
      return {
        tasks: stateClone,
      };
    default:
      return state;
  }
};

export default todoReducer;
