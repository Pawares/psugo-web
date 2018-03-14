import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import { fetchMission, deleteMission } from '../actions'

class MissionsShow extends Component {

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchMission(id)
    }

    onDeleteClick() {
        const { id } = this.props.match.params
        this.props.deleteMission(id, () => {
            this.props.history.push('/missions')
        })
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
                    <div className="text-right">
                    <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>Delete Mission</button>
                    </div>
                    <h3>Name: {mission.name}</h3>
                    <h6>Categories: {mission.categories}</h6>
                    <p> Statement: {mission.statement}</p>
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

export default connect(mapStateToProps, { fetchMission, deleteMission })(MissionsShow)