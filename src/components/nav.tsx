import React from 'react';

export default function Navbar() {

    return (
        <div className='navbar'>
            <div className='logo'>
                <a id='logoLink' href='https://yardzen.com/'>
                    <h1 className='yardzenLogo'>YARDZEN</h1>
                </a>
            </div>
            <div className='linkGroup'>
                <a className='navLink' href='https://dashboard.yardzen.com/packages'>
                    PACKAGES
                </a>
                <a className='navLink' href='https://yardzen.com/gallery'>
                    PORTFOLIO
                </a>
                <a className='navLink' href='https://yardzen.com/reviews'>
                    REVIEWS
                </a>
                <a className='navLink' href='https://yardzen.com/how-it-works'>
                    HOW IT WORKS
                </a>
            </div>
        </div>
    )
}