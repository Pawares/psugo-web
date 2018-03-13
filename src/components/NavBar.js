import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">PSU Go</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/missions"className="nav-link">Missions</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/items"className="nav-link">Items</Link>
                    </li>
                    <li>
                        <Link to="/quizzes"className="nav-link">Quizzes</Link>
                    </li>
                </ul>
                </div>
            
            </nav>
    
        )
    }
}

export default NavBar