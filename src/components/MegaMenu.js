import MegaCol from "./MegaCol"

export const MegaMenu = ({animal}) => {

  return (
    <li className="dropdown">
                  <a href={animal.url} className="dropdown-toggle">
                    {animal.title}
                  </a>
                  <ul className="dropdown-menu">
                    <div className="start">
                      <div className="mega-menu">
                        {animal.categories.map((cat,index)=>(
                            <MegaCol cat={cat} key={index} />
                        ))}
                      </div>
                    </div>
                    <div className="end">
                        <img src={animal.image} alt="" />
                    </div>
                  </ul>
                </li>
  )
}
