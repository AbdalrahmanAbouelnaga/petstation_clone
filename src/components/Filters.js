import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquare } from "@fortawesome/free-regular-svg-icons"
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons"

import React, { useEffect, useState } from "react"
import { PriceSlider } from "./PriceSlider"
const Filters = ({filters,urlParams}) => {


    

    const keys = Object.keys(filters)
    const value = urlParams.get(keys[0])
    if (value !== null){
        if (keys[0]==="brands"){
        filters[keys[0]]=filters[keys[0]].filter(item=>item.slug===value)
        }else{
            filters[keys[0]] = filters[keys[0]].filter(item=>item===value)
        }
    }


  return (
                <ul className="filter-group">
                    <li className="list-group-item list-title">
                        <h4>Filter By {keys[0]}</h4>
                    </li>
                    {
                        (!(keys[0]==="price")&&(value === null))?filters[keys[0]].map((filter,index)=>(
                            <li className="list-group-item" key={index}>
                            <a href={window.location.href.includes("?")?window.location.href+`&${keys[0]}=${keys[0]==="brands"?filter.slug:filter}`:window.location.href+`?${keys[0]}=${keys[0]==="brands"?filter.slug:filter}`}>
                                <FontAwesomeIcon icon={faSquare} style={{marginRight:"5px"}}/>
                                {keys[0]==="brands"?filter.title:filter}
                                </a>
                            </li>
                            )):(!(keys[0]==="price")&&(value !== null))?(
                                <li className="list-group-item">
                            <a href={window.location.href.replace(`${keys[0]}=${keys[0]==="brands"?filters[keys[0]][0].slug:filters[keys[0]][0]}`,"")}>
                                <FontAwesomeIcon icon={faSquareCheck} style={{marginRight:"5px"}}/>
                                {keys[0]==="brands"?filters[keys[0]][0].title:filters[keys[0]]}
                                </a>
                            </li>
                            ):(
                                <PriceSlider priceRange={filters[keys[0]]}/>
                            )
                    }
                </ul>
  )
}

export default Filters