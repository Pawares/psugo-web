import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Segment, Grid, Header, Form, Button, Container, Divider } from 'semantic-ui-react'
import { fetchItem, deleteItem, updateItem } from '../actions/action_item'
import Map from './Map'

class ItemEdit extends Component {
  constructor(props) {
    super(props)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchItem(id)
  }

  onUpdateClick(values) {
    console.log('onUpdateClick: ', values)
    const { id } = this.props.match.params
    this.props.updateItem(id, values, () => {
      console.log('Update Successful!')
    })
  }

  onDeleteClick() {
    const { id } = this.props.match.params
    this.props.deleteItem(id, () => {
      this.props.history.push('/items')
    })
  }

  renderTextField(field) {
    const {
      label, input, type, meta: { touched, error },
    } = field
    return (
      <Form.Field>
        <label>{label}</label>
        <input {...input} type={type} required />
        <div >{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  renderNumberField(field) {
    const {
      label, input, type, min, max, meta: { touched, error },
    } = field
    return (
      <Form.Field>
        <label>{label}</label>
        <input
          {...input}
          type={type}
          min={min}
          max={max}
          step="any"
          required
        />
        <div >{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  render() {
    const {
      initialValues,
      handleSubmit,
      pristine,
      reset,
      submitting,
    } = this.props

    // console.log(initialValues)

    if (!initialValues) {
      return <div>Loading...</div>
    }

    return (
      <Segment stacked compact color="purple" >
        <Grid style={{ height: '100%' }} >
          <Grid.Column style={{ maxWidth: 450 }} >
            <Header as="h2" textAlign="center" >Item Edit</Header>

            <Form
              onSubmit={handleSubmit(this.onUpdateClick.bind(this))}
            >
              <Container>
                <Map lat={initialValues.latitude} lng={initialValues.longitude} />
              </Container>
              <Divider horizontal >Map</Divider>
              <Field
                label="Latitude"
                name="latitude"
                type="number"
                min="-90"
                max="90"
                component={this.renderNumberField}
              />
              <Field
                label="Longitude"
                name="longitude"
                type="number"
                min="-180"
                max="180"
                component={this.renderNumberField}
              />
              <Field
                label="Name"
                name="name"
                type="text"
                component={this.renderTextField}
              />
              <Field
                label="Radius(meters)"
                name="radius"
                type="number"
                min="50"
                max="100"
                component={this.renderNumberField}
              />
              <Field
                label="timeout(hours)"
                name="timeout"
                type="number"
                min="1"
                max="100"
                component={this.renderNumberField}
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
                Delete
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
  const {
    name, latitude, longitude, radius, timeout,
  } = values

  if (!name) {
    errors.name = 'Required'
  }

  if (!latitude) {
    errors.latitude = 'Required'
  }

  if (Number(latitude) > 90 || Number(latitude < -90)) {
    errors.latitude = 'Latitude must be a number between -90 and 90'
  }

  if (!longitude) {
    errors.longitude = 'Required'
  }

  if (Number(longitude) > 180 || Number(longitude < -180)) {
    errors.longitude = 'Longitude must be a number between -180 and 180'
  }

  if (!radius) {
    errors.radius = 'Required'
  }

  if (Number(radius) < 50 || Number(radius) > 100) {
    errors.radius = 'Radius must be a number between 50 and 100 meters'
  }

  if (!timeout) {
    errors.timeout = 'Required'
  }

  return errors
}

function mapStateToProps({ items }, ownProps) {
  const item = items[ownProps.match.params.id]
  return { initialValues: item }
}

export default connect(mapStateToProps, { fetchItem, deleteItem, updateItem })(
  reduxForm({
    form: 'ItemEditFrom',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(ItemEdit)
)

