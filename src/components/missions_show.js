import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import NavBar from "./NavBar"
import { fetchMission, deleteMission, updateMission } from "../actions"

class MissionsShow extends Component {
  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchMission(id)
  }

  onDeleteClick() {
    const { id } = this.props.match.params
    this.props.deleteMission(id, () => {
      this.props.history.push("/missions")
    })
  }

  onUpdateClick(values) {
    console.log(values)
    const { id } = this.props.match.params
    this.props.updateMission(id, values, () => {
        console.log("Update Successful!")
    })
  }
  renderField(field) {
    const { label, input, type, meta: { touched, error } } = field
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} type={type} required />
        <div className="invalid-feedback">{touched ? error : ""}</div>
      </div>
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
      <div>
        <NavBar />
        <div className="container">
          <Link to="/missions">Back to Missions</Link>
          <div className="text-right">
            <button
              className="btn btn-danger"
              onClick={this.onDeleteClick.bind(this)}
            >
              Delete Mission
            </button>
          </div>
        
          <form
            onSubmit={handleSubmit(this.onUpdateClick.bind(this))}
            className="was-validated"
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
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.name) {
    errors.name = "Required"
  }

  if (!values.categories) {
    errors.categories = "Required"
  }

  if (!values.statement) {
    errors.statement = "Required"
  }

  return errors
}
function mapStateToProps({ missions }, ownProps) {
  return { initialValues: missions[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchMission, deleteMission, updateMission })(
  reduxForm({
    form: "MissionsShowForm",
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(MissionsShow)
)
