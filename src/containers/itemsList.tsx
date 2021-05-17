import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import ItemTile from '../components/itemTile';
import ShoppingCart from '../components/shoppingCart';

// wouldn't work with ES6 import
const { v4: uuidv4 } = require('uuid');
const id = uuidv4()

export default function ItemsList(props:any) {
    let budgetProp = props.budget;
    const [budget, setBudget] = useState(budgetProp)
    const [items, setItems] = useState<any>([]);
    const [lowerTotal, setLowerTotal] = useState(0)
    const [upperTotal, setUpperTotal] = useState(0)

    const [activeWater, setActiveWater] = useState<any>([])
    const [activeStructure, setActiveStructure] = useState<any>([])
    const [activeLighting, setActiveLighting] = useState<any>([])
    const [activeGround, setActiveGround] = useState<any>([])
    const [activeDeck, setActiveDeck] = useState<any>([])
    const [activeFence, setActiveFence] = useState<any>([])
    const activeValues:any = [activeWater, activeStructure, activeLighting, activeGround, activeDeck, activeFence]

    let sortedItems: any[] = []
    let tiles: any

    // resets all selected items and empties cart
    function clearActives() {
        setActiveWater([])
        setActiveStructure([])
        setActiveLighting([])
        setActiveGround([])
        setActiveDeck([])
        setActiveFence([])
    }


    // handles item card clicks to add item to activeItem state
    function handleClick(e:any) {
        let lowPrice = parseInt(e.target.querySelector("param[name='lowPrice']").value)
        let highPrice = parseInt(e.target.querySelector("param[name='highPrice']").value)
        let id = e.target.id
        let itemType = e.target.querySelector(".itemName").id
        let name = e.target.title
        let stateObj = [id, lowPrice, highPrice, itemType, name]
        if (itemType === 'WATER_FEATURES') {
            setActiveWater(stateObj)
        }
        if (itemType === 'STRUCTURES') {
            setActiveStructure(stateObj)
        }
        if (itemType === 'LIGHTING') {
            setActiveLighting(stateObj)
        }
        if (itemType === 'GROUND_COVER') {
            setActiveGround(stateObj)
        }
        if (itemType === 'DECK_MATERIAL') {
            setActiveDeck(stateObj)
        }
        if (itemType === 'FENCING_AND_PRIVACY') {
            setActiveFence(stateObj)
        }
        setTotals(activeValues)
        // console.log(activeValues)
    }

    // grabs the low and high price values from all active items and calculates low-total and high-total
    function setTotals(arr: []) {
        let lows:any[] = []
        let highs:any[] = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] !== undefined) {
                lows.push(arr[i][1])
                highs.push(arr[i][2])
            }
        }
        let lowTotal = lows.reduce((acc, ele) => {
            return acc += ele
        },0)
        let highTotal = highs.reduce((acc, ele) => {
            return acc += ele
        },0)
        setLowerTotal(lowTotal)
        setUpperTotal(highTotal)
    }
    
    // conditional tags to display budget status
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

    // any time the value of activeValues changes, re-invokes setTotals function
    useEffect(() => {
        setTotals(activeValues)
    }, [activeValues])

    // sorts items by type
    function parseItems(array:any) {
        let waterFeatures:any|object = []
        let structures:any|object = []
        let lighting:any[] = []
        let groundCover:any[] = []
        let deckMaterial:any[] = []
        let fencing:any[] = []
        for (let i = 0; i < array.length; i++) {
            if (array[i].type === "WATER_FEATURES") {
                waterFeatures.push(array[i])
            }
            if (array[i].type === "STRUCTURES") {
                structures.push(array[i])
            }
            if (array[i].type === "LIGHTING") {
                lighting.push(array[i])
            }
            if (array[i].type === "GROUND_COVER") {
                groundCover.push(array[i])
            }
            if (array[i].type === "DECK_MATERIAL") {
                deckMaterial.push(array[i])
            }
            if (array[i].type === "FENCING_AND_PRIVACY") {
                fencing.push(array[i])
            }
        }
        sortedItems.push(waterFeatures)
        sortedItems.push(structures)
        sortedItems.push(lighting)
        sortedItems.push(groundCover)
        sortedItems.push(deckMaterial)
        sortedItems.push(fencing)
        return buildItems(sortedItems)
    }
    
    // builds itemTile components and places them in a 2D array
    function buildItems(arr: any[]) {
        let tileArr: any[] = [];
        for (let i = 0; i < arr.length; i++){
            let tempArr: any[] = []
            for (let j = 0; j < arr[i].length; j++){
                let x = <ItemTile array={activeValues} class='itemTile' id={j} name={arr[i][j].name} type={arr[i][j].type} lowPrice={arr[i][j].lowPrice / 100} highPrice={arr[i][j].highPrice / 100} callback={handleClick}/>
                tempArr.push(x)
            }
            tileArr.push(tempArr);
        }
        return tileArr;
    }

    // could utilize useMemo so that the page doesn't rerender every time an item is clicked
    tiles = parseItems(items);

    // interface for data submission
    interface itemCollection {
        id: string,
        WATER_FEATURE:{},
        STRUCTURE:{},
        LIGHTING:{},
        GROUND_COVER:{},
        DECK_MATERIAL:{},
        FENCING_AND_PRIVACY:{},
        lowerTotal: number,
        upperTotal: number,
        budget: number
    }

    // functions to add/update documents in the "gavinCrewsBudgetSubmit" collection
    let add = firebase.firestore().collection("gavinCrewsBudgetSubmit")
    function addCart(newCart: itemCollection) {
        add
            .doc(newCart.id)
            .set(newCart)
            .catch((err) => {
                console.log(err)
            })
        console.log('submitted')
    }
    function updateCart(updateCart: itemCollection) {
        add
            .doc(updateCart.id)
            .set(updateCart)
            .catch((err) => {
                console.log(err)
            })
        console.log('updated')
    }
    // Helper function for handle submit, utilizes closure to create an object for DB and call the ADD method if this is the first time the button has been clicked, or the UPDATE method if it has already been called
    function outerHandleClick() {
        let hasBeenCalled = false;
        function innerHandleClick() {
            let submitObj:any = {}
            submitObj.id = id
            for (let i = 0; i < activeValues.length; i++) {
                if (activeValues[i].length > 0) {
                    let typeObj:any = {
                        type: activeValues[i][3],
                        name: activeValues[i][4],
                        lowPrice: activeValues[i][1],
                        highPrice: activeValues[i][2]
                    }
                    // console.log(typeObj)
                    submitObj[typeObj.type] = typeObj;
                }
            }
            submitObj.lowerTotal = lowerTotal
            submitObj.upperTotal = upperTotal
            submitObj.budget = budget
            console.log(submitObj)
            if (!hasBeenCalled) {
                addCart(submitObj)
                hasBeenCalled = true
            } else {
                console.log('else entered')
                updateCart(submitObj)
            }
        }
        return innerHandleClick;
    }
    let handleSubmit = outerHandleClick()

    return (
        <div className="itemsList">
            <div className="totals">
                <div className="personalBudget">
                    <p>Your budget is: <span className="emphasize">${budget}</span></p>
                </div>
                <div className='centerTotals'>
                    <button className="resetButton submit" onClick={handleSubmit}>SUBMIT</button>
                    <p className="budgetCheck">YOU ARE CURRENTLY: {budget >= lowerTotal && budget <= upperTotal ? inBudget : budget > upperTotal ? under : over} </p>
                    <button className="resetButton" onClick={clearActives}>RESET</button>
                </div>
                <div className="budgetRange">
                    <p>Current range is: </p><span className='emphasize'>${lowerTotal} to ${upperTotal}</span>
                </div>
            </div>
            <div className="shoppingCart">
                <ShoppingCart arr={activeValues}/>
            </div>
            <div className="items">
                <h1 className="instructions">Please Select Up to One Item Per Category</h1>
                <div className="itemType">
                    <h1 className="typeTitle">Water Feature</h1>
                        {tiles[0]}
                </div>
                <div className="itemType">
                    <h1 className="typeTitle">Structures</h1>
                        {tiles[1]}
                </div>
                <div className="itemType">
                    <h1 className="typeTitle">Lighting</h1>
                        {tiles[2]}
                </div>
                <div className="itemType">
                    <h1 className="typeTitle">Ground Cover</h1>
                        {tiles[3]}
                </div>
                <div className="itemType">
                    <h1 className="typeTitle">Deck Material</h1>
                        {tiles[4]}
                </div>
                <div className="itemType">
                    <h1 className="typeTitle">Fencing and Privacy</h1>
                        {tiles[5]}
                </div>
            </div>
        </div>
    )
}