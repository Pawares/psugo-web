import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Grid, Header, Card, Icon, Container } from 'semantic-ui-react'
import { fetchMissions } from '../actions/action_mission'

class MissionList extends Component {
  componentDidMount() {
    this.props.fetchMissions()
  }

  renderMissions() {
    return _.map(this.props.missions, (mission, key) => {
      return (
        <Card as={Link} to={`/missions/${key}`} fluid color="orange" key={key} >
          <Card.Content>
            <Card.Header>{mission.name}</Card.Header>
            <Card.Meta>Created in 2018</Card.Meta>
            <Card.Description>{mission.statement}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            10 players
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    // console.log(this.props.missions)
    if (!this.props.missions) {
      return <div>Loading...</div>
    }
    return (
      <Segment stacked compact color="olive" >
        <Grid style={{ height: '100%' }} >
          <Grid.Column style={{ maxWidth: 450 }} >
            <Header as="h2" textAlign="center" > Mission List </Header>

            <Container textAlign="right" >
              <Link to="./missions/new" >
                <Icon name="plus circle" size="huge" color="teal" />
              </Link>
            </Container>

            <Card.Group>
              {this.renderMissions()}
            </Card.Group>
          </Grid.Column>

        </Grid>
      </Segment>
    )
  }
}

function mapStateToProps({ missions }) {
  return { missions }
}
export default connect(mapStateToProps, { fetchMissions })(MissionList)
