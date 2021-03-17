import React, { useState } from 'react';
import Nav from '../components/nav'
import Background from '../assets/background.jpg'

export default function MainBody() {
    const [isVis, setIsVis] = useState(false);
    const [budget, setBudget] = useState(0);

    function handleChange(e:any) {
        e.preventDefault()
        console.log(e.target.value)
    }

    function handleClick(e:any) {
        e.preventDefault()
        console.log(e.target)
    }


    return !isVis ? (
        <div>
            <Nav />
            <div className='budgetEntry' id="background">
                <img className="backgroundImage" src={Background} />
                <div className="welcomeContent">
                    <h1 className="welcomeMessage">Tell us what your budget is!</h1>
                    <form className="budgetForm">
                        <input className="budgetInput" type="number" placeholder="what is your budget?"></input>
                        <button className="budgetButton" onClick={handleClick}>Get Started</button>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <Nav />
            <h1> This is underneath! </h1>
        </div>
    )
}