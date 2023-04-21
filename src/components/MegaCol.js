import React from 'react'

const MegaCol = ({cat}) => {
    let navItems = cat.sub_categories.map((sub,index)=>(
        <li key={index}>
            <a href={sub.url} className="mega-col-item">{sub.title}</a>
        </li>
    ))
  return (
    <div className="mega-col">
        <a href={cat.url} className="mega-col-title">
            {cat.title}
        </a>
        <ul className="nav">
            {navItems}
        </ul>
        <a href={cat.url}><em>View All {cat.title}</em></a>
    </div>
  )
}


export default MegaCol