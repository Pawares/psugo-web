import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Dropdown, Grid, Form } from 'semantic-ui-react'
import { fetchItems } from '../actions/action_item'

const itemOptions = [
  { key: '9GVgMpDsJqUspSDeF49j', value: '9GVgMpDsJqUspSDeF49j', text: 'คณะนิติศาสตร์' },
  { key: 'Cf36JNYtx5jPr6Pose6W', value: 'Cf36JNYtx5jPr6Pose6W', text: 'ศูนย์คอมพิวเตอร์' },
  { key: 'JyrWxkjVKLXq6JMcczbS', value: 'JyrWxkjVKLXq6JMcczbS', text: 'คณะทรัพยากรธรรมชาติ' },
  { key: 'UGXkxNW6gR6wIxFEDctX', value: 'UGXkxNW6gR6wIxFEDctX', text: 'คณะศิลปศาสตร์' },
  { key: 'omVbD8WoBFt7ttq2xSrv', value: 'omVbD8WoBFt7ttq2xSrv', text: 'คณะวิศวกรรมคอมพิวเตอร์' },
  { key: 'vHZRFv7UvjaLAQw4QCyW', value: 'vHZRFv7UvjaLAQw4QCyW', text: 'คณะวิทยาการจัดการ' },

]

// const getOptions = () => _.times(3, () => {
//   const name = faker.name.findName()
//   return { key: name, text: name, value: _.snakeCase(name) }
// })


class ItemOptionDropdown extends Component {
  componentWillMount() {
    this.setState({
      value: [],
      // options: getOptions(),
    })
  }

  componentDidMount() {
    // this.props.fetchQuizzes()
  }

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { options, isFetching, value } = this.state
    const { items } = this.props

    if (!this.props.items) {
      return <div>Loading...</div>
    }

    return (
      <Grid>
        <Grid.Column >
          <Form.Field>
            <label>Select Items</label>
            <Dropdown
              fluid
              selection
              multiple
              // options={options}
              options={itemOptions}
              value={value}
              placeholder='Add Items'
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

const getItemOptions = ({ items }) => {
  // console.log(quizzes, '4444444')
  // return { key: quizzes.key, text: quizze }
  // return { key: name, text: name, value: _.snakeCase(name) }
}

function mapStateToProps({ items }) {
  // let quizOptions = getQuizOptions({ quizzes })
  // console.log(quizOptions)
  return { items }
}

export default connect(mapStateToProps, { fetchItems })(ItemOptionDropdown)