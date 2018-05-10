import React, { Component } from 'react'
import _ from 'lodash'
import { Segment, Grid, Header, Card, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchQuizzes } from '../actions/action_quiz'

class QuizList extends Component {
  componentDidMount() {
    this.props.fetchQuizzes()
  }

  renderQuizzes() {
    return _.map(this.props.quizzes, (quiz, key) => {
      return (
        <Card as={Link} to={`/quizzes/${key}`} fluid color="orange" key={key} >
          <Card.Content>
            <Card.Header>{quiz.question}</Card.Header>
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
    if (!this.props.quizzes) {
      return <div>Loading...</div>
    }

    return (
      <Segment compact stacked color="olive" >
        <Grid style={{ height: '100%' }} >
          <Grid.Column style={{ maxWidth: 450 }} >
            <Header as="h2" textAlign="center" >Quiz List</Header>

            <Container textAlign="right" >
              <Link to="./quizzes/new">
                <Icon name="plus circle" size="huge" color="teal" />
              </Link>
            </Container>

            <Card.Group>
              {this.renderQuizzes()}
            </Card.Group>

          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

function mapStateToProps({ quizzes }) {
  return { quizzes }
}

export default connect(mapStateToProps, { fetchQuizzes })(QuizList)
