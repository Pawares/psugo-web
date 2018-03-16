import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createItem } from "../actions/action_item";

class ItemsNew extends Component {
  renderTextField(field) {
    const { label, input, type, meta: { touched, error } } = field;
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} type={type} required />
        <div className="invalid-feedback">{touched ? error : ""}</div>
      </div>
    );
  }

  renderNumberField(field) {
    const { label, input, type, min, max, meta: { touched, error }} = field
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                className="form-control"
                {...input}
                type={type}
                min={min}
                max={max}
                step="any"
                required
            />
            <div className="invalid-feedback">
                {touched ? error : ''}
            </div>
        </div>
    )
  }

  onSubmit(values) {
    console.log(values);
    this.props.createItem(values, () => {
      this.props.history.push("/items");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="container was-validated"
      >
        <h3>New Items</h3>
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
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to="/items" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  const { name, latitude, longitude, radius, timeout } = values;

  if (!name) {
    errors.name = "Required";
  }

  if (!latitude) {
    errors.latitude = "Required";
  }

  if (Number(latitude) > 90 || Number(latitude < -90)) {
    errors.latitude = "Latitude must be a number between -90 and 90";
  }

  if (!longitude) {
    errors.longitude = "Required";
  }

  if (Number(longitude) > 180 || Number(longitude < -180)) {
    errors.longitude = "Longitude must be a number between -180 and 180";
  }

  if (!radius) {
    errors.radius = "Required";
  }

  if (Number(radius) < 50 || Number(radius) > 100) {
    errors.radius = "Radius must be a number between 50 and 100 meters";
  }

  if (!timeout) {
    errors.timeout = "Required";
  }

  return errors;
}

export default reduxForm({
  form: "ItemsNewForm",
  validate
})(connect(null, { createItem })(ItemsNew));
