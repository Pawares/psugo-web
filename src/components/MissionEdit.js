import React, { Component } from 'react'
import _ from 'lodash'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Segment, Grid, Header, Form, Button, Container, Dropdown, Divider } from 'semantic-ui-react'
import { fetchMission, deleteMission, updateMission } from '../actions/action_mission'
import MapMarkerCluterer from './MapMarkerCluterer'

let itemOptions = []
let filteredSelectedItems = []

class MissionEdit extends Component {
  constructor(props) {
    super(props)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchMission(id)
    itemOptions = this.createItemOptions()
  }

  onDeleteClick() {
    const { id } = this.props.match.params
    this.props.deleteMission(id, () => {
      this.props.history.push('/missions')
    })
  }

  onUpdateClick(values) {
    console.log(values)
    const { id } = this.props.match.params
    this.props.updateMission(id, values, () => {
      console.log('Update Successful!')
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
      <Form.Field >
        <Form.Input
          fluid
          label={label}
          {...input}
          type={type}
          required
        />
        <div>{touched ? error : ''}</div>
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
          placeholder="โปรดเลือกไอเทม"
          multiple
          selection
          {...props.input}
          options={itemOptions}
          onChange={(param, data) => props.input.onChange(data.value)}
          defaultValue={props.selected}
        />
      </Form.Field>
    )
  }

  render() {
    const {
      initialValues,
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props

    if (!initialValues) {
      return <div>Loding...</div>
    }

    return (
      <Segment stacked compact color="purple" >
        <Grid style={{ height: '100%' }} >
          <Grid.Column style={{ maxWidth: 450 }} >
            <Header as="h2" textAlign="center" >Mission Edit</Header>

            <Form
              onSubmit={handleSubmit(this.onUpdateClick.bind(this))}
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
                selected={initialValues.items}
              />
              <Button
                primary
                type="submit"
                disabled={pristine || submitting}
              >
                Update
              </Button>
              <Button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Undo Changes
              </Button>
              <Button
                type="button"
                negative
                onClick={this.onDeleteClick}
              >
                Delete Mission
              </Button>
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
function mapStateToProps({ missions, items }, ownProps) {
  return { initialValues: missions[ownProps.match.params.id], items }
}

MissionEdit = reduxForm({
  form: 'MissionEditForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(MissionEdit)

const selector = formValueSelector('MissionEditForm')
MissionEdit = connect(
  (state) => {
    const selectedItems = selector(state, 'selectedItems')
    return {
      selectedItems
    }
  }
)(MissionEdit)

export default connect(mapStateToProps, { fetchMission, deleteMission, updateMission })(MissionEdit)
