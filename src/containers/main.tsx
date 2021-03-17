import React, { useState } from 'react';
import Nav from '../components/nav';
import ItemsList from './itemsList';
import Background from '../assets/background.jpg';

export default function MainBody() {
    const [isVis, setIsVis] = useState(false);
    const [budget, setBudget] = useState(0);

    function handleChange(value: any) {
        console.log(budget);
        return setBudget(value)
    }

    function handleClick(e:any) {
        e.preventDefault();
        console.log(budget);
        return setIsVis(true);
    }


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