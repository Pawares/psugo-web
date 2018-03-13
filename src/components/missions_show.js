import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import { fetchMission } from '../actions'

class MissionsShow extends Component {

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchMission(id)
    }

    render() {
        const { mission } = this.props

        if (!mission) {
            return <div>Loding...</div>
        }

        return (
            <div>
                <NavBar />
                <div className="container">
                    <Link to="/missions">Back to Missions</Link>
                    <h3>Name: {mission.data.name}</h3>
                    <h6>Categories: {mission.data.categories}</h6>
                    <p> Statement: {mission.data.statement}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps( { missions }, ownProps) {
    const mission =  { mission: missions[ownProps.match.params.id]}
    console.log(mission)
    return { mission: missions[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchMission })(MissionsShow)