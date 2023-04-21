import { useEffect, useState } from "react"
import axios from "axios"
import { faChevronLeft,faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Carousel } from "../components/Carousel"


import '../styles/homepage.css'

const Homepage = () => {
    const [carousel,setCarousel] = useState([])

    useEffect(()=>{
        axios.get("/carousel/")
             .then(res=>{
                setCarousel(res.data)
            })

             .catch(err=>console.log(err))
    },[])

    
        
  return (
    <div id="homepage-carousel" className="carousel">
    <ul id="carousel-indicators" className="carousel-indicators">
        {carousel.map((item)=>(
            <li data-target="#homepage-carousel" key={item.priority} data-slide-to={item.priority}>
            </li>
        ))}
    </ul>
    <div id="inner-carousel" className="carousel">
        <Carousel carousel={carousel} />
    </div>

    </div>
  )
}


export default Homepage