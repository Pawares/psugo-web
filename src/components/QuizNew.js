import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Grid, Header, Form, Button, Dropdown } from 'semantic-ui-react'
import { createQuiz } from '../actions/action_quiz'

const answerOptions = [
  { key: 'opt_1', value: 'opt_1', text: 'Option 1' },
  { key: 'opt_2', value: 'opt_2', text: 'Option 2' },
  { key: 'opt_3', value: 'opt_3', text: 'Option 3' },
  { key: 'opt_4', value: 'opt_4', text: 'Option 4' },
]

class QuizNew extends Component {
  onSubmit(values) {
    console.log(values)
    this.props.createQuiz(values, () => {
      this.props.history.push('/quizzes')
    })
  }

  renderQuestionField(field) {
    const { label, input, meta: { touched, error } } = field

    return (
      <Form.Field >
        <Form.TextArea label={label} {...input} />
        <div>{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  renderAnswerField(field) {
    const { label, input, type, meta: { touched, error } } = field
    return (
      <Form.Field>
        <Form.Input label={label} {...input} type={type} required />
        <div>{touched ? error : ''}</div>
      </Form.Field>
    )
  }

  renderDropdownCorrectAnswerField(props) {
    return (
      <Form.Field>
        <label>Answer</label>
        <Dropdown
          options={answerOptions}
          selection
          {...props.input}
          value={props.input.value}
          onChange={(param, data) => props.input.onChange(data.value)}
          placeholder={props.label}
        />
      </Form.Field>
    )
  }


  render() {
    const { handleSubmit } = this.props
    return (
      <Segment compact stacked color="orange" >
        <Grid style={{ height: '100%' }} >
          <Grid.Column style={{ width: 350 }} >
            <Header as="h2" textAlign="center">Quiz New</Header>

            <Form
              onSubmit={handleSubmit(this.onSubmit.bind(this))}
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

              <Field
                name="answer"
                component={this.renderDropdownCorrectAnswerField}
                label="เลือกคำตอบที่ถูกต้อง"
              />

              <Button type="submit" >Save</Button>
              <Button negative as={Link} to="/quizzes" >Cancel</Button>

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
    errors.question = 'Required'
  }

  if (!answer) {
    errors.answer = 'Required'
  }

  if (!opt_1) {
    errors.opt_1 = 'Required'
  }

  if (!opt_2) {
    errors.opt_2 = 'Required'
  }

  if (!opt_3) {
    errors.opt_3 = 'Required'
  }

  if (!opt_4) {
    errors.opt_4 = 'Required'
  }

  return errors
}

export default reduxForm({
  form: 'QuizNewForm',
  validate
})(connect(null, { createQuiz })(QuizNew))
