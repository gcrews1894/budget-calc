import React, { useState } from 'react';

export default function ItemTile(props:any) {
    const [toggle, setToggle] = useState(false)

    function toggleClass(e:any) {
        console.log(e.target)
        const currentState = toggle;
        setToggle(!currentState);
    };

    let callback = props.callback;

    return (
        <div className={props.class} id={props.id} onClick={(e) => callback(e)}>
            <h3 className="itemName" id={props.type}>{props.name}</h3>
            <h3 className="itemPrice">${props.lowPrice}<param name='lowPrice' value={props.lowPrice}></param> - {props.highPrice}<param name='highPrice' value={props.highPrice}></param></h3>
        </div>
    )
}