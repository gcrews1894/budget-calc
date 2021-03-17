import React, { useState, useEffect } from 'react';
import firebase from '../firebase'

export default function ItemsList(props:any) {
    const [items, setItems] = useState();

    let budget = parseInt(props.budget);
    let lowRange = 0
    let highRange = 4000
    
    let under = <h1 id="underBudget">UNDER BUDGET</h1>
    let over = <h1 id="overBudget">OVER BUDGET</h1>
    let inBudget = <h1 id="inBudget">IN BUDGET</h1>

    // queries to firestore for 'items' collect and processes data returned
    let ref = firebase.firestore().collection("items")
    function getItems() {
        ref.onSnapshot((querySnapshot) => {
            let items:any = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            });
            setItems(items)
        })
    }
    useEffect(() => {
        getItems();
    }, []);

    function handleClick() {
        console.log(items)
    }

    return (
        <div className="itemsList">
            <div className="totals">
                <p>Your budget is: <span className="emphasize">${budget}</span></p>
                <p className="budgetCheck">YOU ARE CURRENTLY: {budget > lowRange && budget < highRange ? inBudget : budget > highRange ? under : over} </p>
                <p>Current range is: <span className='emphasize'>${lowRange}-${highRange}</span></p>
            </div>
            <div className="items">
                <button onClick={handleClick}>Click me to see items in console</button>
            </div>
        </div>
    )
}