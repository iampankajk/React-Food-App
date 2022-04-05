
const Checkout = props=>{
    const confirmHandler = event=>{
        event.preventDefault();
    }
    return <form onSubmit={confirmHandler}>
        <div>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name"></input>
        </div>
        <div>
            <label htmlFor="street">street</label>
            <input type="text" id="street"></input>
        </div>
        <div>
            <label htmlFor="postal">Postal code</label>
            <input type="text" id="postal"></input>
        </div>
        <div>
            <label htmlFor="city">city</label>
            <input type="text" id="city"></input>
        </div>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
    </form>
};

export default Checkout;