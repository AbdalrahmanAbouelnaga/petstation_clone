import cartIcon from "../cart-icon.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import '../styles/cartTable.css'

const Cart = () => {
    const cart = useSelector((state)=>state.cart)
    const dispatch = useDispatch()

  return (
    <div className="cart">
                <a id="cart-btn" className="btn" onClick={(e)=>{e.currentTarget.classList.toggle("open");document.querySelector("#cart-dropdown").classList.toggle("hidden")}}>
                  <img
                    src={cartIcon}
                    style={{
                      width: "43px",
                      height: "35px",
                      paddingRight: "10px",
                      verticalAlign: "middle",
                    }}
                    alt=""
                  />
                  <span>Cart</span>
                  
                  <span className="cart-number">{cart.items.reduce((acc,curVal)=>(acc+=curVal.quantity),0)||0}</span>
                </a>
                <div className="cart-dropdown hidden" id="cart-dropdown">
                    {
                      cart.items.length>0?(
                        <>
                        {cart.items.map((item,index)=>(
                          <li className="cart-item">
                            <img src={item.product.images[0].image} alt="" />
                            <div className="item-text">
                              <FontAwesomeIcon icon={faCircleXmark} onClick={()=>{dispatch(removeFromCart({id:item.product.id,variantIndex:item.variantIndex}))}}/>
                              <span className="item-title"><a href={item.product.url}><span className="quantity">{item.quantity}</span>{` x ${item.product.title} ${item.product.variants[item.variantIndex].size}`}</a></span>
                              <span className="item-price">{`Price: $${item.quantity*item.product.variants[item.variantIndex].price}`}</span>
                            </div>
                          </li>
                        ))}
                        <br />
                        <span>Total Item(s): <b>{cart.items.reduce((acc,curVal)=>(acc+=curVal.quantity),0)||0}</b></span>
                        <br />
                        <span>Total Price: <b>${cart.items.reduce((acc,curVal)=>(acc+=parseFloat(curVal.quantity*(curVal.product.variants[curVal.variantIndex].price))),0).toFixed(2)}</b></span>
                        <br />
                        <div className="cart-btns">
                          <a href="/cart" className="view-cart cart-btn">View Cart</a>
                          <a href="/checkout" className="checkout cart-btn">Checkout</a>
                        </div>
                        </>
                      ):(
                        <li className="cart-empty">
                          <div className="text">
                          Your shopping cart is empty. Add items to your cart and they will appear here.
                          </div>
                        </li>
                      )
                    }
                </div>
              </div>
  )
}


export default Cart