import { Fragment,useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";


function App() {

  const [cartIsShown,setCartShown] = useState(false);

  const cartShowHandler = ()=>{
    setCartShown(true);
  }

  const hideCartHandler = ()=>{
    setCartShown(false);
  }
  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={cartShowHandler}/>
      <main>
        <Meals/>
      </main>
    </Fragment>
  );
}

export default App;
