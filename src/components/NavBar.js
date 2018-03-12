import React, { Component } from 'react'

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a href="#" className="navbar-brand">PSU Go</a>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-iem">
                        <a href="#" className="nav-link">Missions</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Items</a>
                    </li>
                    <li>
                        <a href="#" className="nav-link">Quizzes</a>
                    </li>
                </ul>
                </div>
            
            </nav>
    
        )
    }
}

export default NavBar