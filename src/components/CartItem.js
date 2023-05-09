import { useDispatch } from "react-redux"
import { changeQuantity,removeFromCart } from "../store/slices/cartSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

export const CartItem = ({item}) => {
    const dispatch = useDispatch()
  return (
    <tr>
        <td><img src={item.product.images[0].image} alt="" /></td>
        <td><span>{item.product.title+ " " + item.product.variants[item.variantIndex].size}</span></td>
        <td className="cell-small"><input type="number" name="quantity" value={item.quantity} max="100" onChange={(e)=>{dispatch(changeQuantity({id:item.product.id,variantIndex:item.variantIndex,quantity:parseInt(e.target.value)||""}))}}/></td>
        <td className="cell-small price"><span>${(item.quantity*item.product.variants[item.variantIndex].price).toFixed(2)}</span></td>
        <td className="cell-small"><a className="delete" onClick={()=>dispatch(removeFromCart({id:item.product.id,variantIndex:item.variantIndex}))}><FontAwesomeIcon icon={faTrashAlt} /></a></td>
    </tr>
  )
}
