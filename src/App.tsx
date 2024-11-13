import "./assets/styles/App.scss";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div id="app">
        <Header />
        <main>
          <div id="modal" />
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}

export default App;
