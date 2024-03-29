import React, { useState,useEffect,useRef, useLayoutEffect } from 'react'

const SliderState = ({priceRange})=>{
  console.log(priceRange)
  if (priceRange.length===1){
    priceRange.unshift(0)
  }
  const [drag,setDrag] = useState(false)
  const [dragTarget,setDragTarget] = useState(null)
  const [relative,setRelative] = useState(0)
  const [maxWidth,setMaxWidth] = useState(221)
  const [leftMin,setMin]=useState(0)
  const [leftMax,setMax] = useState(100)
  const low = useRef((priceRange[0]*(1+(leftMin/100))).toFixed(2))
  const high = useRef((priceRange[1]*(leftMax/100)).toFixed(2))


  useLayoutEffect(()=>{
    setRelative(document.querySelector("#price-range").getBoundingClientRect().left)
},[])


const mouseDown = React.useCallback((event)=>{
  const posX = event.clientX
  setDrag(true)
  if (event.target.tagName==="SPAN"){

      let left = (((posX-relative)/maxWidth)*100)<0?0:(((posX-relative)/maxWidth)*100)>100?100:(((posX-relative)/maxWidth)*100)
      setDragTarget(event.target)
      if (event.target.id === "min"){
          setMin(left)
          low.current = (priceRange[0]*(1+(leftMin/100))).toFixed(2)
      }
      if (event.target.id === "max"){
          setMax(left)
          high.current = (priceRange[1]*(leftMax/100)).toFixed(2)
      }


  }
})

const mouseMove = React.useCallback(event=>{
  if (event.target.tagName==="SPAN" && drag){
  const posX = event.clientX

  let left = (((posX-relative)/maxWidth)*100)<0?0:(((posX-relative)/maxWidth)*100)>100?100:(((posX-relative)/maxWidth)*100)
  if (dragTarget.id === "min"){
      setMin(left)
      low.current =parseFloat(priceRange[0]) + parseFloat((priceRange[1] - priceRange[0])*(leftMin/100))

  }
  if (dragTarget.id === "max"){
      setMax(left)
      high.current = parseFloat(priceRange[0]) + parseFloat((priceRange[1] - priceRange[0])*(leftMax/100))

  }

  }
})




const mouseUp = React.useCallback(event=>{
  setDrag(false)
})


const props = {
  low:low,
  high:high,
  leftMin:leftMin,
  leftMax:leftMax,
  mouseDown:mouseDown,
  mouseUp:mouseUp,
  mouseMove:mouseMove,
}

return props

}


export const PriceSlider = ({priceRange}) => {
  console.log(priceRange)
  const props = SliderState({priceRange})

  return (
    <li className="list-group-item">
    <div id="price-range" onMouseOut={function(e){props.mouseUp(e)}} onMouseDown={function(e){props.mouseDown(e)}} onMouseMove={function(e){props.mouseMove(e)}} onMouseUp={function(e){props.mouseUp(e)}}>
        <div style={{width:`${props.leftMax-props.leftMin}%`,left:`${props.leftMin}%`}}></div>
        <span id="min" style={{left:`${props.leftMin}%`}}></span>
        <span id="max" style={{left:`${props.leftMax}%`}}></span>
    </div>
    <p id="price-range-text">
      {`$${parseFloat(props.low.current).toFixed(2)} to $${parseFloat(props.high.current).toFixed(2)}`}
    </p>
    <form action={window.location.pathname+window.location.search}>
      <input className='hidden' type='number' value={props.low.current} name='low' />
      <input className='hidden' type='number' value={props.high.current} name='high' />
      <input type="submit" className='btn' value='Filter By Price' />
    </form>
    </li>
  )
}
