import React, { Component } from 'react'
import { connect } from 'react-redux'
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
                    <li className="list-group-item" key={mission.id} >{mission.name}</li>
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
                <h3>Missions</h3>
                <ul className="list-group">
                    {this.renderMissions()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ missions }) {
    return { missions }
}

// { fetchMissions } === mapDispatchToProps()

export default connect(mapStateToProps, { fetchMissions })(MissionsIndex)