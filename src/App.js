import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";


function App() {

  const [cartIsShown,setCartShown] = useState(false);

  const cartShowHandler = ()=>{
    setCartShown(true);
  }

  const hideCartHandler = ()=>{
    setCartShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={cartShowHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
