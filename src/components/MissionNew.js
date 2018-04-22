import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Segment, Grid, Form, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMission } from '../actions/action_mission'

class MissionNew extends Component {
  onSubmit(values) {
    console.log(values)
    this.props.createMission(values, () => {
      this.props.history.push('/missions')
    })
  }

  renderField(field) {
    const { label, input, type, meta: { touched, error } } = field
    // const className = `${touched && error ? 'invalid-feedback' : ''}`
    return (
      <Form.Field>
        <label>{label}</label>
        <input {...input} type={type} required />
        <div >{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Segment compact stacked color="orange" >
        <Grid tyle={{ height: '100%' }} >
          <Grid.Column style={{ width: 450 }} >
            <Header as="h2" textAlign="center" >Mission New</Header>
            <Form
              onSubmit={handleSubmit(this.onSubmit.bind(this))}
              className="container"
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

export default reduxForm({
  form: 'MissionNewForm',
  validate
})(connect(null, { createMission })(MissionNew))
