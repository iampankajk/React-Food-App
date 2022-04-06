import { useContext, useState,Fragment} from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {

    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmitting] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id)=>{
        cartCtx.removeItem(id)
    };
    const cartItemAddHandler = (item)=>{
        cartCtx.addItem({...item,amount:1});
    };

    const orderHandler = ()=>{
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData)=>{
       setIsSubmitting(true);
       await fetch('https://react-practise-b6d2c-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items,

            })
        });
        setIsSubmitting(false);
        setDidSubmitting(true)
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item=><li>
            <CartItem 
            key={item.id}
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
            />
        </li>)}</ul>

    const modalAction =  <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>

    const cartModalContent = (
        <Fragment>{cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {!isCheckout && modalAction}</Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data....</p>
    const didSubmitModalContent = <Fragment>
        <p>Order sent successfully.....</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </Fragment> 
    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
       
    </Modal>
};

export default Cart;