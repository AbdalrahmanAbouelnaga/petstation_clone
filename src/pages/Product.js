import home_icon from '../home-icon.png'
import { faArrowRight,faCheckCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../styles/product.css'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useSelector,useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'

const Product = ()=>{
    const [urlParams,setUrlParams] = useSearchParams()
    const [product,setProduct] = useState({})
    const [variantIndex,setVariantIndex] = useState(0)
    const [quantity,setQuantity] = useState(1)

    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get(window.location.pathname)
             .then(res=>setProduct(res.data))
             .catch(err=>console.log(err.response.data))
    },[])

    const productEl = typeof product.images === "object"?(
        <div className="container">
            <div className="product-main">
                <div className="left">
                    <img src={product.images[0].image} alt="" />
                </div>
                <div className="right">
                    <p className="title">{product.title} - {product.variants[variantIndex].size}</p>
                    <p className="variant-price">${product.variants[variantIndex].price} <span><FontAwesomeIcon icon={faCheckCircle} /> in Stock</span></p>
                    {product.has_variants?(
                        <div className="size-container">
                            <div className="label">Select size</div>
                            <div className="size-list">
                                {product.variants.map((variant,index)=>(
                                    <div id={`size-${index}`} className={`size-choice`} style={{width:`${100/product.variants.length}%`}} key={index}>
                                        <a id={`${index}`} className={`size-text ${index === variantIndex?"selected":""}`} onClick={(e)=>{setVariantIndex(parseInt(e.target.id))}}>{variant.size}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ):null}
                    <div className="add-to-cart">
                        <div className="quantity-container">
                            <div className="label">
                                Quantity
                            </div>
                            <div className="cart-add">
                                <div className="quantity">
                                    <a className="plus-minus-span" onClick={()=>{setQuantity(quantity!==1?(quantity-1):1)}}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </a>
                                    <a className="plus-minus-span" onClick={()=>setQuantity(quantity+1)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </a>
                                    <input id='qty-input' type="number" name='qty' value={quantity} onChange={(e)=>{setQuantity(parseInt(e.target.value)||1)}}/>
                                </div>
                                <button className='add-btn' onClick={()=>dispatch(addToCart({product,quantity,variantIndex}))}>Add to Cart</button>
                                <div className="wishlist">
                                    <a>
                                        <span>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ):null

    return (
        <>
        <div className="crumbs-container">
            <div className="container">
                <div className="bread-crumbs">
                    <a href="/" className="bread-crumb">
                        <img src={home_icon} alt="home" />
                    </a>
                    {
                        (window.location.pathname.endsWith("/")?window.location.pathname.slice(1).slice(0,-1).split("/"):window.location.pathname.slice(1).split("/")).map((item,index)=>(
                            <div key={index} style={{display:"inline",verticalAlign:"middle",lineHeight:"2"}}>
                            <FontAwesomeIcon icon={faArrowRight} width={44} key={`arrow-${index}`}/>
                            <a href={`/${window.location.pathname.slice(1).slice(0,-1).split("/").slice(0,index+1).join("/")}`} key={`bread-${index}`} className="bread-crumb">
                                {item.replace(/-/g," ")}
                            </a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        {productEl}
        </>
    )
}

export default Product