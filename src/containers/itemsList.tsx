import React, { useState } from 'react';

export default function ItemsList(props:any) {
    let budget = parseInt(props.budget);
    let lowRange = 0
    let highRange = 4000
    
    let under = <h1 id="underBudget">UNDER BUDGET</h1>
    let over = <h1 id="overBudget">OVER BUDGET</h1>
    let inBudget = <h1 id="inBudget">IN BUDGET</h1>

    return (
        <div className="itemsList">
            <div className="totals">
                <p>Your budget is: ${budget}</p>
                <p className="budgetCheck">YOU ARE CURRENTLY: {budget > lowRange && budget < highRange ? inBudget : budget > highRange ? under : over} </p>
                <p>Current range is: ${lowRange}-${highRange}</p>
            </div>
            <div className="items">

            </div>
        </div>
    )
}