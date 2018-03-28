import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Segment, Grid, Header, Form, Button } from 'semantic-ui-react'
import { fetchMission, deleteMission, updateMission } from '../actions/action_mission'


class MissionEdit extends Component {
  constructor(props) {
    super(props)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchMission(id)
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
  renderField(field) {
    const { label, input, type, meta: { touched, error } } = field
    return (
      <Form.Field required >
        <label>{label}</label>
        <input {...input} type={type} required />
        <div>{touched ? error : ''}</div>
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
                negative
                onClick={this.onDeleteClick}
              >
                Delete Mission
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
        {/* <Link to="/missions">Back to Missions</Link> */}
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
function mapStateToProps({ missions }, ownProps) {
  return { initialValues: missions[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchMission, deleteMission, updateMission })(
  reduxForm({
    form: 'MissionEditForm',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(MissionEdit)
)
