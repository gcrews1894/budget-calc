import React, { useState, useEffect } from 'react';

export default function ItemTile(props:any) {
    const [toggle, setToggle] = useState(false)
    let callback = props.callback;
    let activeValues: any = []

    useEffect(() => {
        activeValues = props.array
        toggleClass()
    }, [props.array])

    // toggleClass function intended to be used to add an "active" class to item divs but couldn't figure out how to implement so only one div in each category could be 'active' at a time.
    function toggleClass() {
        const currentState = toggle;
        for (let i = 0; i < activeValues.length; i++) {
            // console.log('entered loop')
            if (activeValues[i][3] == props.type && activeValues[i][0] == props.id) {
                setToggle(!currentState);
                // console.log('toggled')
            }
        }
    };




    return (
        <div className={toggle ? "itemTile active" : "itemTile"} id={props.id} title={props.name} onClick={async (e) => {callback(e)}}>
                <h3 className="itemName" id={props.type} >{props.name}</h3>
                <h3 className="itemPrice">${props.lowPrice}<param name='lowPrice' value={props.lowPrice}></param> - {props.highPrice}<param name='highPrice' value={props.highPrice}></param></h3>
        </div>
    )
}