import { useSelector,useDispatch } from "react-redux"
import { updateCart } from "../store/slices/cartSlice"
import { CartItem } from "../components/CartItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faRefresh, faReply } from "@fortawesome/free-solid-svg-icons"

export const Cart = () => {
    const cart = useSelector((state)=>state.cart)
    const dispatch = useDispatch()

  return (
    <div className="cartTable">
        <div className="container">
            {cart.items.length>0?
                (
                <>
                <div className="cart-header">
                <h1 className="h1">Shopping Cart</h1>
            </div>
            <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Description</th>
                            <th className="cell-small">quantity</th>
                            <th className="cell-small">price</th>
                            <th className="cell-small"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.items.map((item,index)=>(
                                <CartItem item={item} key={index} />
                            ))
                        }
                    </tbody>
            </table>
            <div>
                <hr />
            </div>
            <div className="btns">
                <div className="btn-div">
                    <a href="/" className="btn btn-default"><span><FontAwesomeIcon icon={faReply}></FontAwesomeIcon></span>Continue Shopping</a>
                    <button className="btn btn-default" onClick={()=>{dispatch(updateCart())}}><span><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></span>Update My Changes</button>
                </div>
            </div>
            </>
            ):(
                <>
                <div className="cart-header">
                <h1 className="h1">Your Shopping cart is empty!</h1>
            </div>
            <div className="btns">
                <div className="btn-div">
                <a href="/" className="btn btn-default home-btn"><span><FontAwesomeIcon icon={faHome}></FontAwesomeIcon></span> Start Shopping</a>
                </div>
            </div>
            </>
            )}
        </div>
    </div>
  )
}
