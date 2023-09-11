import React from "react"

export default function Favourites(props) {
    const heartIcon = props.isFilled ? "heart-filled.png" : "heart-empty.png"
    return (
        <img 
            src={`../images/${heartIcon}`} 
            // className="card--favourite"
            onClick={props.handleClick}
        />
    )
}