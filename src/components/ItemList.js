import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Grid, Header, Card, Icon, Container } from 'semantic-ui-react'
import { fetchItems } from '../actions/action_item'

class ItemList extends Component {
  componentDidMount() {
    this.props.fetchItems()
  }

  renderItems() {
    return _.map(this.props.items, (item, key) => {
      return (
        <Card as={Link} to={`/items/${key}`} fluid color="orange" key={key} >
          <Card.Content>
            <Card.Header>{item.name}</Card.Header>
            <Card.Meta>Created in 2018</Card.Meta>
            <Card.Description>{item.name}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            Activated
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    if (!this.props.items) {
      return <div>Loading...</div>
    }
    return (
      <Segment stacked compact color="olive" >
        <Grid style={{ height: '100%' }} >
          <Grid.Column style={{ maxWidth: 450 }} >
            <Header as="h2" textAlign="center" > Item List </Header>

            <Container textAlign="right" >
              <Link to="./items/new" >
                <Icon name="plus circle" size="huge" color="teal" />
              </Link>
            </Container>

            <Card.Group>
              {this.renderItems()}
            </Card.Group>
          </Grid.Column>

        </Grid>
      </Segment>
    )
  }
}

function mapStateToProps({ items }) {
  return { items }
}

export default connect(mapStateToProps, { fetchItems })(ItemList)
