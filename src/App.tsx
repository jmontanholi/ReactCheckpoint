import React from "react";
import "./styles/App.scss";
import Header from "./components/header/Header.tsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
