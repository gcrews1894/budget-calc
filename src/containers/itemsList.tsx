import React, { useState, useEffect } from 'react';
import firebase from '../firebase'
import ItemTile from '../components/itemTile'

export default function ItemsList(props:any) {
    const [items, setItems] = useState<any>([]);
    const [lowerTotal, setLowerTotal] = useState(0)
    const [upperTotal, setUpperTotal] = useState(0)
    // const [active, setActive] = useState({
    //     WATER_FEATURES: null,
    //     STRUCTURES : null,
    //     LIGHTING : null,
    //     GROUND_COVER : null,
    //     DECK_MATERIAL : null,
    //     FENCING_AND_PRIVACY : null
    // })
    const [activeWater, setActiveWater] = useState<any>([])
    const [activeStructure, setActiveStructure] = useState<any>([])
    const [activeLighting, setActiveLighting] = useState<any>([])
    const [activeGround, setActiveGround] = useState<any>([])
    const [activeDeck, setActiveDeck] = useState<any>([])
    const [activeFence, setActiveFence] = useState<any>([])
    const activeValues:any = [activeWater, activeStructure, activeLighting, activeGround, activeDeck, activeFence]

    function handleClick(e:any) {
        let lowPrice = parseInt(e.target.querySelector("param[name='lowPrice']").value)
        let highPrice = parseInt(e.target.querySelector("param[name='highPrice']").value)
        let id = e.target.id
        let itemType = e.target.querySelector(".itemName").id
        let stateObj = [id, lowPrice, highPrice]
        if (itemType === 'WATER_FEATURES') {
            setActiveWater(stateObj)
            console.log(activeWater)
        }
        if (itemType === 'STRUCTURES') {
            setActiveStructure(stateObj)
            console.log(activeStructure)
        }
        if (itemType === 'LIGHTING') {
            setActiveLighting(stateObj)
            console.log(activeLighting)
        }
        if (itemType === 'GROUND_COVER') {
            setActiveGround(stateObj)
            console.log(activeGround)
        }
        if (itemType === 'DECK_MATERIAL') {
            setActiveDeck(stateObj)
            console.log(activeDeck)
        }
        if (itemType === 'FENCING_AND_PRIVACY') {
            setActiveFence(stateObj)
            console.log(activeFence)
        }
        // setLowerTotal(lowerTotal + (activeWater.lowPrice || 0) + (activeStructure.lowPrice || 0) + (activeLighting.lowPrice || 0) + (activeGround.lowPrice || 0) + (activeDeck.lowPrice || 0) + (activeFence.lowPrice || 0))
        // setUpperTotal(upperTotal + (activeWater.highPrice || 0) + (activeStructure.highPrice || 0) + (activeLighting.highPrice || 0) + (activeGround.highPrice || 0) + (activeDeck.highPrice || 0) + (activeFence.highPrice || 0))
        setTotals(activeValues)
    }

    function setTotals(arr: []) {
        let lows:any[] = []
        let highs:any[] = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] !== undefined) {
                lows.push(arr[i][1])
                highs.push(arr[i][2])
            }
        }
        console.log(lows)
        console.log(highs)
        let lowTotal = lows.reduce((acc, ele) => {
            return acc += ele
        },0)
        let highTotal = highs.reduce((acc, ele) => {
            return acc += ele
        },0)
        console.log(lowTotal)
        console.log(highTotal)
        setLowerTotal(lowTotal)
        setUpperTotal(highTotal)
    }

    let budget = props.budget;
    
    let under = <h1 id="underBudget">UNDER BUDGET</h1>
    let over = <h1 id="overBudget">OVER BUDGET</h1>
    let inBudget = <h1 id="inBudget">IN BUDGET</h1>

    let sortedItems: any[] = []
    let tiles: any

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
    
    function buildItems(arr: any[]) {
        let tileArr: any[] = [];
        for (let i = 0; i < arr.length; i++){
            let tempArr: any[] = []
            for (let j = 0; j < arr[i].length; j++){
                let x = <ItemTile isActive={false} class='itemTile' id={j} name={arr[i][j].name} type={arr[i][j].type} lowPrice={arr[i][j].lowPrice / 100} highPrice={arr[i][j].highPrice / 100} callback={handleClick}/>
                tempArr.push(x)
            }
            tileArr.push(tempArr);
        }
        return tileArr;
    }
    
    tiles = parseItems(items);

    return (
        <div className="itemsList">
            <div className="totals">
                <p>Your budget is: <span className="emphasize">${budget}</span></p>
                <p className="budgetCheck">YOU ARE CURRENTLY: {budget > lowerTotal && budget < upperTotal ? inBudget : budget > upperTotal ? under : over} </p>
                <p>Current range is: <span className='emphasize'>${lowerTotal} to ${upperTotal}</span></p>
            </div>
            <div className="items">
                <div className="itemType">
                    <h1>Water Feature</h1>
                        {tiles[0]}
                </div>
                <div className="itemType">
                    <h1>Structures</h1>
                        {tiles[1]}
                </div>
                <div className="itemType">
                    <h1>Lighting</h1>
                        {tiles[2]}
                </div>
                <div className="itemType">
                    <h1>Ground Cover</h1>
                        {tiles[3]}
                </div>
                <div className="itemType">
                    <h1>Deck Material</h1>
                        {tiles[4]}
                </div>
                <div className="itemType">
                    <h1>Fencing and Privacy</h1>
                        {tiles[5]}
                </div>
            </div>
        </div>
    )
}