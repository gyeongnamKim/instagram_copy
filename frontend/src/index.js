import React from "react";
import { render } from "react-dom";
import "index.css";
import Root from "pages";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  rootElement
);
