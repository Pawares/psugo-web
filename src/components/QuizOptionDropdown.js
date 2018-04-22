import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, Grid, Header, Form } from 'semantic-ui-react'
import { fetchQuizzes } from '../actions/action_quiz'

const quizOptions = [
  { key: 'BHWtSIq95s8iFuFtVCMz', value: 'BHWtSIq95s8iFuFtVCMz', text: 'Some important details were _____ from the report he has written.' },
  { key: 'DKF5OgztToGbWjwL7tKW', value: 'DKF5OgztToGbWjwL7tKW', text: 'The ______ company owners always dress appropriately when they need to attend business events and meetings.' },
  { key: 'Efs981EYvOpzJXmKyCZC', value: 'Efs981EYvOpzJXmKyCZC', text: 'ศูนย์คอมพิวเตอร์ มอ. ไม่มีบริการใดสำหรับนักศึกษา' },
  { key: 'PBT38Q94MKnN7ZpuiIYE', value: 'PBT38Q94MKnN7ZpuiIYE', text: ' If it snows tomorrow, we _____ the trip to the mountain.' },
  { key: 'TEzoXuPAqwrLR8BeQoaO', value: 'TEzoXuPAqwrLR8BeQoaO', text: 'You will find all the papers you need _____ that drawer near the photocopier.' },
  { key: 'bdRSNY47cGCEhxLxwaGg', value: 'bdRSNY47cGCEhxLxwaGg', text: 'The report concerning the sales figures that you requested ______ on your desk.' },

]

// const getOptions = () => _.times(3, () => {
//   const name = faker.name.findName()
//   return { key: name, text: name, value: _.snakeCase(name) }
// })


class QuizOptionDropdown extends Component {
  componentWillMount() {
    this.setState({
      value: [],
      // options: getOptions(),
    })
  }

  componentDidMount() {
    this.props.fetchQuizzes()
  }

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { options, isFetching, value } = this.state
    const { quizzes } = this.props

    if (!this.props.quizzes) {
      return <div>Loading...</div>
    }

    return (
      <Grid>
        <Grid.Column >
          <Form.Field>
            <label>Select Quizzes</label>
            <Dropdown
              fluid
              selection
              multiple
              // options={options}
              options={quizOptions}
              value={value}
              placeholder='Add Quizzes'
              onChange={this.handleChange}
              disabled={isFetching}
              loading={isFetching}
            />
          </Form.Field>

        </Grid.Column>
        {/* <Grid.Column width={8}>
          <Header>State</Header>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </Grid.Column> */}
      </Grid>
    )
  }
}

const getQuizOptions = ({ quizzes }) => {
  // console.log(quizzes, '4444444')
  // return { key: quizzes.key, text: quizze }
  // return { key: name, text: name, value: _.snakeCase(name) }
}

function mapStateToProps({ quizzes }) {
  // let quizOptions = getQuizOptions({ quizzes })
  // console.log(quizOptions)
  return { quizzes }
}

export default connect(mapStateToProps, { fetchQuizzes })(QuizOptionDropdown)