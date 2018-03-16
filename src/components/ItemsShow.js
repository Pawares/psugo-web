import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { fetchItem, deleteItem, updateItem } from '../actions/action_item';
import NavBar from '../components/NavBar';
import { parseFromFireItem } from '../utils';

class ItemsShow extends Component {
  constructor(props) {
    super(props)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchItem(id);
  }

  onUpdateClick(values) {
    console.log('onUpdateClick: ', values);
    const { id } = this.props.match.params;
    this.props.updateItem(id, values, () => {
      console.log('Update Successful!');
    });
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deleteItem(id, () => {
      this.props.history.push('/items');
    });
  }

  renderTextField(field) {
    const {
      label, input, type, meta: { touched, error },
    } = field;
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} type={type} required />
        <div className="invalid-feedback">{touched ? error : ''}</div>
      </div>
    );
  }

  renderNumberField(field) {
    const {
      label, input, type, min, max, meta: { touched, error },
    } = field;
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
        <div className="invalid-feedback">{touched ? error : ''}</div>
      </div>
    )
  }

  render() {
    const {
      initialValues,
      handleSubmit,
      pristine,
      reset,
      submitting,
    } = this.props;

    if (!initialValues) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <NavBar />
        <div className="container">
          <Link to="/items"> Back to Items</Link>
          <div className="text-right">
            <button
              onClick={this.onDeleteClick}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>

          <form
            onSubmit={handleSubmit(this.onUpdateClick.bind(this))}
            className="was-validated"
          >
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

            <button
              type="submit"
              className="btn btn-primary"
              disabled={pristine || submitting}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Undo Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  const {
    name, latitude, longitude, radius, timeout,
  } = values;

  if (!name) {
    errors.name = 'Required';
  }

  if (!latitude) {
    errors.latitude = 'Required';
  }

  if (Number(latitude) > 90 || Number(latitude < -90)) {
    errors.latitude = 'Latitude must be a number between -90 and 90';
  }

  if (!longitude) {
    errors.longitude = 'Required';
  }

  if (Number(longitude) > 180 || Number(longitude < -180)) {
    errors.longitude = 'Longitude must be a number between -180 and 180';
  }

  if (!radius) {
    errors.radius = 'Required';
  }

  if (Number(radius) < 50 || Number(radius) > 100) {
    errors.radius = 'Radius must be a number between 50 and 100 meters';
  }

  if (!timeout) {
    errors.timeout = 'Required';
  }

  return errors;
}

function mapStateToProps({ items }, ownProps) {
  const item = items[ownProps.match.params.id];
  const parsedItem = parseFromFireItem(item);
  return { initialValues: parsedItem };
}

export default connect(mapStateToProps, { fetchItem, deleteItem, updateItem })(
  reduxForm({
    form: 'ItemsShowFrom',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(ItemsShow)
)

