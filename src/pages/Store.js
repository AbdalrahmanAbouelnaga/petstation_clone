import { useParams, useSearchParams } from "react-router-dom"
import "../styles/store.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Filters from "../components/Filters"
import home_icon from '../home-icon.png'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Store = () => {
    const [urlParams,setUrlParams] = useSearchParams()
    const [filter_values,setFilterValues]  = useState({
        sizes:"",
        brands:"",
        price:[]
    })
    useEffect(()=>{
        setFilterValues(()=>(
            {
                sizes: urlParams.get("sizes")!==null?urlParams.get("sizes"):"",
                brands: urlParams.get("brands")!==null?urlParams.get("brands"):"",
                price: {
                    low: urlParams.get("low")!==null?urlParams.get("low"):"",
                    high: urlParams.get("high")!==null?urlParams.get("high"):"",
                }
            }
        ))
    },[])
    const [products,setProducts] = useState([])
    useEffect(()=>{
        axios.get(window.location.pathname+window.location.search)
             .then(res=>setProducts(res.data.products))
             .catch(err=>console.log(err))
    },[])

    const sizes = []
    const brands = []
    const price = []
    products.forEach((prod)=>{
        if (!brands.includes(prod.brand)){
            brands.push(prod.brand)
        }
        prod.variants.forEach(variant=>{
            if (price.length===0){
                price.push(variant.price)
            }else if (price.length===1 && price[0]<variant.price){
                price.unshift(variant.price)
            }else if (price.length===1 && price[0]>variant.price){
                console.log(price)
                price.push(variant.price)
            }else if (price.length>1){
                if (variant.price>price[1]){
                    price[1] = variant.price
                }else if (variant.price < price[0]){
                    price[0] = variant.price
                }
            }
        })
        prod.variants.forEach(variant=>(!sizes.includes(variant.size)?sizes.push(variant.size):null))

    })
    const filters = [
        {
            sizes
        },
        {
            price
        },
        {
            brands
        }
    ]

    const params = Object.values(useParams())
    const header = params[params.length - 1].replaceAll("-"," ")
    
  return (
    <>
    <div className="container">
        <div className="bread-crumbs">
                    <a href="/" className="bread-crumb">
                        <img src={home_icon} alt="home" />
                    </a>
                    {
                        (window.location.pathname.endsWith("/")?window.location.pathname.slice(1).slice(0,-1).split("/"):window.location.pathname.slice(1).split("/")).map((item,index)=>(
                            <div key={index} style={{display:"inline"}}>
                            <FontAwesomeIcon icon={faArrowRight} width={44} key={`arrow-${index}`}/> 
                            <a href={`/${window.location.pathname.slice(1).slice(0,-1).split("/").slice(0,index+1).join("/")}`} key={`bread-${index}`} className="bread-crumb">
                                {item.replace(/-/g," ")}
                            </a>
                            
                            </div>
                        ))
                    }
                </div>
    </div>
    <div className="container" id="content">
        
        {
            products.length>0?(
            <>
            <aside className="sidebar">
            <div className="panel">
                <div className="panel-heading">
                    <h3>Filter Products</h3>
                </div>
                {
                    filters.length>0?(
                        filters.map((filter,index)=>(
                           <Filters filters={filter} urlParams={urlParams} key={Object.keys(filter)[0]} />
                        ))):null
                }
            </div>
        </aside>
        <div className="main-content">
            <h1 className="page-header">
                {header}
            </h1>
            <div id="product-list">
                {
                    products.map((product,index)=>(
                        <div className="product" key={index}>
                            <a className="product-thumb" href={product.url}>
                                <img height={200} src={product.images[0].image} alt={product.title} className="product-img" />
                            </a>
                            <div className="caption">
                                <h3 className="product-title">
                                    <a href={product.url}>
                                        {product.has_variants?`${product.title} - ${product.variants.length} sizes`:`${product.title} - ${product.variants[0].size}`}  
                                    </a></h3>
                                <p className="price">
                                    {product.has_variants?`From $${product.variants[0].price}`:`$${product.variants[0].price}`}
                                </p>
                                {
                                    product.has_variants?(
                                        <>
                                        <div className="size-list">
                                            {
                                                product.variants.map((variant,index)=>(
                                                    <div className="size" key={index}>
                                                        <a href={product.url+`?size=${variant.size}`}>{variant.size}</a>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <a href={product.url} className="cart-button">
                                            see options
                                        </a>
                                        </>
                                    ):(
                                        <form className="cart-button">
                                            <a className="btn">
                                                Add to cart
                                            </a>
                                        </form>
                                    )
                                }
                               
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
        </>
        ):(
            <h3>
                Sorry, We are out of {header} Products.
            </h3>
        )
        }
    </div>
    </>
  )
}
