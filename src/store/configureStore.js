import { createStore, combineReducers } from "redux";
import todoReducer from "../reducers/todo";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      tasksState: todoReducer,
    })
  );
  return store;
};

export default configureStore;
