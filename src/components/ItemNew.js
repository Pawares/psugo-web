import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Grid, Form, Header, Button, Container, Divider } from 'semantic-ui-react'
import { createItem } from '../actions/action_item'
import Map from './Map'

class ItemNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      latitude: 7.0017253,
      longitude: 100.501491,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onSubmit(values) {
    console.log(values)
    this.props.createItem(values, () => {
      this.props.history.push('/items')
    })
  }

  handleInputChange(event) {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  renderTextField(field) {
    const { label, input, type, meta: { touched, error } } = field
    return (
      <Form.Field>
        <label>{label}</label>
        <input {...input} type={type} required />
        <div >{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  renderNumberField(field) {
    const { name, label, input, type, min, max, meta: { touched, error } } = field
    return (
      <Form.Field>
        <Form.Input
          label={label}
          name={name}
          {...input}
          type={type}
          min={min}
          max={max}
          step="any"
          required
          // onChange={this.handleInputChange}
        />
        <div >{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  renderMap() {
    const { latitude, longitude } = this.state
    if (this.state.latitude && this.state.longitude) {
      return <Map lat={latitude} lng={longitude} />
    }

    return <div>Please type latitude and longitude</div>
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <Segment compact stacked color="orange" >
        <Grid style={{ height: '100%' }} >
          <Grid.Column style={{ maxWidth: 450 }} >
            <Header as="h2" textAlign="center" >Item New</Header>

            <Form
              onSubmit={handleSubmit(this.onSubmit.bind(this))}
            >
              <Container>
                {this.renderMap()}
              </Container>
              <Divider horizontal>MAP</Divider>
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
              <Button type="submit" >Save</Button>
              <Button negative as={Link} to="/items">Cancel</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>

    )
  }
}

function validate(values) {
  const errors = {}
  const { name, latitude, longitude, radius, timeout } = values

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

export default reduxForm({
  form: 'ItemNewForm',
  validate
})(connect(null, { createItem })(ItemNew))
