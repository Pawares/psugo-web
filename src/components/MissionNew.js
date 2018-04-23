import React, { Component } from 'react'
import _ from 'lodash'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Segment, Grid, Form, Header, Button, Dropdown, Container, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMission } from '../actions/action_mission'
import MapMarkerCluterer from './MapMarkerCluterer'

let itemOptions = []
let filteredSelectedItems = []

class MissionNew extends Component {
  componentWillMount() {
    // console.log(this.props.items)
    itemOptions = this.createItemOptions()
    // console.log(itemOptions)
  }

  onSubmit(values) {
    console.log(values)
    this.props.createMission(values, () => {
      this.props.history.push('/missions')
    })
  }

  createItemOptions() {
    return _.map(this.props.items, this.createItemOption)
  }

  createItemOption(item, key) {
    return {
      key: key,
      value: key,
      text: item.name
    }
  }

  createSelectedItemMarkers() {
    const { items, selectedItems } = this.props
    console.log('selectedItems', selectedItems)
    const filteredItems = []
    _.forEach(items, (item, key) => {
      _.forEach(selectedItems, (selectedItem) => {
        if (key === selectedItem) {
          filteredItems.push(item)
        }
      })
    })
    console.log('filteredItems', filteredItems)
    return filteredItems
  }

  renderField(field) {
    const { label, input, type, meta: { touched, error } } = field
    return (
      <Form.Field>
        <label>{label}</label>
        <input {...input} type={type} required />
        <div >{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  renderMapMarkerCluterer() {
    filteredSelectedItems = this.createSelectedItemMarkers()
    if (filteredSelectedItems.length > 0) {
      return <MapMarkerCluterer markers={filteredSelectedItems} />
    }

    return <div>โปรดเลือกไอเทม เพื่อแสดงตำแหน่งไอเทมบนแผนที่</div>
  }

  renderDropdownItemsField(props) {
    return (
      <Form.Field>
        <label>Selected Items</label>
        <Dropdown
          options={itemOptions}
          multiple
          selection
          {...props.input}
          value={props.input.value}
          onChange={(param, data) => props.input.onChange(data.value)}
          placeholder="โปรดเลือกไอเทม"
        />
      </Form.Field>
    )
  }


  render() {
    const { handleSubmit } = this.props
    // this.createItemsMarker()
    return (
      <Segment compact stacked color="orange" >
        <Grid tyle={{ height: '100%' }} >
          <Grid.Column style={{ width: 450 }} >
            <Header as="h2" textAlign="center" >Mission New</Header>
            <Form
              onSubmit={handleSubmit(this.onSubmit.bind(this))}
            >
              <Field
                name="name"
                label="Name"
                type="text"
                component={this.renderField}
              />
              <Field
                name="categories"
                label="Categories"
                type="text"
                component={this.renderField}
              />
              <Field
                name="statement"
                label="Statement"
                type="text"
                component={this.renderField}
              />

              <Container>
                {this.renderMapMarkerCluterer()}
              </Container>
              <Divider horizontal >Map</Divider>

              <Field
                name="selectedItems"
                component={this.renderDropdownItemsField}
              />
              <Button type="submit" >Submit</Button>
              <Button negative as={Link} to="/missions" >Cancel</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.categories) {
    errors.categories = 'Required'
  }

  if (!values.statement) {
    errors.statement = 'Required'
  }

  return errors
}

const mapStateToProps = ({ items }) => {
  return { items }
}

MissionNew = reduxForm({
  form: 'MissionNewForm',
  validate
})(MissionNew)

const selector = formValueSelector('MissionNewForm')
MissionNew = connect(
  (state) => {
    const selectedItems = selector(state, 'selectedItems')
    return {
      selectedItems
    }
  }
)(MissionNew)

export default connect(mapStateToProps, { createMission })(MissionNew)


// export default reduxForm({
//   form: 'MissionNewForm',
//   validate
// })(connect(mapStateToProps, { createMission })(MissionNew))
