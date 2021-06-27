import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./componets/App";
import { Provider } from "react-redux";
import { configureStore } from "./store/index";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
