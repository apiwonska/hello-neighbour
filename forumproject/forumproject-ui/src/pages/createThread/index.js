import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';

import {
  SubmitButton,
  Button,
  FormGroupButtons
} from './style.js';
import {
  Input,
  FormGroup,
  Label
} from '../../components/styledForms';
import { ContainerDiv } from '../../components/styledDivs';
import { createThread } from '../../redux/actions';
import { FormError } from '../../components/errors';
import {
  required,
  minLength,
  maxLength,
  composeValidators
} from '../../utils/validators';


class CreateThread extends React.Component {

  handleCreateThread = (values) => {
    const category = Number(this.props.match.params.categoryId)
    const data = { 
      title: values['title'] || '', 
      subject: values['subject'] || '',
      category
    }
    this.props.createThread(data);
  }

  handleCancel = () => {
    const { categoryId } = this.props.match.params;
    this.props.history.push(`/categories/${ categoryId }`);
  }

  renderFieldError(field, meta) {
    // Renders error from client or server validation
    const error = meta.error || this.props.threadsByCategory.errors[field];
    if ( meta.touched && error ) {
      return <FormError>{ error }</FormError>;
    }
  }

  render() {
    const titleValidator = composeValidators(required, minLength(3), maxLength(100))
    const subjectValidator = composeValidators(required, minLength(10), maxLength(2000))

    return (
      <ContainerDiv>
        <h2>CreateThread</h2>
        <FinalForm onSubmit={this.handleCreateThread}>
          {({handleSubmit, invalid}) => {
            return(
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="title">Title:</Label>
                  <Field name="title" validate={titleValidator} > 
                    {({ input, meta }) => {
                      return (
                        <>
                          <Input {...input} placeholder="Add title" maxLength="100"/>
                          { this.renderFieldError('title', meta) }
                        </>
                      )
                    }}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="subject">Subject:</Label>
                  <Field name="subject" validate={subjectValidator}> 
                    {({ input, meta }) => {
                      return (
                        <>
                         <textarea {...input} rows="3" placeholder="Add subject" maxLength="2000" />
                         { this.renderFieldError('subject', meta) }
                        </>
                      )
                    }}
                  </Field>
                </FormGroup>
                <FormGroupButtons>
                  <SubmitButton type="submit" value="Create Thread" color="greenOutline" disabled={invalid}/>
                  <Button onClick={ this.handleCancel }>Cancel</Button>
                </FormGroupButtons>
              </form>
            );
          }}
        </FinalForm>
      </ContainerDiv>
    );
  }
}

const mapStateToProps = state => {
  return (
    {
      threadsByCategory: state.threadsByCategory,
    }
  )
}

export default connect(mapStateToProps, { createThread })(CreateThread);