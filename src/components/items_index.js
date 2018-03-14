import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchItems } from '../actions/action_item'
import _ from 'lodash'

import NavBar from './NavBar'

class ItemsIndex extends Component {

    componentDidMount() {
        this.props.fetchItems()
    }

    renderItems() {
        return (
            _.map(this.props.items, (item, key) => {
                return (
                    <li className="list-group-item" key={key}>
                    <Link to={`/items/${key}`} >
                        {item.name}
                    </Link>
                    </li>
                )
               
            })
        )
    }

    render() {

        if (!this.props.items) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <NavBar />
                <div className="container">
                <div className="text-right">
                    <Link to="/items/new" className="btn btn-primary">Add Item</Link>
                </div>
                    <h3>Items</h3>
                    <ul className="list-group">
                        {this.renderItems()}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ items }) {
    return { items } 
}

export default  connect(mapStateToProps, { fetchItems })(ItemsIndex)