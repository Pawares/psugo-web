import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchMissions } from '../actions'
import _ from 'lodash'
import NavBar from './NavBar'

class MissionsIndex extends Component {

    componentDidMount() {
        this.props.fetchMissions()
    }

    renderMissions() {
        return (
            _.map(this.props.missions, mission => {
                return (
                    <li className="list-group-item" key={mission.id}>
                    <Link to={`/missions/${mission.id}`}>
                    {mission.data.name}
                    </Link>
                    </li>
                )
            })
        )
    }

    render() {
        console.log(this.props.missions)
        if (!this.props.missions) {
            return <div>Loading</div>
        }
        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="text-right">
                        <Link className="btn btn-primary" to="/missions/new">Add a Mission</Link>
                    </div>
                    <h3>Missions</h3>
                    <ul className="list-group">
                        {this.renderMissions()}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ missions }) {
    return { missions }
}

export default connect(mapStateToProps, { fetchMissions })(MissionsIndex)