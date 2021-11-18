import React from "react";
import AppHeadaer from "./AppHeader";
import AppFooter from "./AppFooter";

function AppLayout({ children }) {
  return (
    <>
      <AppHeadaer />
      {children}
      <AppFooter />
    </>
  );
}

export default AppLayout;
