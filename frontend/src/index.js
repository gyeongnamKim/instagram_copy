import React from "react";
import { render } from "react-dom";
import "index.css";
import Root from "pages";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "store";
import "antd/dist/antd.css";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <AppProvider>
      <Root />
    </AppProvider>
  </BrowserRouter>,
  rootElement
);
