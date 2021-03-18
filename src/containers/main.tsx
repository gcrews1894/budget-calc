import React, { useState } from 'react';
import Nav from '../components/nav';
import ItemsList from './itemsList';

export default function MainBody() {
    const [isVis, setIsVis] = useState(false);
    const [budget, setBudget] = useState(0);

    function handleChange(value: any) {
        let integer = parseInt(value);
        console.log(budget);
        return setBudget(integer)
    }

    function handleClick(e:any) {
        e.preventDefault();
        console.log(budget);
        return setIsVis(true);
    }

    // shows landing page until "Get Started" is clicked
    return !isVis ? (
        <div className='frontPageContent'>
            <Nav />
            <div className='budgetEntry' id="background">
                <div className="welcomeContent">
                    <h1 className="welcomeMessage">Tell us what your budget is!</h1>
                    <form className="budgetForm">
                        <input className="budgetInput" type="number" placeholder="What is your budget?" onChange={(e) => handleChange(e.target.value)}/>
                        <button className="budgetButton" onClick={handleClick}>Get Started</button>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <div className="listContent">
            <Nav />
            <ItemsList budget={budget}/>
        </div>
    )
}