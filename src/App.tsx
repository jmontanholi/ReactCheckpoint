import "./assets/styles/App.scss";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
