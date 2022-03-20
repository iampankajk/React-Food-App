import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props)=>{
   const [btnHighLighted,setBtnHighLighted] = useState(false);
   const cartCtx = useContext(CartContext);
   const {items} = cartCtx;

   const totalCartItems = items.reduce((curNumber,item)=>{
        return curNumber + item.amount;
   },0);

   const btnClasses = `${classes.button} ${btnHighLighted ? classes.bump: ''}`;

   useEffect(()=>{
       if(items.length === 0){
           return;
       }
        setBtnHighLighted(true);
        const timer = setTimeout(()=>{
            setBtnHighLighted(false);
        },300)

        return ()=>{
            clearTimeout(timer);
        }
   },[items])


    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span> Your Cart</span>
            <span className={classes.badge}> {totalCartItems}</span>
        </button>
    )
};

export default HeaderCartButton;