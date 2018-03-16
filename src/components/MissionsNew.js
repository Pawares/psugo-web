import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createMission } from '../actions/action_mission'

class MissionsNew extends Component {
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
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} type={type} required />
        <div className="invalid-feedback">{touched ? error : ''}</div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="container was-validated"
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/missions" className="btn btn-danger">
          Cancel
        </Link>
      </form>
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
  form: 'MissionsNewForm',
  validate
})(connect(null, { createMission })(MissionsNew))
