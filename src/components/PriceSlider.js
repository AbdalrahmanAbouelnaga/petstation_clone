import React, { useState,useEffect,useRef } from 'react'
export const PriceSlider = ({priceRange}) => {
  const [drag,setDrag] = useState(false)
  const [dragTarget,setDragTarget] = useState(null)
  const [relative,setRelative] = useState(0)
  const [maxWidth,setMaxWidth] = useState(221)
  const [leftMin,setMin]=useState(0)
  const [leftMax,setMax] = useState(100)
  const low = useRef((priceRange.low*(1+(leftMin/100))).toFixed(2))
  const high = useRef((priceRange.high*(leftMax/100)).toFixed(2))

  console.log(priceRange)

  useEffect(()=>{
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
            low.current = (priceRange.low*(1+(leftMin/100))).toFixed(2)
        }
        if (event.target.id === "max"){
            setMax(left)
            high.current = (priceRange.high*(leftMax/100)).toFixed(2)
        }


    }
})

const mouseMove = React.useCallback(event=>{
    if (event.target.tagName==="SPAN" && drag){
    const posX = event.clientX

    let left = (((posX-relative)/maxWidth)*100)<0?0:(((posX-relative)/maxWidth)*100)>100?100:(((posX-relative)/maxWidth)*100)
    if (dragTarget.id === "min"){
        setMin(left)
        low.current = (priceRange.low*(1+(leftMin/100))).toFixed(2)

    }
    if (dragTarget.id === "max"){
        setMax(left)
        high.current = (priceRange.high*(leftMax/100)).toFixed(2)

    }

    }
})
const mouseUp = React.useCallback(event=>{
    setDrag(false)
})


  return (
    <>
    <p id="price-range" onMouseOut={function(e){mouseUp(e)}} onMouseDown={function(e){mouseDown(e)}} onMouseMove={function(e){mouseMove(e)}} onMouseUp={function(e){mouseUp(e)}}>
        <div style={{width:`${leftMax-leftMin}%`,left:`${leftMin}%`}}></div>
        <span id="min" style={{left:`${leftMin}%`}}></span>
        <span id="max" style={{left:`${leftMax}%`}}></span>
    </p>
    <p id="price-range-text">
      {`$${low.current} to $${high.current}`}
    </p>
    <form action={window.location.pathname+window.location.search+`&low=${low.current}&high=${high.current}`}>
      <button type='submit' className='btn'>Filter By Price</button>
    </form>
    </>
  )
}
