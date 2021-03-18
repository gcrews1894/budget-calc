import React, { useState, useEffect } from 'react';

export default function ItemTile(props:any) {
    const [toggle, setToggle] = useState(false)
    let callback = props.callback;
    let activeValues: any = []

    useEffect(() => {
        activeValues = props.array
        toggleClass()
    }, [props.array])

    function toggleClass() {
        const currentState = toggle;
        // console.log('type', props.type)
        // console.log('id', props.id)
        // console.log('active values', activeValues)
        for (let i = 0; i < activeValues.length; i++) {
            // console.log('entered loop')
            if (activeValues[i][3] == props.type && activeValues[i][0] == props.id) {
                setToggle(!currentState);
                // console.log('toggled')
            }
        }
    };

    //pass array of actives to each itemtile
    //initialize a isActive variable
    //iterate through activeArrays
        //if activeArray[i][3] === this itemtile's type && activeArray[i][0] === this itemtile's id
            //reassign isActive to true 




    return (
        <div className={toggle ? "itemTile active" : "itemTile"} id={props.id} title={props.name} onClick={async (e) => {await callback(e)}}>
                <h3 className="itemName" id={props.type} >{props.name}</h3>
                <h3 className="itemPrice">${props.lowPrice}<param name='lowPrice' value={props.lowPrice}></param> - {props.highPrice}<param name='highPrice' value={props.highPrice}></param></h3>
        </div>
    )
}