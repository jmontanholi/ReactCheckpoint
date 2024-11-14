import "./assets/styles/App.scss";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

import { store } from "./store/store";
import { Provider } from "react-redux";

import modalStyle from "./components/modal/Modal.module.scss";

function App() {
  return (
    <Provider store={store}>
      <div id="app">
        <div id="modal" className={modalStyle.modal} />
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}

export default App;
