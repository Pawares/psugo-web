import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Segment, Grid, Header, Form, TextArea, Button } from 'semantic-ui-react'
import { fetchQuiz, deleteQuiz, updateQuiz } from '../actions/action_quiz'

const options = ['opt_1', 'opt_2', 'opt_3', 'opt_4']

class QuizEdit extends Component {
  constructor(props) {
    super(props)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchQuiz(id)
  }

  onDeleteClick() {
    const { id } = this.props.match.params
    this.props.deleteQuiz(id, () => {
      this.props.history.push('/quizzes')
    })
  }

  onUpdateClick(values) {
    console.log(values)
    const { id } = this.props.match.params
    this.props.updateQuiz(id, values, () => {
      console.log('Update Successful!')
    })
  }

  renderQuestionField(field) {
    const { label, input, type, meta: { touched, error } } = field

    return (
      <Form.Field>
        <label>{label}</label>
        <TextArea {...input} />
        <div>{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  renderAnswerField(field) {
    const { label, input, type, meta: { touched, error } } = field
    return (
      <Form.Field>
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
      <Segment compact stacked color="orange" >
        <Grid style={{ height: '100%' }} >
          <Grid.Column style={{ maxWidth: 450 }} >
            <Header as="h2" textAlign="center">Quiz New</Header>

            <Form
              onSubmit={handleSubmit(this.onUpdateClick.bind(this))}
            >
              <Field
                label="Question"
                name="question"
                component={this.renderQuestionField}
              />

              <Field
                label="Option 1"
                name="opt_1"
                type="text"
                component={this.renderAnswerField}
              />

              <Field
                label="Option 2"
                name="opt_2"
                type="text"
                component={this.renderAnswerField}
              />

              <Field
                label="Option 3"
                name="opt_3"
                type="text"
                component={this.renderAnswerField}
              />

              <Field
                label="Option 4"
                name="opt_4"
                type="text"
                component={this.renderAnswerField}
              />

              <Field name="answer" component="select" >
                <option value="" >Select a Correct Option...</option>
                {options.map(option => (
                  <option value={option} key={option} >
                    {option}
                  </option>
                ))}
              </Field>

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
  const { question, answer, opt_1, opt_2, opt_3, opt_4 } = values

  if (!question) {
    errors.question= 'Required'
  }

  if (!answer) {
    errors.answer= 'Required'
  }

  if (!opt_1) {
    errors.opt_1= 'Required'
  }

  if (!opt_2) {
    errors.opt_2= 'Required'
  }

  if (!opt_3) {
    errors.opt_3= 'Required'
  }

  if (!opt_4) {
    errors.opt_4 = 'Required'
  }

  return errors
}

function mapStateToProps({ quizzes }, ownProps) {
  return { initialValues: quizzes[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchQuiz, deleteQuiz, updateQuiz })(
  reduxForm({
    form: 'QuizEditForm',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(QuizEdit)
)
