import "./styles/base.scss";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

import modalStyle from "./components/modal/Modal.module.scss";
import WishlistModal from "./components/wishlistModal/WishlistModal";
import CartModal from "./components/cartModal/CartModal";

function App() {
  return (
    <div id="app">
      <div id="modal" className={modalStyle.modal}>
        <WishlistModal />
        <CartModal />
      </div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
