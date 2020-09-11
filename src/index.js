import React from "react";
import ReactDOM from "react-dom";
import Core from "./containers/Core";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "./index.css";

const store = configureStore();

const todoProvider = (
  <Provider store={store}>
    <Core />
  </Provider>
);

ReactDOM.render(todoProvider, document.getElementById("root"));

serviceWorker.unregister();
